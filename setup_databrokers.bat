@echo off
TITLE Instalador Sistema Databrokers - Configuracion Completa
color 0A
echo ===============================================
echo   AUTOEJECUTABLE DE CONFIGURACION DATABROKERS
echo ===============================================

REM === 1. Validar dependencias ===
where python >nul 2>nul || (echo ❌ Python no encontrado. & pause & exit)
where docker >nul 2>nul || (echo ❌ Docker no encontrado. & pause & exit)
where node >nul 2>nul || (echo ❌ Node.js no encontrado. & pause & exit)
echo ✅ Dependencias básicas OK.

REM === 2. Detectar ubicación de manage.py ===
if exist "backend\manage.py" (
    set "DJANGO_DIR=backend"
) else if exist "backend\databrokers_backend\manage.py" (
    set "DJANGO_DIR=backend\databrokers_backend"
) else (
    echo ❌ No se encontró manage.py en backend. Revisa la estructura. & pause & exit
)
echo 📁 Se detectó manage.py en: %DJANGO_DIR%

REM === 3. Preparar entorno virtual ===
cd backend
if not exist venv (
    echo 🧱 Creando entorno virtual...
    python -m venv venv
)
call venv\Scripts\activate

if exist requirements.txt (
    pip install -r requirements.txt
) else if exist ..\requirements.txt (
    pip install -r ..\requirements.txt
) else (
    echo ⚠️ No se encontró requirements.txt, instalando dependencias básicas...
    pip install django djangorestframework psycopg2-binary Pillow
)

cd ..

REM === 4. Crear módulos faltantes ===
echo ===============================================
echo   Creando modulos internos...
echo ===============================================
cd %DJANGO_DIR%

for %%M in (leads exchanges metrics notifications) do (
    if not exist "apps\%%M" (
        echo 🔧 Creando modulo %%M...
        python manage.py startapp %%M apps/%%M
    )
)

REM === 5. Modelo base de Canjes ===
(
echo from django.db import models
echo class Exchange(models.Model):
echo.    broker_oferta = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='canjes_oferta')
echo.    broker_demandante = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='canjes_demandante')
echo.    property = models.ForeignKey('properties.Property', on_delete=models.CASCADE)
echo.    estado = models.CharField(max_length=50, default='pendiente')
echo.    fecha = models.DateTimeField(auto_now_add=True)
echo.    observaciones = models.TextField(blank=True, null=True)
echo.    def __str__(self): return f"{self.broker_oferta} ↔ {self.broker_demandante} ({self.estado})"
) > apps\exchanges\models.py

REM === 6. Migraciones ===
echo Ejecutando migraciones...
python manage.py makemigrations
python manage.py migrate

REM === 7. Crear superusuario ===
echo from django.contrib.auth import get_user_model; User=get_user_model(); \
u=User.objects.filter(username='admin'); \
print('Creando usuario admin...' if not u.exists() else 'Ya existe'); \
User.objects.create_superuser('admin','admin@databrokers.cl','admin1234') if not u.exists() else None > temp_create_admin.py
python manage.py shell < temp_create_admin.py
del temp_create_admin.py

cd ../..

REM === 8. Frontend ===
if exist frontend\package.json (
    echo Instalando dependencias de frontend...
    cd frontend
    npm install
    npm run build
    cd ..
) else (
    echo ⚠️ No se encontró carpeta frontend. Saltando este paso.
)

REM === 9. Docker ===
if exist docker-compose.yml (
    echo Iniciando contenedores Docker...
    docker compose up -d --build
) else (
    echo ⚠️ No se encontró docker-compose.yml, omitiendo despliegue Docker.
)

echo ===============================================
echo ✅ INSTALACION COMPLETA
echo Backend: http://localhost:8000/admin
echo Frontend: http://localhost
echo Usuario: admin / admin1234
echo ===============================================
pause
exit
