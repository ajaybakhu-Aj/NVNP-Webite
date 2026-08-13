from django.db import models
from django.contrib.contenttypes.models import ContentType
from cms_core.models import TimeStampedModel, SEOMetadataModel, SluggedModel


class TaxonomyGroup(TimeStampedModel, SluggedModel):
    """
    A logical grouping of taxonomy terms (e.g., 'Categories', 'Tags', 'Brands').
    """
    name = models.CharField(max_length=100)
    is_hierarchical = models.BooleanField(default=False)
    applicable_content_types = models.ManyToManyField(ContentType, blank=True)

    SLUG_SOURCE_FIELD = 'name'

    def __str__(self):
        return self.name


class TaxonomyTerm(TimeStampedModel, SEOMetadataModel, SluggedModel):
    """
    A specific term within a TaxonomyGroup.
    """
    group = models.ForeignKey(
        TaxonomyGroup,
        on_delete=models.CASCADE,
        related_name='terms'
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )
    name = models.CharField(max_length=100)

    SLUG_SOURCE_FIELD = 'name'

    def __str__(self):
        return f"{self.name} ({self.group.name})"

    def get_absolute_url(self):
        """
        Returns a structured URL path for the term.
        """
        return f"/taxonomy/{self.group.slug}/{self.slug}/"


# A concrete model for testing reverse relation migration in merge_terms
class MockContentModel(models.Model):
    title = models.CharField(max_length=100)
    primary_term = models.ForeignKey(TaxonomyTerm, null=True, blank=True, on_delete=models.SET_NULL, related_name='mock_primary_contents')
    tags = models.ManyToManyField(TaxonomyTerm, blank=True, related_name='mock_tagged_contents')
