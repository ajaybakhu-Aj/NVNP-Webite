from django.urls import path
from .views import PageStatsView

urlpatterns = [
    path('page-stats/', PageStatsView.as_view(), name='analytics-page-stats'),
]
