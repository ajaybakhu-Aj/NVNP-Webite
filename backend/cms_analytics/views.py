from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.core.cache import cache
from .services.google import GoogleAnalyticsService


class PageStatsView(APIView):
    """
    Returns GA4/GSC analytics for a specific URL path.
    """
    # Only allow admin/staff to view analytics
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        path = request.query_params.get('path')
        if not path:
            return Response({"error": "'path' query parameter is required."}, status=400)

        # Cache heavily to avoid hitting Google APIs too often (24 hour TTL)
        cache_key = f"analytics_page_stats_{path}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)

        service = GoogleAnalyticsService()
        stats = service.get_page_stats(path)

        cache.set(cache_key, stats, timeout=86400)  # 24 hours
        return Response(stats)
