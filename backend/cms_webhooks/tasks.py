import json
import requests
from celery import shared_task


@shared_task(bind=True, max_retries=3)
def dispatch_webhook_task(self, endpoint_id: int, event_type: str, payload: dict):
    """
    Celery task to dispatch a webhook with exponential backoff retries.
    """
    # Import here to avoid circular imports
    from .models import WebhookEndpoint, WebhookDeliveryLog
    from .services import WebhookDispatcher

    try:
        endpoint = WebhookEndpoint.objects.get(id=endpoint_id)
    except WebhookEndpoint.DoesNotExist:
        # Endpoint deleted before task ran
        return
        
    payload_str = json.dumps(payload)
    signature = WebhookDispatcher.generate_signature(endpoint.secret_key, payload_str)
    
    headers = {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': signature,
        'X-Webhook-Event': event_type
    }
    
    log = WebhookDeliveryLog.objects.create(
        endpoint=endpoint,
        event_type=event_type,
        payload=payload,
        attempts=self.request.retries + 1
    )
    
    try:
        response = requests.post(endpoint.target_url, data=payload_str, headers=headers, timeout=10)
        log.response_status = response.status_code
        log.response_body = response.text[:1000]  # truncate to prevent massive logs
        
        if 200 <= response.status_code < 300:
            log.success = True
            log.save()
            return f"Successfully dispatched {event_type} to {endpoint.target_url}"
        else:
            log.success = False
            log.save()
            # Retry for 5xx errors or specific 4xx (like 429 Too Many Requests)
            if response.status_code >= 500 or response.status_code == 429:
                raise requests.exceptions.RequestException(f"Server returned {response.status_code}")
            
    except requests.exceptions.RequestException as exc:
        log.success = False
        log.response_body = str(exc)
        log.save()
        
        # Retry with exponential backoff (e.g. 2s, 4s, 8s)
        countdown = 2 ** (self.request.retries + 1)
        raise self.retry(exc=exc, countdown=countdown)
