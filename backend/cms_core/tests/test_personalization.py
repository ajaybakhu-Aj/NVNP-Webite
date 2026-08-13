import pytest
from unittest.mock import Mock
from cms_core.models import Page, PageBlock
from cms_core.personalization.evaluator import BlockVisibilityEvaluator
from cms_core.personalization.cache import generate_personalization_cache_key


@pytest.fixture
def mock_request():
    req = Mock()
    req.META = {}
    req.GET = {}
    return req


@pytest.fixture
def block_no_rules():
    page = Page(title="Test")
    return PageBlock(page=page, block_type="Hero", visibility_rules={})


@pytest.fixture
def block_with_rules():
    page = Page(title="Test")
    rules = {
        "countries": ["US", "CA"],
        "exclude_countries": ["IN"],
        "utm_source": "google",
        "utm_campaign": ["summer", "winter"]
    }
    return PageBlock(page=page, block_type="Hero", visibility_rules=rules)


class TestBlockVisibilityEvaluator:
    def test_empty_rules_always_visible(self, mock_request, block_no_rules):
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_no_rules) is True

    def test_geo_whitelist_success(self, mock_request, block_with_rules):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "US"
        mock_request.GET = {"utm_source": "google", "utm_campaign": "summer"}
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_with_rules) is True

    def test_geo_whitelist_failure(self, mock_request, block_with_rules):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "GB"
        mock_request.GET = {"utm_source": "google", "utm_campaign": "summer"}
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_with_rules) is False

    def test_geo_blacklist_failure(self, mock_request, block_with_rules):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "IN"
        mock_request.GET = {"utm_source": "google", "utm_campaign": "summer"}
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_with_rules) is False

    def test_utm_source_failure(self, mock_request, block_with_rules):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "US"
        mock_request.GET = {"utm_source": "bing", "utm_campaign": "summer"}
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_with_rules) is False

    def test_utm_campaign_failure(self, mock_request, block_with_rules):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "US"
        mock_request.GET = {"utm_source": "google", "utm_campaign": "fall"}
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_with_rules) is False

    def test_utm_campaign_missing(self, mock_request, block_with_rules):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "US"
        mock_request.GET = {"utm_source": "google"}
        assert BlockVisibilityEvaluator.evaluate(mock_request, block_with_rules) is False


class TestPersonalizationCache:
    def test_empty_context(self, mock_request):
        assert generate_personalization_cache_key(mock_request) == "default"

    def test_geo_only_context(self, mock_request):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "US"
        assert generate_personalization_cache_key(mock_request) == "geo:US"

    def test_full_context(self, mock_request):
        mock_request.META['HTTP_X_MOCK_COUNTRY'] = "US"
        mock_request.GET = {"utm_source": "google", "utm_campaign": "summer"}
        assert generate_personalization_cache_key(mock_request) == "geo:US|utm_src:google|utm_cmp:summer"
