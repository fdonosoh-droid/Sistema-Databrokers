from rest_framework import viewsets
from .models import Lead
from .serializers import LeadSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-fecha_creacion')
    serializer_class = LeadSerializer
