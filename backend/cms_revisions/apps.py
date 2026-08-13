from django.apps import AppConfig


class CmsRevisionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms_revisions'

    def ready(self):
        pass
