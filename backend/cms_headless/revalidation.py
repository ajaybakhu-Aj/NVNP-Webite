import requests
import threading
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def trigger_frontend_revalidation(slug, content_type='page'):
    """
    Triggers an ISR revalidation webhook to Next.js in a background thread.
    """
    def _revalidate():
        url = f"{settings.FRONTEND_URL}/api/revalidate"
        params = {
            'secret': settings.FRONTEND_REVALIDATION_SECRET,
            'slug': slug,
            'type': content_type
        }
        try:
            response = requests.post(url, params=params, timeout=5)
            if response.status_code != 200:
                logger.warning(f"Failed to revalidate {slug}: {response.text}")
        except requests.exceptions.RequestException as e:
            logger.error(f"Error connecting to Next.js revalidate endpoint: {e}")

    # Run asynchronously to avoid blocking the CMS editor response
    thread = threading.Thread(target=_revalidate)
    thread.start()
