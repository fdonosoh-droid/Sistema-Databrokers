from rest_framework import viewsets
from .models import Metric
from .serializers import MetricSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all().order_by('-fecha')
    serializer_class = MetricSerializer
