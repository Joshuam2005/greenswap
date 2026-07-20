from django.urls import path
from .views import BrowseListingsView, CreateListingView, ListingDetailView

urlpatterns = [
    path('', BrowseListingsView.as_view(), name='browse-listings'),
    path('create/', CreateListingView.as_view(), name='create-listing'),
    path('<int:pk>/', ListingDetailView.as_view(), name='listing-detail'),
]