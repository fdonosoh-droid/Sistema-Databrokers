from django.db import models

class Exchange(models.Model):
    corredor_oferta = models.CharField(max_length=100)
    corredor_demandante = models.CharField(max_length=100)
    propiedad = models.CharField(max_length=200)
    estado = models.CharField(max_length=50, default='pendiente')
    fecha = models.DateTimeField(auto_now_add=True)
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.corredor_oferta} ↔ {self.corredor_demandante} ({self.estado})"
