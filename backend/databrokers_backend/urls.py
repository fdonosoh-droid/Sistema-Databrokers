from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/leads/', include('apps.leads.urls')),
    path('api/exchanges/', include('apps.exchanges.urls')),
    path('api/metrics/', include('apps.metrics.urls')),
    path('api/notifications/', include('apps.notifications.urls')),
]
