import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.core.cache import cache
from cms_core.models import Page
from cms_commerce.models import Product
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='tester', password='password')
    client.login(username='tester', password='password')
    return client


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


@pytest.mark.django_db
class TestCMSCacheMiddleware:
    def test_cache_control_headers_injected(self, api_client):
        # We need an endpoint that returns 200 OK. Let's use the site settings theme endpoint
        url = reverse('theme-settings')
        response = api_client.get(url)
        
        assert response.status_code == 200
        assert 'Cache-Control' in response
        assert response['Cache-Control'] == 's-maxage=3600, stale-while-revalidate=59'

    def test_response_is_cached(self, api_client):
        url = reverse('theme-settings')
        
        # First request (miss)
        response1 = api_client.get(url)
        assert response1.status_code == 200
        
        # Find the cache key using the personalization context logic
        # Since mock context is empty, the personalization key is 'default'
        expected_cache_key = f"views.api.{url}.default"
        
        # Assert the response is now in the cache
        cached_response = cache.get(expected_cache_key)
        assert cached_response is not None
        assert cached_response.status_code == 200
        
        # Second request (hit)
        # Note: the APIClient goes through middleware so this will just fetch from cache
        response2 = api_client.get(url)
        assert response2.status_code == 200


@pytest.mark.django_db
class TestInvalidationEngine:
    def test_page_save_invalidates_cache(self):
        # Mock a cache entry for a page
        cache_key = "views.api./api/v1/pages/home/.default"
        cache.set(cache_key, "dummy_data", 3600)
        
        assert cache.get(cache_key) == "dummy_data"
        
        # Save a new page which should trigger the post_save signal
        Page.objects.create(title="Home", slug="home", seo_title="Home SEO")
        
        # The fallback `cache.clear()` will be called since it's the locmem backend
        # which means the cache should now be empty
        assert cache.get(cache_key) is None

    def test_product_save_invalidates_cache(self):
        cache_key = "views.api./api/v1/products/shoes/.default"
        cache.set(cache_key, "dummy_data", 3600)
        
        assert cache.get(cache_key) == "dummy_data"
        
        # Save a product
        Product.objects.create(title="Shoes", slug="shoes", base_price=10.00)
        
        assert cache.get(cache_key) is None
