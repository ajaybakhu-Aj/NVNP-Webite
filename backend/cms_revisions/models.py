from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User


class ContentRevision(models.Model):
    """
    Enterprise revision system for storing point-in-time snapshots of any model.
    """
    # Polymorphic relations to allow attaching to any model (e.g., Page, Product)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.CharField(max_length=255)
    content_object = GenericForeignKey('content_type', 'object_id')

    # Revision metadata
    version_number = models.PositiveIntegerField()
    snapshot = models.JSONField(help_text="Serialized JSON payload of the object's fields at this point in time.")
    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.TextField(blank=True, help_text="Reason for the change or autosave note.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('content_type', 'object_id', 'version_number')
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]

    def __str__(self):
        return f"Revision v{self.version_number} for {self.content_type.model} {self.object_id}"
