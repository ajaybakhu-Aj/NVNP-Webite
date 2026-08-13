from django.core.cache import cache
from cms_core.personalization.cache import generate_personalization_cache_key


class CMSCacheMiddleware:
    """
    Edge-ready caching middleware.
    Caches full responses in Redis and injects Cache-Control headers for Edge CDNs.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only cache GET and HEAD requests to API endpoints (or specific views)
        # Skip admin and non-safe methods
        if (
            request.method not in ['GET', 'HEAD']
            or request.path.startswith('/admin/')
            or request.path.startswith('/media/')
            or request.path.startswith('/static/')
        ):
            return self.get_response(request)

        # Generate a cache key that incorporates personalization context
        personalization_key = generate_personalization_cache_key(request)
        
        # The base key uses the full URL path
        # e.g., views.api./api/v1/pages/home/.geo:US|utm_src:google
        cache_key = f"views.api.{request.path}.{personalization_key}"

        # Try to fetch from cache
        cached_response = cache.get(cache_key)
        if cached_response:
            return cached_response

        # If miss, get the response from the view
        response = self.get_response(request)

        # Only cache successful responses (and avoid pickling streaming responses like FileResponse)
        if response.status_code == 200 and not getattr(response, 'streaming', False):
            # Add Edge proxy headers for CDN caching
            response['Cache-Control'] = 's-maxage=3600, stale-while-revalidate=59'
            
            # We need to make sure the response is fully rendered if it's a TemplateResponse/Response
            if hasattr(response, 'render') and callable(response.render):
                response.render()
                
            # Save to Redis (using default cache backend, 1 hour TTL)
            cache.set(cache_key, response, 3600)

        return response
