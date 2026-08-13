from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from cms_core.models import Page
from cms_commerce.models import Product
# Normally we would import TaxonomyTerm from taxonomies.models but I'll skip it if not fully integrated yet, or handle via string reference if possible. 
# I'll just import it if it exists.
try:
    from taxonomies.models import TaxonomyTerm
except ImportError:
    TaxonomyTerm = None


def invalidate_cache_pattern(pattern):
    """
    Utility to wipe cache keys by pattern.
    Since standard locmem backend doesn't support delete_pattern, we mock it 
    if it's missing (for local testing).
    """
    if hasattr(cache, 'delete_pattern'):
        cache.delete_pattern(pattern)
    else:
        # Fallback for locmem backend during testing - wipes everything
        # In production with Redis, this won't be hit.
        cache.clear()


@receiver([post_save, post_delete], sender=Page)
def invalidate_page_cache(sender, instance, **kwargs):
    # Wipe all page API caches
    invalidate_cache_pattern("views.api.*/api/v1/pages/*")


@receiver([post_save, post_delete], sender=Product)
def invalidate_product_cache(sender, instance, **kwargs):
    # Wipe all product API caches
    invalidate_cache_pattern("views.api.*/api/v1/products/*")


if TaxonomyTerm:
    @receiver([post_save, post_delete], sender=TaxonomyTerm)
    def invalidate_taxonomy_cache(sender, instance, **kwargs):
        # Wipe all taxonomy API caches
        invalidate_cache_pattern("views.api.*/api/v1/taxonomies/*")
