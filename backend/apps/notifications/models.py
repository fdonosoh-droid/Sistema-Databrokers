from django.db import models

class Notification(models.Model):
    titulo = models.CharField(max_length=200)
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)
    leida = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.titulo} - {'Leída' if self.leida else 'Pendiente'}"
