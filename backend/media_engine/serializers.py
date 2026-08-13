from rest_framework import serializers
from .models import MediaAsset


class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = '__all__'
        read_only_fields = ('file_hash', 'file_size', 'mime_type', 'srcset_paths')
