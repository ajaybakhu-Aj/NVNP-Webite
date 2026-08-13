import pytest
from io import StringIO
from django.core.management import call_command
from django.core.management.base import CommandError
from unittest.mock import patch


@pytest.mark.django_db
class TestCMSHealthCheck:

    def test_health_check_success(self):
        """
        Test that the health check passes when all core services are mock-successful.
        """
        out = StringIO()
        with patch('cms_core.management.commands.cms_health_check.connection.ensure_connection'), \
             patch('cms_core.management.commands.cms_health_check.cache.set'), \
             patch('cms_core.management.commands.cms_health_check.cache.get', return_value='pong'), \
             patch('cms_core.management.commands.cms_health_check.default_storage.save', return_value='test.txt'), \
             patch('cms_core.management.commands.cms_health_check.default_storage.exists', return_value=True), \
             patch('cms_core.management.commands.cms_health_check.default_storage.delete'):
             
             call_command('cms_health_check', stdout=out)
             
        output = out.getvalue()
        assert '[OK] Database connection' in output
        assert '[OK] Redis cache ping' in output
        assert '[OK] Media storage writable' in output
        assert 'CMS Health Check passed!' in output

    def test_health_check_critical_failure(self):
        """
        Test that the health check raises CommandError on a critical failure (like DB).
        """
        out = StringIO()
        with patch('cms_core.management.commands.cms_health_check.connection.ensure_connection', side_effect=Exception("DB Down")):
            with pytest.raises(CommandError) as exc_info:
                call_command('cms_health_check', stdout=out)
                
            assert 'CMS Health Check Failed' in str(exc_info.value)
            output = out.getvalue()
            assert '[FAIL] Database connection' in output

    def test_health_check_redis_failure(self):
        """
        Test that Redis connection failure raises CommandError.
        """
        out = StringIO()
        with patch('cms_core.management.commands.cms_health_check.connection.ensure_connection'), \
             patch('cms_core.management.commands.cms_health_check.cache.set', side_effect=Exception("Redis Down")):
             
            with pytest.raises(CommandError):
                call_command('cms_health_check', stdout=out)
                
            output = out.getvalue()
            assert '[FAIL] Redis cache connection' in output
