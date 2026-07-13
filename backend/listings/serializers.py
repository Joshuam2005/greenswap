from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'id',
            'title',
            'description',
            'category',
            'condition',
            'price',
            'image',
            'is_sold',
            'created_at',
            'updated_at',
        ]