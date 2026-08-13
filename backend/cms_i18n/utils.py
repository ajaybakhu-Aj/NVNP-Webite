def generate_hreflang_tags(base_url, path, supported_languages=None):
    """
    Generates SEO hreflang link tags for all supported languages.
    :param base_url: The canonical base domain (e.g. 'https://example.com')
    :param path: The path without language prefix (e.g. '/about/')
    :param supported_languages: List of supported languages, defaults to ['en', 'ne']
    :return: A string containing HTML <link> tags.
    """
    if supported_languages is None:
        supported_languages = ['en', 'ne']
        
    # Ensure clean slashes
    base_url = base_url.rstrip('/')
    path = '/' + path.lstrip('/') if path else '/'
    
    tags = []
    
    # x-default usually points to the primary language or a language selector
    # We'll point it to the English (en) version as default fallback
    x_default_url = f"{base_url}/en{path}"
    tags.append(f'<link rel="alternate" hreflang="x-default" href="{x_default_url}" />')
    
    for lang in supported_languages:
        lang_url = f"{base_url}/{lang}{path}"
        tags.append(f'<link rel="alternate" hreflang="{lang}" href="{lang_url}" />')
        
    return '\n'.join(tags)
