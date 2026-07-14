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
        listings = Listing.objects.filter(is_sold=False).order_by('-created_at')
        serializer = ListingBrowseSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)