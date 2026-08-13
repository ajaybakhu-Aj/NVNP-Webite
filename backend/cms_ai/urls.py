from django.urls import path
from .views import GenerateMetaView, SuggestAltTextView, DraftFAQsView

urlpatterns = [
    path('generate-meta/', GenerateMetaView.as_view(), name='ai-generate-meta'),
    path('suggest-alt/', SuggestAltTextView.as_view(), name='ai-suggest-alt'),
    path('draft-faqs/', DraftFAQsView.as_view(), name='ai-draft-faqs'),
]
