import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from unittest.mock import patch, MagicMock

User = get_user_model()

@pytest.fixture
def setup_admin():
    return User.objects.create_superuser(username='admin', password='password123', email='admin@example.com')

@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
class TestAIAssistantAPI:

    @patch('cms_ai.services.assistant.OpenAI')
    def test_generate_meta_endpoint(self, mock_openai, api_client, setup_admin, settings):
        settings.OPENAI_API_KEY = 'test-key'
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        
        # Mock the chat.completions.create response
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = "A generated meta description focusing on AI features."
        mock_client.chat.completions.create.return_value = mock_response

        url = reverse('ai-generate-meta')
        api_client.login(username='admin', password='password123')
        
        response = api_client.post(url, {
            'content_body': 'This is a test content body.',
            'focus_keyword': 'AI features'
        }, format='json')
        
        assert response.status_code == 200
        assert response.json() == {"draft_meta_description": "A generated meta description focusing on AI features."}
        mock_client.chat.completions.create.assert_called_once()

    @patch('cms_ai.services.assistant.OpenAI')
    def test_suggest_alt_text_endpoint(self, mock_openai, api_client, setup_admin, settings):
        settings.OPENAI_API_KEY = 'test-key'
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = "A placeholder image showing AI concepts."
        mock_client.chat.completions.create.return_value = mock_response

        url = reverse('ai-suggest-alt')
        api_client.login(username='admin', password='password123')
        
        response = api_client.post(url, {
            'image_url': 'https://example.com/image.jpg'
        }, format='json')
        
        assert response.status_code == 200
        assert response.json() == {"draft_alt_text": "A placeholder image showing AI concepts."}

    @patch('cms_ai.services.assistant.OpenAI')
    def test_draft_faqs_endpoint(self, mock_openai, api_client, setup_admin, settings):
        settings.OPENAI_API_KEY = 'test-key'
        mock_client = MagicMock()
        mock_openai.return_value = mock_client
        
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        
        mock_content = '{"faqs": [{"question": "Is it fast?", "answer": "Yes."}]}'
        mock_response.choices[0].message.content = mock_content
        mock_client.chat.completions.create.return_value = mock_response

        url = reverse('ai-draft-faqs')
        api_client.login(username='admin', password='password123')
        
        response = api_client.post(url, {
            'product_spec_json': {"speed": "fast"}
        }, format='json')
        
        assert response.status_code == 200
        assert response.json() == {"draft_faqs": [{"question": "Is it fast?", "answer": "Yes."}]}

    def test_endpoints_reject_unauthenticated_users(self, api_client):
        # Without authentication
        response = api_client.post(reverse('ai-generate-meta'), {}, format='json')
        assert response.status_code in [401, 403]
