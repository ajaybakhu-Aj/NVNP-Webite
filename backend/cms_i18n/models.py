from django.db import models
from .context import get_current_language


class TranslatableContent(models.Model):
    """
    Abstract base class providing dynamic JSON-based translations.
    """
    # Example structure: 
    # {
    #   'en': {'title': 'English Title', 'body': '...'}, 
    #   'ne': {'title': 'नेपाली शीर्षक', 'body': '...'}
    # }
    translations = models.JSONField(default=dict, blank=True)

    class Meta:
        abstract = True

    def get_translated_field(self, field_name, default=''):
        """
        Helper to dynamically fetch a field value based on current thread-local language context.
        Falls back to 'en' if requested language is missing.
        """
        lang = get_current_language()
        
        # First try the requested language
        if lang in self.translations and field_name in self.translations[lang]:
            val = self.translations[lang][field_name]
            if val:
                return val
                
        # Fallback to English
        if 'en' in self.translations and field_name in self.translations['en']:
            val = self.translations['en'][field_name]
            if val:
                return val
                
        return default
