from rest_framework import generics
from .models import Page
from .serializers import PageSerializer

class PageRetrieveView(generics.RetrieveAPIView):
    queryset = Page.objects.prefetch_related('blocks').all()
    serializer_class = PageSerializer
    lookup_field = 'slug'
    authentication_classes = []
    permission_classes = []
