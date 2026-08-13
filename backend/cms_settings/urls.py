from django.urls import path
from .views import ThemeSettingsView, GlobalSnippetsView

urlpatterns = [
    path('site-settings/theme/', ThemeSettingsView.as_view(), name='theme-settings'),
    path('site-settings/snippets/', GlobalSnippetsView.as_view(), name='global-snippets'),
]
