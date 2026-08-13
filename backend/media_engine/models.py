from django.db import models
from django.utils import timezone


class MediaAsset(models.Model):
    file = models.ImageField(upload_to='assets/%Y/%m/')
    title = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    
    # Focal point for frontend cropping
    focal_x = models.FloatField(default=50.0, help_text="X-coordinate (percentage)")
    focal_y = models.FloatField(default=50.0, help_text="Y-coordinate (percentage)")
    
    # File details
    mime_type = models.CharField(max_length=50, blank=True)
    file_size = models.PositiveIntegerField(null=True, blank=True, help_text="Size in bytes")
    file_hash = models.CharField(max_length=64, unique=True, db_index=True, help_text="SHA-256 hash")
    
    # Processed variants
    srcset_paths = models.JSONField(default=dict, blank=True, help_text="Paths to optimized responsive variants")

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title or self.file.name
