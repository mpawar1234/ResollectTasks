from django.urls import path, include
from .views import LoanViewset
from rest_framework.routers import DefaultRouter

# Create a router and register your viewset
router = DefaultRouter()
router.register(r'loans', LoanViewset, basename='loan')

urlpatterns = [
    # Include the router's URLs
    path('', include(router.urls)),
]
