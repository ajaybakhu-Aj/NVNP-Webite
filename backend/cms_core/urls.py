from django.urls import path
from .views import PageRetrieveView

urlpatterns = [
    path('pages/<slug:slug>/', PageRetrieveView.as_view(), name='page-detail'),
]
