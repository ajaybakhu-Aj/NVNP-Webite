import itertools
from django.db import models
from django.utils.text import slugify
from django.contrib.contenttypes.models import ContentType


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    ``created_at`` and ``updated_at`` fields, along with publishing status.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    is_published = models.BooleanField(default=False, db_index=True)

    class Meta:
        abstract = True


class SEOMetadataModel(models.Model):
    """
    An abstract base class model that provides SEO metadata fields.
    """
    seo_title = models.CharField(max_length=70, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    canonical_url = models.URLField(blank=True)
    og_image = models.ForeignKey(
        'core.MediaAsset',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    noindex = models.BooleanField(default=False)

    class Meta:
        abstract = True


class SluggedModel(models.Model):
    """
    An abstract base class model that automatically generates a unique slug
    from a specified field (defaults to 'title').
    """
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    
    # The field to generate the slug from
    SLUG_SOURCE_FIELD = 'title'

    class Meta:
        abstract = True

    def generate_slug(self):
        """
        Generate a unique slug based on the source field.
        """
        # If a custom slug is provided, respect it
        if self.slug:
            slug_candidate = slugify(self.slug)
        else:
            # Default to slugifying the source field
            source_text = getattr(self, self.SLUG_SOURCE_FIELD, None)
            if not source_text:
                # Fallback to 'name' if title is not present
                source_text = getattr(self, 'name', '')
            slug_candidate = slugify(str(source_text))

        if not slug_candidate:
            slug_candidate = "item"

        # Check for collisions
        original_slug = slug_candidate
        queryset = self.__class__.objects.all()
        if self.pk:
            queryset = queryset.exclude(pk=self.pk)

        for x in itertools.count(1):
            if not queryset.filter(slug=slug_candidate).exists():
                break
            slug_candidate = f"{original_slug}-{x}"

        return slug_candidate

    def save(self, *args, **kwargs):
        if not self.slug or kwargs.get('force_insert', False):
            self.slug = self.generate_slug()
        # If the slug is present but we want to ensure uniqueness on every save:
        else:
             # Only re-generate if we are not forcing a specific slug without collisions
             # For simplicity, if slug exists, we trust it, but if it collides it will raise IntegrityError.
             # Let's ensure uniqueness even if manually modified before save:
             self.slug = self.generate_slug()
        super().save(*args, **kwargs)


class CustomFieldGroup(models.Model):
    """
    A group of custom fields assigned to a specific content type.
    """
    title = models.CharField(max_length=255)
    assigned_model_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='custom_field_groups')

    def __str__(self):
        return self.title


class CustomFieldDefinition(models.Model):
    """
    A definition of a single custom field inside a CustomFieldGroup.
    """
    FIELD_TYPES = (
        ('TEXT', 'Text'),
        ('RICHTEXT', 'Rich Text'),
        ('REPEATER', 'Repeater'),
        ('NESTED_REPEATER', 'Nested Repeater'),
        ('SELECT', 'Select'),
        ('RELATION', 'Relation'),
    )

    group = models.ForeignKey(CustomFieldGroup, on_delete=models.CASCADE, related_name='fields')
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    name = models.CharField(max_length=255, help_text="Display label")
    key = models.CharField(max_length=255, help_text="Machine-readable key in JSON payload")
    validation_rules = models.JSONField(default=dict, blank=True, help_text="JSON schema for validation (e.g. required, max_length, sub_fields)")

    def __str__(self):
        return f"{self.name} ({self.get_field_type_display()})"


# A concrete model for testing the abstract models
class DummyPage(TimeStampedModel, SEOMetadataModel, SluggedModel):
    title = models.CharField(max_length=100)


class Page(TimeStampedModel, SEOMetadataModel, SluggedModel):
    """
    A concrete Page model that acts as a container for modular blocks.
    """
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class PageBlock(models.Model):
    """
    A modular block belonging to a Page. Stores structured data for frontend rendering.
    """
    BLOCK_TYPES = (
        ('Hero', 'Hero'),
        ('FeatureGrid', 'Feature Grid'),
        ('ComparisonTable', 'Comparison Table'),
        ('FAQAccordion', 'FAQ Accordion'),
        ('CTABanner', 'CTA Banner'),
        ('Testimonial', 'Testimonial'),
        ('ProductGrid', 'Product Grid'),
    )

    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='blocks')
    block_type = models.CharField(max_length=50, choices=BLOCK_TYPES)
    order = models.PositiveIntegerField(default=0)
    data = models.JSONField(default=dict, blank=True, help_text="Block payload corresponding to its JSON schema.")
    visibility_rules = models.JSONField(default=dict, blank=True, help_text="Rules for conditional rendering.")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.page.title} - {self.block_type} ({self.order})"
