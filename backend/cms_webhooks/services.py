import hmac
import hashlib
from .models import WebhookEndpoint
from .tasks import dispatch_webhook_task


class WebhookDispatcher:
    """
    Core engine for dispatching events to registered webhook endpoints.
    """

    @staticmethod
    def trigger(event_type: str, payload: dict):
        """
        Finds all active webhooks subscribed to this event_type and enqueues 
        a Celery task to dispatch the payload.
        """
        # We need to filter endpoints where event_type is in enabled_events.
        # Since enabled_events is a JSON field array, we can use __contains.
        # Wait, SQLite JSON __contains works differently than Postgres in some Django versions,
        # so we'll fetch active ones and filter in python if the list is small, 
        # or use standard __contains assuming it's supported.
        endpoints = WebhookEndpoint.objects.filter(is_active=True)
        
        for endpoint in endpoints:
            if event_type in endpoint.enabled_events:
                # Enqueue Celery task
                dispatch_webhook_task.delay(endpoint.id, event_type, payload)

    @staticmethod
    def generate_signature(secret_key: str, payload_str: str) -> str:
        """
        Generates HMAC SHA-256 signature for the payload.
        """
        signature = hmac.new(
            key=secret_key.encode('utf-8'),
            msg=payload_str.encode('utf-8'),
            digestmod=hashlib.sha256
        ).hexdigest()
        return f"sha256={signature}"
