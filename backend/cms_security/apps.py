from django.apps import AppConfig


class CmsSecurityConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms_security'

    def ready(self):
        pass
