from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import ListingSerializer, ListingBrowseSerializer
from .models import Listing

class UserListingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        listings = request.user.listings.all()
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BrowseListingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        listings = Listing.objects.filter(is_sold=False)

        search = request.query_params.get('search')
        if search:
            listings = listings.filter(title__icontains=search)
        
        category = request.query_params.get('category')
        if category:
            listings = listings.filter(category__iexact=category)
        
        condition = request.query_params.get('condition')
        if condition:
            listings = listings.filter(condition__iexact=condition)
        
        min_price = request.query_params.get('min_price')
        if min_price:
            listings = listings.filter(price__gte=min_price)

        max_price = request.query_params.get('max_price')
        if max_price:
            listings = listings.filter(price__lte=max_price)

        listings = listings.order_by('-created_at')

        serializer = ListingBrowseSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)