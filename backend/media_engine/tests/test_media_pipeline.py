import pytest
import io
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from django.urls import reverse
from media_engine.models import MediaAsset
from PIL import Image
import hashlib
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='password')
    client.login(username='testuser', password='password')
    return client


@pytest.fixture
def generate_dummy_image():
    """
    Generates a red 1000x1000 dummy image to test responsive generation.
    """
    file_obj = io.BytesIO()
    image = Image.new('RGB', size=(1000, 1000), color=(255, 0, 0))
    image.save(file_obj, 'JPEG')
    file_obj.seek(0)
    return file_obj.read()


@pytest.mark.django_db
class TestMediaPipeline:
    def test_upload_and_deduplication(self, api_client, generate_dummy_image):
        url = reverse('media-upload')
        
        file_content = generate_dummy_image
        
        # First upload
        uploaded_file1 = SimpleUploadedFile("test_image.jpg", file_content, content_type="image/jpeg")
        response1 = api_client.post(url, {'file': uploaded_file1, 'title': 'First Upload'}, format='multipart')
    
        assert response1.status_code == 201
        asset1_id = response1.data['id']
        asset1 = MediaAsset.objects.get(id=asset1_id)
        assert asset1.title == 'First Upload'
        
        # Verify hash was saved
        sha256 = hashlib.sha256()
        sha256.update(file_content)
        expected_hash = sha256.hexdigest()
        assert asset1.file_hash == expected_hash

        # Second upload (identical file)
        uploaded_file2 = SimpleUploadedFile("test_image.jpg", file_content, content_type="image/jpeg")
        response2 = api_client.post(url, {'file': uploaded_file2, 'title': 'Duplicate Upload'}, format='multipart')
        
        # Should return 200 OK (deduplicated) instead of 201 Created
        assert response2.status_code == 200
        assert response2.data['id'] == asset1_id
        
        # Total assets should still be 1
        assert MediaAsset.objects.count() == 1

    def test_optimize_image_task(self, generate_dummy_image):
        # We need to manually call the task to test it without firing up a Q cluster
        from media_engine.tasks import optimize_image_task
        
        file_content = generate_dummy_image
        uploaded_file = SimpleUploadedFile("test_task.jpg", file_content, content_type="image/jpeg")
        
        asset = MediaAsset.objects.create(
            file=uploaded_file,
            mime_type='image/jpeg',
            file_size=len(file_content),
            file_hash='fake_hash_123'
        )
        
        result = optimize_image_task(asset.id)
        assert result == "Success"
        
        # Refresh asset
        asset.refresh_from_db()
        
        # The image is 1000px wide, so it should generate 400w and 800w.
        # It will ALSO generate 1200w, but it skips upscaling, so the 1200w variants are actually 1000px.
        assert '400' in asset.srcset_paths
        assert 'webp' in asset.srcset_paths['400']
        assert 'avif' in asset.srcset_paths['400']
        
        assert '800' in asset.srcset_paths
        assert '1200' in asset.srcset_paths
