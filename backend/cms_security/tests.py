import pytest
from rest_framework.test import APIClient
from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.contrib.auth.signals import user_login_failed, user_logged_in
from .models import AuditLog
from cms_core.models import Page


User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def setup_user():
    return User.objects.create_user(username='admin', password='password123')


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


@pytest.mark.django_db
class TestSecurityEngine:
    def test_failed_login_creates_audit_log(self, setup_user):
        # Simulate failed login signal
        user_login_failed.send(
            sender=__name__,
            credentials={'username': 'admin'},
            request=None
        )
        
        logs = AuditLog.objects.filter(action='LOGIN_FAILED')
        assert logs.count() == 1
        assert logs.first().target_model == "Username: admin"

    def test_brute_force_lockout(self):
        class MockRequest:
            META = {'REMOTE_ADDR': '192.168.1.100'}

        request = MockRequest()
        
        # Trigger 5 failed logins
        for _ in range(5):
            user_login_failed.send(
                sender=__name__,
                credentials={'username': 'hacker'},
                request=request
            )
            
            # Check if the lockout key is set
        assert cache.get("lockout_ip:192.168.1.100") is True

    def test_successful_login_clears_attempts(self, setup_user):
        class MockRequest:
            META = {'REMOTE_ADDR': '192.168.1.100'}

        request = MockRequest()
        
        # 1 failed login
        user_login_failed.send(
            sender=__name__,
            credentials={'username': 'admin'},
            request=request
        )
        assert cache.get("attempts:192.168.1.100") == 1
        
        # Successful login
        user_logged_in.send(
            sender=__name__,
            user=setup_user,
            request=request
        )
        
        # Attempts should be cleared
        assert cache.get("attempts:192.168.1.100") is None
        
        # Success log should exist
        assert AuditLog.objects.filter(action='LOGIN_SUCCESS').count() == 1

    def test_model_save_creates_audit_log(self, setup_user):
        # We need to mock the thread locals to simulate a logged-in user making the request
        from .middleware import _thread_locals
        
        class MockRequest:
            META = {'REMOTE_ADDR': '10.0.0.1'}
            
        _thread_locals.user = setup_user
        _thread_locals.request = MockRequest()
        
        # Create a page
        page = Page.objects.create(title="Test Page", slug="test-page")
        
        # Clean up thread locals
        del _thread_locals.user
        del _thread_locals.request
        
        # Check audit log
        logs = AuditLog.objects.filter(action='CREATE', actor=setup_user, target_model__startswith='Page:')
        assert logs.count() == 1
        assert f"Page:{page.pk}" in logs.first().target_model
