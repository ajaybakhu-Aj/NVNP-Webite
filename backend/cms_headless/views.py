from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .preview import generate_preview_token


class GeneratePreviewTokenView(APIView):
    """
    Returns a short-lived JWT that allows Next.js to fetch drafts.
    Requires authenticated admin/editor privileges.
    """
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        token = generate_preview_token(request.user)
        return Response({
            'preview_token': token
        })
