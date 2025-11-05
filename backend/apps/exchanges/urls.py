from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExchangeViewSet

router = DefaultRouter()
router.register(r'', ExchangeViewSet, basename='exchanges')

urlpatterns = [
    path('', include(router.urls)),
]
