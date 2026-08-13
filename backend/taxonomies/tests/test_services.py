import pytest
from django.contrib.redirects.models import Redirect
from django.contrib.sites.models import Site
from taxonomies.models import TaxonomyGroup, TaxonomyTerm, MockContentModel
from taxonomies.services import merge_terms
from django.conf import settings


@pytest.fixture
def setup_taxonomy_data():
    site, _ = Site.objects.get_or_create(domain='example.com', name='Example')
    settings.SITE_ID = site.pk

    group = TaxonomyGroup.objects.create(name="Categories")
    target_term = TaxonomyTerm.objects.create(name="Target Category", group=group)
    source_term = TaxonomyTerm.objects.create(name="Source Category", group=group)
    child_term = TaxonomyTerm.objects.create(name="Child Category", group=group, parent=source_term)

    # Content linked via FK
    fk_content = MockContentModel.objects.create(title="FK Content", primary_term=source_term)

    # Content linked via M2M
    m2m_content = MockContentModel.objects.create(title="M2M Content")
    m2m_content.tags.add(source_term)
    
    # Content linked to both to ensure no errors when target is already added
    m2m_content2 = MockContentModel.objects.create(title="M2M Content 2")
    m2m_content2.tags.add(source_term, target_term)

    return {
        'group': group,
        'source_term': source_term,
        'target_term': target_term,
        'child_term': child_term,
        'fk_content': fk_content,
        'm2m_content': m2m_content,
        'm2m_content2': m2m_content2,
        'site': site
    }


@pytest.mark.django_db
class TestMergeTerms:
    def test_merge_terms_success(self, setup_taxonomy_data):
        data = setup_taxonomy_data
        source_term = data['source_term']
        target_term = data['target_term']
        child_term = data['child_term']
        fk_content = data['fk_content']
        m2m_content = data['m2m_content']
        m2m_content2 = data['m2m_content2']
        source_url = source_term.get_absolute_url()
        target_url = target_term.get_absolute_url()

        merge_terms(source_term.id, target_term.id)

        # 1. Source term should be deleted
        assert not TaxonomyTerm.objects.filter(id=source_term.id).exists()

        # 2. Child term should be reparented to target_term
        child_term.refresh_from_db()
        assert child_term.parent == target_term

        # 3. FK content should be updated to target_term
        fk_content.refresh_from_db()
        assert fk_content.primary_term == target_term

        # 4. M2M content should be updated to target_term
        assert not m2m_content.tags.filter(id=source_term.id).exists()
        assert m2m_content.tags.filter(id=target_term.id).exists()

        assert not m2m_content2.tags.filter(id=source_term.id).exists()
        assert m2m_content2.tags.filter(id=target_term.id).exists()

        # 5. 301 Redirect should be created
        redirect = Redirect.objects.filter(old_path=source_url).first()
        assert redirect is not None
        assert redirect.new_path == target_url
        assert redirect.site == data['site']

    def test_merge_terms_different_groups(self, setup_taxonomy_data):
        data = setup_taxonomy_data
        source_term = data['source_term']
        other_group = TaxonomyGroup.objects.create(name="Other Group")
        other_term = TaxonomyTerm.objects.create(name="Other Term", group=other_group)

        with pytest.raises(ValueError, match="Cannot merge terms from different taxonomy groups."):
            merge_terms(source_term.id, other_term.id)
