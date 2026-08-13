from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaxonomyGroupViewSet, TaxonomyTermViewSet

router = DefaultRouter()
router.register(r'groups', TaxonomyGroupViewSet)
router.register(r'terms', TaxonomyTermViewSet, basename='taxonomyterm')

urlpatterns = [
    path('', include(router.urls)),
]
