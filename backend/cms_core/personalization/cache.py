from .evaluator import BlockVisibilityEvaluator


def generate_personalization_cache_key(request):
    """
    Generates a unique string based on the current user's geographical and campaign context.
    This string should be appended to standard view cache keys to prevent serving
    incorrectly personalized content from the cache.
    """
    parts = []
    
    # Geo Context
    country_code = BlockVisibilityEvaluator._get_client_country(request)
    if country_code:
        parts.append(f"geo:{country_code}")
        
    # Campaign Context
    utm_source = request.GET.get('utm_source')
    if utm_source:
        parts.append(f"utm_src:{utm_source}")
        
    utm_campaign = request.GET.get('utm_campaign')
    if utm_campaign:
        parts.append(f"utm_cmp:{utm_campaign}")
        
    if not parts:
        return "default"
        
    return "|".join(parts)
