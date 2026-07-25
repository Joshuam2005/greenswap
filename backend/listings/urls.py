from django.urls import path
from .views import (
    BrowseListingsView,
    CreateListingView,
    ListingDetailView,
    UserListingsView,
)

urlpatterns = [
    path("", BrowseListingsView.as_view(), name="browse-listings"),
    path("create/", CreateListingView.as_view(), name="create-listing"),
    path("mine/", UserListingsView.as_view(), name="my-listings"),
    path("<int:pk>/", ListingDetailView.as_view(), name="listing-detail"),
]