from rest_framework import serializers
from .models import TaxonomyGroup, TaxonomyTerm


class TaxonomyGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxonomyGroup
        fields = '__all__'


class TaxonomyTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxonomyTerm
        fields = '__all__'
