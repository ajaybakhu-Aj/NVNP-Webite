import pytest
from unittest.mock import patch
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.test import APIClient
from .preview import generate_preview_token, validate_preview_token
from .revalidation import trigger_frontend_revalidation


User = get_user_model()


@pytest.fixture
def setup_admin():
    return User.objects.create_superuser(username='admin', password='password123', email='admin@example.com')


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
class TestPreviewTokens:

    def test_token_generation_and_validation(self, setup_admin):
        token = generate_preview_token(setup_admin)
        assert isinstance(token, str)
        
        payload = validate_preview_token(token)
        assert payload is not None
        assert payload['username'] == 'admin'
        assert payload['user_id'] == setup_admin.id

    def test_preview_endpoint(self, api_client, setup_admin):
        api_client.login(username='admin', password='password123')
        url = reverse('headless-preview-token')
        response = api_client.post(url)
        
        assert response.status_code == 200
        assert 'preview_token' in response.json()

    def test_preview_endpoint_unauthenticated(self, api_client):
        url = reverse('headless-preview-token')
        response = api_client.post(url)
        assert response.status_code in [401, 403]


class TestRevalidationService:

    @patch('cms_headless.revalidation.requests.post')
    def test_trigger_revalidation(self, mock_post):
        mock_post.return_value.status_code = 200
        
        # We run it synchronously for testing by patching Thread.start
        with patch('cms_headless.revalidation.threading.Thread.start') as mock_thread_start:
            def side_effect():
                # manually call the target
                pass
            # We can't easily execute the inner function of a patched thread if we don't mock correctly.
            # Let's just patch requests and wait for the thread to join instead.
            
        # The correct way to test threaded calls is to let the thread run, or patch requests and join the thread.
        import threading
        original_thread = threading.Thread
        
        threads = []
        class MockThread(original_thread):
            def start(self):
                threads.append(self)
                super().start()
                
        with patch('cms_headless.revalidation.threading.Thread', MockThread):
            trigger_frontend_revalidation('test-slug', 'page')
            for t in threads:
                t.join()
                
        mock_post.assert_called_once()
        args, kwargs = mock_post.call_args
        assert kwargs['params']['slug'] == 'test-slug'
        assert kwargs['params']['secret'] == settings.FRONTEND_REVALIDATION_SECRET
