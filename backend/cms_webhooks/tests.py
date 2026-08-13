import json
import pytest
import requests
from unittest.mock import patch
from .models import WebhookEndpoint, WebhookDeliveryLog
from .services import WebhookDispatcher
from .tasks import dispatch_webhook_task


@pytest.mark.django_db
class TestWebhookSystem:
    def test_signature_generation(self):
        secret = "test-secret"
        payload = json.dumps({"event": "order.created"})
        
        # Expected hmac sha256 of payload with "test-secret"
        signature = WebhookDispatcher.generate_signature(secret, payload)
        assert signature.startswith("sha256=")
        assert len(signature) == 71  # 'sha256=' (7) + 64 hex chars

    def test_dispatcher_trigger_enqueues_task(self):
        endpoint = WebhookEndpoint.objects.create(
            target_url="https://example.com/webhook",
            enabled_events=["order.created"],
            is_active=True
        )
        
        with patch('cms_webhooks.services.dispatch_webhook_task.delay') as mock_delay:
            WebhookDispatcher.trigger("order.created", {"id": 1})
            mock_delay.assert_called_once_with(endpoint.id, "order.created", {"id": 1})
            
        # Test inactive endpoint
        endpoint.is_active = False
        endpoint.save()
        with patch('cms_webhooks.services.dispatch_webhook_task.delay') as mock_delay:
            WebhookDispatcher.trigger("order.created", {"id": 1})
            mock_delay.assert_not_called()

    @patch('requests.post')
    def test_successful_webhook_dispatch(self, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.text = "OK"
        
        endpoint = WebhookEndpoint.objects.create(
            target_url="https://example.com/webhook",
            enabled_events=["order.created"]
        )
        
        result = dispatch_webhook_task(endpoint.id, "order.created", {"id": 1})
        assert result.startswith("Successfully dispatched")
        
        log = WebhookDeliveryLog.objects.first()
        assert log.success is True
        assert log.response_status == 200
        assert log.attempts == 1
        
        # Verify signature header was sent
        headers = mock_post.call_args[1]['headers']
        assert 'X-Hub-Signature-256' in headers
        assert headers['X-Webhook-Event'] == "order.created"

    @patch('requests.post')
    def test_failed_webhook_retry_logic(self, mock_post):
        mock_post.return_value.status_code = 500
        mock_post.return_value.text = "Internal Server Error"
        
        endpoint = WebhookEndpoint.objects.create(
            target_url="https://example.com/webhook",
            enabled_events=["order.created"]
        )
        
        # In eager mode, Celery will automatically retry until max_retries and then raise the underlying exception.
        with pytest.raises(requests.exceptions.RequestException):
            dispatch_webhook_task(endpoint.id, "order.created", {"id": 1})
            
        assert WebhookDeliveryLog.objects.count() == 1
        log = WebhookDeliveryLog.objects.first()  # most recent due to ordering='-timestamp'
        assert log.success is False
        assert log.response_status == 500
        assert log.attempts == 1
