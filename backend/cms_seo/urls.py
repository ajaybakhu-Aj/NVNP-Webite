from django.urls import path
from .views import SEOAnalyzeView

urlpatterns = [
    path('analyze/', SEOAnalyzeView.as_view(), name='seo-analyze'),
]
