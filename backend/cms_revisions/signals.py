from django.db.models.signals import post_save
from django.dispatch import receiver
from cms_core.models import Page
from .services import SnapshotService


@receiver(post_save, sender=Page)
def create_page_revision(sender, instance, created, **kwargs):
    """
    Automatically create a snapshot whenever a Page is saved/published.
    """
    comment = "Initial creation" if created else "Autosave on update"
    SnapshotService.create_snapshot(instance, comment=comment)
