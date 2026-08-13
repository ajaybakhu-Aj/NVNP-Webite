from django.urls import path
from .views import FormSubmissionView

urlpatterns = [
    path('forms/<slug:slug>/submit/', FormSubmissionView.as_view(), name='form-submit'),
]
