from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DesignToken, GlobalSnippet


class ThemeSettingsView(APIView):
    """
    Returns design tokens formatted as a CSS string and structured JSON.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        tokens = DesignToken.objects.all()
        
        css_lines = [":root {"]
        json_tokens = {}

        for token in tokens:
            # CSS String
            css_lines.append(f"  {token.key}: {token.value};")
            
            # JSON Structure
            category = token.category.lower()
            if category not in json_tokens:
                json_tokens[category] = {}
            
            # Strip the '--' prefix for the JSON keys for easier JS consumption
            clean_key = token.key.lstrip('-')
            json_tokens[category][clean_key] = token.value

        css_lines.append("}")
        css_string = "\n".join(css_lines)

        return Response({
            "css_string": css_string,
            "json_tokens": json_tokens
        }, status=status.HTTP_200_OK)


class GlobalSnippetsView(APIView):
    """
    Returns all global snippets as a simple key-value dictionary.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        snippets = GlobalSnippet.objects.all()
        data = {snippet.key: snippet.content for snippet in snippets}
        return Response(data, status=status.HTTP_200_OK)
