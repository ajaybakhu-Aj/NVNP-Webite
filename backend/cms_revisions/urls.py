from django.urls import path
from .views import RevisionRestoreView

urlpatterns = [
    path('revisions/<int:id>/restore/', RevisionRestoreView.as_view(), name='revision-restore'),
]
