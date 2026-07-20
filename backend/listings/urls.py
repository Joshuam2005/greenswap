from django.urls import path
from .views import BrowseListingsView, CreateListingView

urlpatterns=[
    path('', BrowseListingsView.as_view(), name='browse-listings'),
    path('create/', CreateListingView.as_view(), name='create-listing'),
]