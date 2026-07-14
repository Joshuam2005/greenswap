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


class ListingBrowseSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.display_name', read_only=True)
    seller_email = serializers.CharField(source='seller.email', read_only=True)

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
            'seller_name',
            'seller_email',
        ]