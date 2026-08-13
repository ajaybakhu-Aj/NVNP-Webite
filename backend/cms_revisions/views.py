from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ContentRevision
from .services import SnapshotService


class RevisionRestoreView(APIView):
    """
    Restores a specific object to the state captured in the ContentRevision snapshot.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request, id):
        revision = get_object_or_404(ContentRevision, id=id)
        
        try:
            restored_instance = SnapshotService.restore_snapshot(revision.id)
            return Response({
                "message": f"Successfully restored {revision.content_type.model} {revision.object_id} to version {revision.version_number}."
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": f"Failed to restore revision: {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)
