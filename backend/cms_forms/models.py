from django.db import models
from cms_core.models import TimeStampedModel, SluggedModel


class Form(TimeStampedModel, SluggedModel):
    """
    A dynamic form definition holding field schemas and notification preferences.
    """
    title = models.CharField(max_length=255)
    fields_schema = models.JSONField(
        default=list, 
        blank=True, 
        help_text="List of fields, steps, and conditional rules in JSON format."
    )
    notification_emails = models.JSONField(
        default=list, 
        blank=True, 
        help_text="List of email addresses to notify upon submission."
    )

    def __str__(self):
        return self.title


class FormSubmission(TimeStampedModel):
    """
    A captured submission from a Form.
    """
    STATUS_CHOICES = (
        ('New', 'New'),
        ('Contacted', 'Contacted'),
        ('Converted', 'Converted'),
        ('Lost', 'Lost'),
    )

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='submissions')
    data = models.JSONField(default=dict, help_text="The captured form data.")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    def __str__(self):
        return f"Submission for {self.form.title} at {self.created_at}"
