from django.db.models.signals import post_save, post_delete
from .revalidation import trigger_frontend_revalidation
import logging

logger = logging.getLogger(__name__)

try:
    from cms_core.models import Page
    from cms_commerce.models import Product
    MODELS_TO_REVALIDATE = [Page, Product]
except ImportError:
    MODELS_TO_REVALIDATE = []
    logger.warning("Could not import Page or Product models for headless revalidation.")


def revalidate_instance(sender, instance, **kwargs):
    if hasattr(instance, 'slug'):
        content_type = sender.__name__.lower()
        # Optional: Check if the content is published. Assume it is for now, or check an 'is_published' flag.
        trigger_frontend_revalidation(instance.slug, content_type=content_type)

for model in MODELS_TO_REVALIDATE:
    post_save.connect(revalidate_instance, sender=model)
    post_delete.connect(revalidate_instance, sender=model)
