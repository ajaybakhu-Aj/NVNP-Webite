import json
from .seo_services import get_page_schema
from .breadcrumbs import generate_breadcrumbs_schema

def seo_schema_processor(request):
    """
    Auto-injection Django context processor. Evaluates current request metadata 
    and injects a clean, safe HTML representation of the target JSON-LD schema
    as well as automated BreadcrumbList schemas.
    
    Usage inside templates:
        {{ seo_json_ld_markup|safe }}
        {{ seo_breadcrumbs|safe }}
    """
    context = {}
    
    # 1. Generate automated BreadcrumbList script block
    try:
        context['seo_breadcrumbs'] = generate_breadcrumbs_schema(request)
    except Exception:
        context['seo_breadcrumbs'] = ""

    seo_obj = getattr(request, 'seo_obj', None)
    seo_type = getattr(request, 'seo_type', None)
    
    # Default fallback to homepage if on root URL
    if not seo_type and request.path == '/':
        seo_type = 'homepage'

    context['seo_obj'] = seo_obj

    if not seo_type:
        return context

    # Fetch the schema (validates and respects database 'schema_override' automatically)
    schema_dict = get_page_schema(request, obj=seo_obj, page_type=seo_type)
    
    if not schema_dict:
        return context

    try:
        # Wrap structure inside script markup
        script_markup = f'<script type="application/ld+json">\n{json.dumps(schema_dict, indent=2)}\n</script>'
        context['seo_json_ld_markup'] = script_markup
    except Exception:
        pass
        
    return context
