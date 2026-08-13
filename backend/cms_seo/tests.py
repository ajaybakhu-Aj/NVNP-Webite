import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from .services.analyzer import SEOAnalyzer
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='seouser', password='password')
    client.login(username='seouser', password='password')
    return client


class TestSEOAnalyzer:
    def test_perfect_score(self):
        # A reasonably sized text with the keyword well placed.
        # We need enough words to dilute the keyword density and simple words to keep readability high.
        content = """
        <h1>Best Hiking Boots 2026</h1>
        <p>Welcome to our guide on the best hiking boots for this year.
        You need good shoes to be safe. It is very fun to walk outside. 
        We love to go on long walks in the woods. You can see trees and birds. 
        It is a great time for everyone.</p>
        <p>We will help you find nice shoes. Some are heavy. Some are light. 
        Some keep water out. You want your feet to be dry and warm. 
        We picked many good shoes for you.</p>
        <a href="/internal-link">Read more about our testing methodology</a>
        <a href="https://external.com">Check out the manufacturer site</a>
        <img src="boot.jpg" alt="A pair of the best hiking boots on a rocky trail" />
        """ + "<p>Here is some more very simple text. It has short sentences. It uses easy words. This will help the score. Walking is fun. I like to walk. You like to walk too. We all like to walk outside in the sun. The sky is blue. The grass is green. This is a very simple and easy thing to read. It has no big words at all. Just small ones.</p>" * 5
        
        analyzer = SEOAnalyzer(
            content=content,
            keyword="best hiking boots",
            title="Top 10 Best Hiking Boots for 2026",
            description="Discover the best hiking boots for your next adventure with our comprehensive reviews."
        )
        result = analyzer.analyze()
        
        assert result['score'] == 100
        assert len(result['recommendations']) == 0
        assert result['metrics']['internal_links'] >= 1
        assert result['metrics']['external_links'] >= 1
        assert result['metrics']['images_missing_alt'] == 0

    def test_missing_keyword_penalties(self):
        content = """
        <h1>Just Some Shoes</h1>
        <p>This is a short post.</p>
        """
        analyzer = SEOAnalyzer(
            content=content,
            keyword="best hiking boots",
            title="Just Some Shoes",
            description="A post about shoes."
        )
        result = analyzer.analyze()
        
        # Penalties: 
        # Keyword density too low (-10)
        # Missing in title (-10)
        # Missing in description (-10)
        # Missing in H1 (-10)
        # Missing in first 100 words (-5)
        # No internal links (-5)
        # No external links (-5)
        # Readability too short (0 deduction, skipped)
        
        assert result['score'] < 100
        recs = " ".join(result['recommendations'])
        assert "density is too low" in recs
        assert "SEO title" in recs
        assert "meta description" in recs
        assert "H1 tag" in recs

    def test_missing_alt_tags(self):
        content = """
        <h1>best hiking boots</h1>
        <p>best hiking boots</p>
        <img src="1.jpg" />
        <img src="2.jpg" alt="" />
        <img src="3.jpg" alt="  " />
        """
        analyzer = SEOAnalyzer(
            content=content,
            keyword="best hiking boots",
            title="best hiking boots",
            description="best hiking boots"
        )
        result = analyzer.analyze()
        
        assert result['metrics']['images_missing_alt'] == 3
        recs = " ".join(result['recommendations'])
        assert "3 image(s) are missing an 'alt' attribute." in recs


@pytest.mark.django_db
class TestSEOAPI:
    def test_api_endpoint(self, api_client):
        url = reverse('seo-analyze')
        payload = {
            "content": "<h1>best hiking boots</h1><p>best hiking boots</p>",
            "keyword": "best hiking boots",
            "title": "best hiking boots",
            "description": "best hiking boots"
        }
        
        response = api_client.post(url, payload, format='json')
        assert response.status_code == 200
        assert 'score' in response.data
        assert 'recommendations' in response.data
        assert 'metrics' in response.data
