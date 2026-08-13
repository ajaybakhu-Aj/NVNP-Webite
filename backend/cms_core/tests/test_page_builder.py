import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from cms_core.models import Page, PageBlock
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='tester', password='password')
    client.login(username='tester', password='password')
    return client


@pytest.fixture
def page_with_blocks():
    page = Page.objects.create(
        title="Home Page",
        slug="home"
    )
    
    # Create blocks out of order
    PageBlock.objects.create(
        page=page,
        block_type="FeatureGrid",
        order=2,
        data={"title": "Features", "features": []}
    )
    
    PageBlock.objects.create(
        page=page,
        block_type="Hero",
        order=1,
        data={"headline": "Welcome to our site"}
    )
    
    return page


@pytest.mark.django_db
class TestPageBuilderAPI:
    def test_retrieve_page(self, api_client, page_with_blocks):
        url = reverse('page-detail', kwargs={'slug': 'home'})
        response = api_client.get(url)
        
        assert response.status_code == 200
        assert response.data['slug'] == 'home'
        assert response.data['title'] == 'Home Page'
        
        # Verify blocks are sorted by order
        blocks = response.data['blocks']
        assert len(blocks) == 2
        assert blocks[0]['block_type'] == 'Hero'
        assert blocks[1]['block_type'] == 'FeatureGrid'
        assert blocks[0]['data']['headline'] == 'Welcome to our site'
