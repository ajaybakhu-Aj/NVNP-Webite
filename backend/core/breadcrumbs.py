import json
import logging
from django.urls import resolve, Resolver404
from .models import Product, BlogPost, Category, Event, Dealer

logger = logging.getLogger(__name__)

def resolve_path_label(path, request):
    """
    Resolves a URL path segment to its human-readable page title or database record name,
    avoiding raw URL slug representations.
    """
    if path == '/':
        return "Home"

    try:
        resolver_match = resolve(path)
    except Resolver404:
        # Fallback to sanitized URL text if route doesn't match Django URLs
        return path.strip('/').split('/')[-1].replace('-', ' ').replace('_', ' ').title()

    view_name = resolver_match.view_name
    kwargs = resolver_match.kwargs

    # Query corresponding database tables to pull accurate Custom H1/Title/Name labels
    try:
        if view_name == 'product_detail' and 'product_slug' in kwargs:
            obj = Product.objects.filter(slug=kwargs['product_slug']).first()
            if obj:
                return getattr(obj, 'seo_title', None) or obj.name

        elif view_name == 'blog_detail' and 'post_slug' in kwargs:
            obj = BlogPost.objects.filter(slug=kwargs['post_slug']).first()
            if obj:
                return getattr(obj, 'seo_title', None) or obj.title

        elif view_name == 'blog_category' and 'category_slug' in kwargs:
            obj = Category.objects.filter(slug=kwargs['category_slug']).first()
            if obj:
                return obj.name

        elif view_name == 'event_detail' and 'event_slug' in kwargs:
            obj = Event.objects.filter(slug=kwargs['event_slug']).first()
            if obj:
                return getattr(obj, 'seo_title', None) or obj.title
    except Exception as e:
        logger.error(f"Error querying database for breadcrumb segment {path}: {str(e)}")

    # Clean static mapping for List Views
    static_mappings = {
        'product_list': 'Products',
        'blog_list': 'Blog',
        'event_list': 'Events',
        'dealer_list': 'Dealers',
    }
    
    if view_name in static_mappings:
        return static_mappings[view_name]

    # Fallback to sanitized slug
    segment_name = path.strip('/').split('/')[-1]
    return segment_name.replace('-', ' ').replace('_', ' ').title()


def generate_breadcrumbs_schema(request):
    """
    1. Intercepts current active HTTP path string array.
    2. Automatically breaks down every slash segment.
    3. Fetches database records for labels, preventing raw slug leaks.
    4. Delivers an application/ld+json script block.
    """
    path_info = request.path_info
    
    # Generate list of segment paths (e.g. /, /products/, /products/slug/)
    segments = ['/']
    parts = [p for p in path_info.split('/') if p]
    
    current_path = ""
    for part in parts:
        current_path += f"/{part}/"
        segments.append(current_path)

    # Build schema items
    list_items = []
    for index, segment in enumerate(segments, start=1):
        label = resolve_path_label(segment, request)
        absolute_url = request.build_absolute_uri(segment)
        
        list_items.append({
            "@type": "ListItem",
            "position": index,
            "name": label,
            "item": absolute_url
        })

    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": list_items
    }

    # Deliver final structure cleanly embedded inside an application/ld+json script format
    return f'<script type="application/ld+json">\n{json.dumps(schema, indent=2)}\n</script>'
