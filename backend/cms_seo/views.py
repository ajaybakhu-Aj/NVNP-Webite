from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .services.analyzer import SEOAnalyzer

class SEOAnalyzeView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        content = request.data.get('content', '')
        keyword = request.data.get('keyword', '')
        title = request.data.get('title', '')
        description = request.data.get('description', '')
        domain = request.data.get('domain', '')
        
        if not content:
            return Response({"error": "Content is required for SEO analysis."}, status=status.HTTP_400_BAD_REQUEST)
            
        analyzer = SEOAnalyzer(
            content=content,
            keyword=keyword,
            title=title,
            description=description,
            domain=domain
        )
        
        result = analyzer.analyze()
        
        return Response(result, status=status.HTTP_200_OK)
