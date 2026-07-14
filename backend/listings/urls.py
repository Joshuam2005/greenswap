from django.urls import path
from .views import BrowseListingsView

urlpatterns=[
    path('', BrowseListingsView.as_view(), name='browse-listings'),
]