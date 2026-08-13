from django.db import transaction
from django.conf import settings
from django.contrib.redirects.models import Redirect
from django.contrib.sites.models import Site
from .models import TaxonomyTerm


def merge_terms(source_term_id, target_term_id):
    """
    Merges source_term into target_term.
    - Re-attaches all related content (M2M and FK).
    - Re-parents any child terms.
    - Creates a 301 Redirect for the source_term.
    - Deletes source_term.
    """
    with transaction.atomic():
        source_term = TaxonomyTerm.objects.get(id=source_term_id)
        target_term = TaxonomyTerm.objects.get(id=target_term_id)

        if source_term.group_id != target_term.group_id:
            raise ValueError("Cannot merge terms from different taxonomy groups.")

        # 1. Re-parent children
        source_term.children.update(parent=target_term)

        # 2. Transfer related content dynamically
        for field in TaxonomyTerm._meta.get_fields():
            # We only care about reverse relations from other models pointing to TaxonomyTerm
            if field.auto_created and not field.concrete:
                accessor_name = field.get_accessor_name()
                if not accessor_name:
                    continue
                
                # Skip the internal children relation as we already handled it
                if accessor_name == 'children':
                    continue

                related_manager = getattr(source_term, accessor_name, None)
                if related_manager is None:
                    continue

                if field.one_to_many:
                    # It's a ForeignKey from another model to TaxonomyTerm
                    # e.g., Post.category = source_term -> Post.category = target_term
                    # remote_field.name gets the name of the FK field on the related model
                    fk_field_name = field.remote_field.name
                    kwargs = {fk_field_name: target_term}
                    related_manager.all().update(**kwargs)
                elif field.many_to_many:
                    # It's a ManyToManyField from another model to TaxonomyTerm
                    # e.g., Post.tags.add(target_term), Post.tags.remove(source_term)
                    for obj in related_manager.all():
                        # The M2M manager on the related object
                        obj_m2m_manager = getattr(obj, field.remote_field.name)
                        obj_m2m_manager.remove(source_term)
                        obj_m2m_manager.add(target_term)

        # 3. Auto-create 301 Redirect
        # Fallback to SITE_ID=1 if not configured
        site_id = getattr(settings, 'SITE_ID', 1)
        try:
            current_site = Site.objects.get(pk=site_id)
        except Site.DoesNotExist:
            # If sites framework is not fully initialized in tests
            current_site = None

        if current_site:
            Redirect.objects.update_or_create(
                site=current_site,
                old_path=source_term.get_absolute_url(),
                defaults={'new_path': target_term.get_absolute_url()}
            )

        # 4. Delete the source term
        source_term.delete()
