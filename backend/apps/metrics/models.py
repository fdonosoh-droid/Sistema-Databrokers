from django.db import models

class Metric(models.Model):
    fecha = models.DateField(auto_now_add=True)
    leads = models.PositiveIntegerField(default=0)
    visitas = models.PositiveIntegerField(default=0)
    cierres = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Métricas del {self.fecha}"
