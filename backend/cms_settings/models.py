from django.db import models
from django.core.exceptions import ValidationError
from cms_core.models import TimeStampedModel


def validate_css_variable(value):
    if not value.startswith('--'):
        raise ValidationError('Design token key must start with "--" to be a valid CSS custom property.')


class DesignToken(TimeStampedModel):
    """
    Centralized design tokens for frontend styling.
    """
    CATEGORY_CHOICES = (
        ('Color', 'Color'),
        ('Typography', 'Typography'),
        ('Spacing', 'Spacing'),
        ('Other', 'Other'),
    )

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Color')
    key = models.CharField(
        max_length=255, 
        unique=True, 
        validators=[validate_css_variable], 
        help_text="Must start with '--', e.g. '--color-primary'"
    )
    value = models.CharField(max_length=255, help_text="e.g. '#141414' or '16px'")

    def __str__(self):
        return f"{self.key}: {self.value}"


class GlobalSnippet(TimeStampedModel):
    """
    Reusable text/HTML snippets for global use across the frontend.
    """
    key = models.CharField(
        max_length=255, 
        unique=True, 
        help_text="Unique identifier for the snippet, e.g. 'footer_address'"
    )
    content = models.TextField(help_text="The actual content of the snippet (Plain text or HTML).")

    def __str__(self):
        return self.key
