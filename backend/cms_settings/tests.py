import pytest
from django.urls import reverse
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from .models import DesignToken, GlobalSnippet
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='tester', password='password')
    client.login(username='tester', password='password')
    return client


@pytest.fixture
def sample_data():
    DesignToken.objects.create(category="Color", key="--color-primary", value="#ff0000")
    DesignToken.objects.create(category="Spacing", key="--spacing-sm", value="8px")
    GlobalSnippet.objects.create(key="footer_text", content="© 2026 Company")


@pytest.mark.django_db
class TestDesignTokenValidation:
    def test_css_prefix_validation(self):
        with pytest.raises(ValidationError):
            token = DesignToken(category="Color", key="color-primary", value="#ff0000")
            token.full_clean()


@pytest.mark.django_db
class TestSettingsAPI:
    def test_theme_settings_endpoint(self, api_client, sample_data):
        url = reverse('theme-settings')
        response = api_client.get(url, format='json')
        
        assert response.status_code == 200
        data = response.json()
        
        # Check CSS string
        assert "--color-primary: #ff0000;" in data["css_string"]
        assert "--spacing-sm: 8px;" in data["css_string"]
        
        # Check JSON payload (prefix stripped)
        assert data["json_tokens"]["color"]["color-primary"] == "#ff0000"
        assert data["json_tokens"]["spacing"]["spacing-sm"] == "8px"

    def test_global_snippets_endpoint(self, api_client, sample_data):
        url = reverse('global-snippets')
        response = api_client.get(url, format='json')
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["footer_text"] == "© 2026 Company"
