from django.urls import path
from .views import GeneratePreviewTokenView


urlpatterns = [
    path('preview-token/', GeneratePreviewTokenView.as_view(), name='headless-preview-token'),
]
