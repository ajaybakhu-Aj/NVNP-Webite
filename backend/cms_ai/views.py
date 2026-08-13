from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .services.assistant import AIAssistantService


class GenerateMetaView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        content = request.data.get('content_body', '')
        keyword = request.data.get('focus_keyword', '')
        
        if not content or not keyword:
            return Response({"error": "Both 'content_body' and 'focus_keyword' are required."}, status=400)
            
        service = AIAssistantService()
        draft_meta = service.generate_meta_description(content, keyword)
        
        return Response({"draft_meta_description": draft_meta})


class SuggestAltTextView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        image_url = request.data.get('image_url', '')
        
        if not image_url:
            return Response({"error": "'image_url' is required."}, status=400)
            
        service = AIAssistantService()
        draft_alt = service.suggest_alt_text(image_url)
        
        return Response({"draft_alt_text": draft_alt})


class DraftFAQsView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        spec_json = request.data.get('product_spec_json')
        
        if not spec_json or not isinstance(spec_json, dict):
            return Response({"error": "'product_spec_json' must be a valid JSON object/dict."}, status=400)
            
        service = AIAssistantService()
        draft_faqs = service.draft_faq_pairs(spec_json)
        
        return Response({"draft_faqs": draft_faqs})
