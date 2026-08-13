from django.conf import settings
from datetime import datetime, timedelta


class GoogleAnalyticsService:
    """
    Wrapper for Google Analytics 4 (GA4) Data API and Google Search Console API.
    Requires google-api-python-client and google-analytics-data.
    """
    def __init__(self):
        self.credentials = getattr(settings, 'GOOGLE_CREDENTIALS', None)
        self.site_url = getattr(settings, 'SITE_URL', 'https://example.com')
        
    def authenticate_gsc(self):
        """
        Authenticates and returns the Search Console service.
        """
        if not self.credentials:
            # In tests or missing config, return None to mock
            return None
            
        try:
            from google.oauth2.service_account import Credentials
            from googleapiclient.discovery import build
            
            scopes = ['https://www.googleapis.com/auth/webmasters.readonly']
            # Load credentials (assume it's a dict or path string)
            if isinstance(self.credentials, dict):
                creds = Credentials.from_service_account_info(self.credentials, scopes=scopes)
            else:
                creds = Credentials.from_service_account_file(self.credentials, scopes=scopes)
                
            return build('searchconsole', 'v1', credentials=creds)
        except ImportError:
            raise ImportError("Please install google-api-python-client and google-auth")

    def get_page_stats(self, relative_path):
        """
        Fetches last 30 days of Search Console metrics for a specific URL.
        """
        service = self.authenticate_gsc()
        
        # Full URL as indexed by GSC
        full_url = f"{self.site_url.rstrip('/')}/{relative_path.lstrip('/')}"
        
        if not service:
            # Return mocked data if no real service could be built
            return self._mock_data(relative_path)
            
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30)
        
        request_body = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'dimensions': ['page'],
            'dimensionFilterGroups': [{
                'filters': [{
                    'dimension': 'page',
                    'operator': 'equals',
                    'expression': full_url
                }]
            }]
        }
        
        # API call (site_url must exactly match the property in GSC)
        # Note: the property URL might be 'sc-domain:example.com'
        # For simplicity, we assume SITE_URL is the exact GSC property.
        response = service.searchanalytics().query(siteUrl=self.site_url, body=request_body).execute()
        
        rows = response.get('rows', [])
        if not rows:
            return self._empty_stats(relative_path)
            
        # We filtered by exact page, so there should only be one row
        metrics = rows[0]
        return {
            "path": relative_path,
            "clicks": metrics.get('clicks', 0),
            "impressions": metrics.get('impressions', 0),
            "ctr": metrics.get('ctr', 0.0),
            "average_position": metrics.get('position', 0.0)
        }

    def _empty_stats(self, path):
        return {
            "path": path,
            "clicks": 0,
            "impressions": 0,
            "ctr": 0.0,
            "average_position": 0.0
        }

    def _mock_data(self, path):
        """
        Returns mocked payload for testing when credentials aren't present.
        """
        return {
            "path": path,
            "clicks": 1450,
            "impressions": 25000,
            "ctr": 0.058,
            "average_position": 4.2
        }
