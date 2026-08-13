from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TaxonomyGroup, TaxonomyTerm
from .serializers import TaxonomyGroupSerializer, TaxonomyTermSerializer
from .services import merge_terms


class TaxonomyGroupViewSet(viewsets.ModelViewSet):
    queryset = TaxonomyGroup.objects.all()
    serializer_class = TaxonomyGroupSerializer
    lookup_field = 'slug'


class TaxonomyTermViewSet(viewsets.ModelViewSet):
    serializer_class = TaxonomyTermSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = TaxonomyTerm.objects.all()
        group_slug = self.request.query_params.get('group_slug', None)
        if group_slug is not None:
            queryset = queryset.filter(group__slug=group_slug)
        return queryset

    @action(detail=True, methods=['post'])
    def merge(self, request, slug=None):
        """
        Merge this term into another target term.
        Expects {'target_term_id': <id>} in request data.
        """
        source_term = self.get_object()
        target_term_id = request.data.get('target_term_id')
        
        if not target_term_id:
            return Response(
                {"error": "target_term_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            merge_terms(source_term.id, target_term_id)
            return Response({"status": "Terms successfully merged."}, status=status.HTTP_200_OK)
        except TaxonomyTerm.DoesNotExist:
            return Response(
                {"error": "Target term does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
