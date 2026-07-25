from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
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
    
class CreateListingView (APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request):
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListingDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Listing.objects.get(pk=pk)
        except Listing.DoesNotExist:
            return None

    def get(self, request, pk):
        listing = self.get_object(pk)

        if listing is None:
            return Response(
                {"error": "Listing not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ListingBrowseSerializer(listing)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def patch(self, request, pk):
        listing = self.get_object(pk)

        if listing is None:
            return Response(
                {"error": "Listing not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if listing.seller != request.user:
            return Response(
                {"error": "You can only edit your own listings."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ListingSerializer(
            listing,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        listing = self.get_object(pk)

        if listing is None:
            return Response(
                {"error": "Listing not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if listing.seller != request.user:
            return Response(
                {"error": "You can only delete your own listings."},
                status=status.HTTP_403_FORBIDDEN
            )

        listing.delete()

        return Response(
            {"message": "Listing deleted successfully."},
            status=status.HTTP_200_OK
        )