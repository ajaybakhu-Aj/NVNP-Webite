import re
from django.utils.deprecation import MiddlewareMixin
from .context import set_current_language


class LanguageContextMiddleware(MiddlewareMixin):
    """
    Detects language from URL prefix (e.g. /ne/api/...) or Accept-Language header
    and sets it in the thread-local state for deep model access.
    """
    # Optional: explicitly supported languages (en, ne)
    SUPPORTED_LANGUAGES = ['en', 'ne']

    def process_request(self, request):
        # 1. Check URL Prefix (e.g., /ne/api/...)
        path = request.path_info
        match = re.match(r'^/([a-z]{2})/', path)
        
        lang = 'en'  # default
        
        if match:
            prefix = match.group(1)
            if prefix in self.SUPPORTED_LANGUAGES:
                lang = prefix
        else:
            # 2. Check Accept-Language Header if no URL prefix
            accept_lang = request.headers.get('Accept-Language', '')
            if accept_lang:
                # parse basic accept language (e.g., "ne,en-US;q=0.9,en;q=0.8")
                primary_lang = accept_lang.split(',')[0].split('-')[0].strip().lower()
                if primary_lang in self.SUPPORTED_LANGUAGES:
                    lang = primary_lang
                    
        set_current_language(lang)
