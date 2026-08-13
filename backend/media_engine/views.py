import hashlib
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django_q.tasks import async_task
from .models import MediaAsset
from .serializers import MediaAssetSerializer


class UploadMediaView(APIView):
    authentication_classes = []
    permission_classes = []
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_file = request.FILES['file']
        
        # Calculate SHA-256 hash in chunks
        sha256 = hashlib.sha256()
        for chunk in uploaded_file.chunks():
            sha256.update(chunk)
        file_hash = sha256.hexdigest()
        
        # Deduplication check
        existing_asset = MediaAsset.objects.filter(file_hash=file_hash).first()
        if existing_asset:
            serializer = MediaAssetSerializer(existing_asset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Reset file pointer after hashing
        uploaded_file.seek(0)
        
        serializer = MediaAssetSerializer(data=request.data)
        if serializer.is_valid():
            asset = serializer.save(
                file_hash=file_hash,
                file_size=uploaded_file.size,
                mime_type=uploaded_file.content_type
            )
            
            # Dispatch async task for optimization
            async_task('media_engine.tasks.optimize_image_task', asset.id)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
