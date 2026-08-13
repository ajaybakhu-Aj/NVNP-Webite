import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.core.cache import cache


User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def setup_admin():
    return User.objects.create_superuser(username='admin', password='password123', email='admin@example.com')


@pytest.fixture
def setup_user():
    return User.objects.create_user(username='user', password='password123')


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


@pytest.mark.django_db
class TestAnalyticsAPI:
    def test_page_stats_requires_admin(self, api_client, setup_user):
        url = reverse('analytics-page-stats')
        
        # Anonymous
        response = api_client.get(url, {'path': '/test/'})
        assert response.status_code in [401, 403]
        
        # Normal user
        api_client.login(username='user', password='password123')
        response = api_client.get(url, {'path': '/test/'})
        assert response.status_code == 403

    def test_page_stats_returns_mocked_data(self, api_client, setup_admin):
        url = reverse('analytics-page-stats')
        api_client.login(username='admin', password='password123')
        
        response = api_client.get(url, {'path': '/products/ratri-g11/'})
        assert response.status_code == 200
        
        data = response.json()
        assert data['path'] == '/products/ratri-g11/'
        assert data['clicks'] == 1450
        assert data['impressions'] == 25000
        assert data['ctr'] == 0.058
        assert data['average_position'] == 4.2
        
    def test_page_stats_caches_response(self, api_client, setup_admin):
        url = reverse('analytics-page-stats')
        api_client.login(username='admin', password='password123')
        
        path = '/products/test/'
        response = api_client.get(url, {'path': path})
        assert response.status_code == 200
        
        # Verify it is in the cache
        cache_key = f"analytics_page_stats_{path}"
        cached_data = cache.get(cache_key)
        assert cached_data is not None
        assert cached_data['clicks'] == 1450
