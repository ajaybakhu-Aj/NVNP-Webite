import uuid
from django.db import models


class WebhookEndpoint(models.Model):
    """
    Registered external endpoint to receive webhook payloads.
    """
    target_url = models.URLField(max_length=500)
    secret_key = models.CharField(max_length=64, default=uuid.uuid4, help_text="Used to sign payloads with HMAC SHA-256")
    enabled_events = models.JSONField(default=list, help_text="List of event strings, e.g. ['order.created']")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.target_url} ({'Active' if self.is_active else 'Inactive'})"


class WebhookDeliveryLog(models.Model):
    """
    Record of an attempted webhook delivery.
    """
    endpoint = models.ForeignKey(WebhookEndpoint, on_delete=models.CASCADE, related_name='delivery_logs')
    event_type = models.CharField(max_length=100)
    payload = models.JSONField()
    response_status = models.IntegerField(null=True, blank=True)
    response_body = models.TextField(blank=True)
    attempts = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.event_type} to {self.endpoint.target_url} - Status: {self.response_status}"
