from django.db import models

class Lead(models.Model):
    nombre = models.CharField(max_length=150)
    correo = models.EmailField()
    telefono = models.CharField(max_length=20, blank=True, null=True)
    mensaje = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.correo})"
