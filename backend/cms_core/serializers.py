from rest_framework import serializers
from .models import Page, PageBlock

class PageBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageBlock
        fields = ['id', 'block_type', 'order', 'data', 'visibility_rules']


class PageSerializer(serializers.ModelSerializer):
    blocks = PageBlockSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = [
            'id', 
            'slug', 
            'title', 
            'seo_title', 
            'meta_description', 
            'canonical_url', 
            'og_image', 
            'noindex', 
            'created_at', 
            'updated_at', 
            'published_at', 
            'is_published', 
            'blocks'
        ]
