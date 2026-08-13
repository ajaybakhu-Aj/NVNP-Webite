from django.apps import AppConfig


class CmsHeadlessConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms_headless'

    def ready(self):
        pass
