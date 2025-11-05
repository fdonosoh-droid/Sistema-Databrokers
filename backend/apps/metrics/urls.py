from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MetricViewSet

router = DefaultRouter()
router.register(r'', MetricViewSet, basename='metrics')

urlpatterns = [
    path('', include(router.urls)),
]
