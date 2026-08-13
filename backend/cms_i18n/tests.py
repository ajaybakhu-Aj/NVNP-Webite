import pytest
from django.test import RequestFactory
from .middleware import LanguageContextMiddleware
from .context import get_current_language, set_current_language
from .models import TranslatableContent
from .utils import generate_hreflang_tags


# Create a dummy model for testing the abstract base class
class DummyContent(TranslatableContent):
    class Meta:
        app_label = 'cms_i18n'


class TestI18nSystem:

    def test_language_middleware_url_prefix(self):
        factory = RequestFactory()
        request = factory.get('/ne/api/v1/products/')
        
        middleware = LanguageContextMiddleware(lambda req: None)
        middleware.process_request(request)
        
        assert get_current_language() == 'ne'

    def test_language_middleware_header(self):
        factory = RequestFactory()
        request = factory.get('/api/v1/products/', HTTP_ACCEPT_LANGUAGE='ne,en-US;q=0.9')
        
        middleware = LanguageContextMiddleware(lambda req: None)
        middleware.process_request(request)
        
        assert get_current_language() == 'ne'

    def test_language_middleware_fallback(self):
        factory = RequestFactory()
        request = factory.get('/api/v1/products/')
        
        middleware = LanguageContextMiddleware(lambda req: None)
        middleware.process_request(request)
        
        assert get_current_language() == 'en'

    def test_generate_hreflang_tags(self):
        tags = generate_hreflang_tags('https://example.com', '/about/')
        
        assert 'hreflang="x-default"' in tags
        assert 'href="https://example.com/en/about/"' in tags
        assert 'hreflang="ne"' in tags
        assert 'href="https://example.com/ne/about/"' in tags
        assert 'hreflang="en"' in tags


@pytest.mark.django_db
class TestTranslatableContent:

    @pytest.fixture(autouse=True)
    def setup_dummy_model(self):
        # In Django tests, saving unmanaged/abstract model instances requires some hackery or just testing the python methods.
        # We will just test the Python methods of an unsaved instance since the JSON lookup is purely in memory.
        self.instance = DummyContent(translations={
            'en': {'title': 'English Title', 'desc': 'Eng Desc'},
            'ne': {'title': 'नेपाली शीर्षक'}
        })

    def test_get_translated_field_exact_match(self):
        set_current_language('ne')
        assert self.instance.get_translated_field('title') == 'नेपाली शीर्षक'

    def test_get_translated_field_fallback_to_english(self):
        set_current_language('ne')
        # 'desc' is not in 'ne' translations, should fallback to 'en'
        assert self.instance.get_translated_field('desc') == 'Eng Desc'

    def test_get_translated_field_missing_completely(self):
        set_current_language('ne')
        assert self.instance.get_translated_field('price', default='N/A') == 'N/A'

    def test_get_translated_field_default_language(self):
        set_current_language('en')
        assert self.instance.get_translated_field('title') == 'English Title'
