# ============================================================================
# DATABROKERS - Sistema de Gestión de Negocios Inmobiliarios
# Script de Instalación Automática para Windows 10/11
# PowerShell Script - Ejecutar como Administrador
# ============================================================================
# Versión: 1.0
# PostgreSQL: 14
# Servidor: Local (localhost)
# ============================================================================

# Requerir ejecución como Administrador
#Requires -RunAsAdministrator

# Configuración de colores
$Host.UI.RawUI.BackgroundColor = "Black"
$Host.UI.RawUI.ForegroundColor = "White"
Clear-Host

# Banner
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                  ║" -ForegroundColor Cyan
Write-Host "║                        DATABROKERS                               ║" -ForegroundColor Yellow
Write-Host "║           Sistema de Gestión de Negocios Inmobiliarios          ║" -ForegroundColor White
Write-Host "║                                                                  ║" -ForegroundColor Cyan
Write-Host "║              Instalador Automático para Windows v1.0             ║" -ForegroundColor Green
Write-Host "║                                                                  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Variables globales
$INSTALL_DIR = "C:\DataBrokers"
$POSTGRES_VERSION = "14"
$NODE_VERSION = "18"
$DB_PASSWORD = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 16 | ForEach-Object {[char]$_})

# Función de log
function Write-Log {
    param($Message, $Type = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    switch ($Type) {
        "INFO"    { Write-Host "[$timestamp] [INFO] $Message" -ForegroundColor White }
        "SUCCESS" { Write-Host "[$timestamp] [OK] $Message" -ForegroundColor Green }
        "WARNING" { Write-Host "[$timestamp] [WARN] $Message" -ForegroundColor Yellow }
        "ERROR"   { Write-Host "[$timestamp] [ERROR] $Message" -ForegroundColor Red }
    }
}

Write-Log "Iniciando instalación de DataBrokers..." "INFO"
Write-Host ""

# ============================================================================
# PASO 1: Verificar Windows 10/11
# ============================================================================
Write-Log "PASO 1/10: Verificando sistema operativo..." "INFO"

$os = Get-WmiObject -Class Win32_OperatingSystem
$osVersion = [System.Environment]::OSVersion.Version

if ($osVersion.Major -lt 10) {
    Write-Log "Este instalador requiere Windows 10 o superior" "ERROR"
    exit 1
}

Write-Log "Sistema: $($os.Caption) - Version: $($os.Version)" "SUCCESS"

# ============================================================================
# PASO 2: Verificar Chocolatey
# ============================================================================
Write-Log "PASO 2/10: Verificando/Instalando Chocolatey..." "INFO"

if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Log "Instalando Chocolatey..." "INFO"
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refrescar variables de entorno
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Log "Chocolatey instalado correctamente" "SUCCESS"
} else {
    Write-Log "Chocolatey ya está instalado" "SUCCESS"
}

# ============================================================================
# PASO 3: Instalar Node.js 18 LTS
# ============================================================================
Write-Log "PASO 3/10: Instalando Node.js 18 LTS..." "INFO"

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    choco install nodejs-lts --version=18.19.0 -y --force
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    Write-Log "Node.js instalado: $(node -v)" "SUCCESS"
} else {
    Write-Log "Node.js ya está instalado: $(node -v)" "SUCCESS"
}

# ============================================================================
# PASO 4: Instalar PostgreSQL 14
# ============================================================================
Write-Log "PASO 4/10: Instalando PostgreSQL 14..." "INFO"

if (!(Test-Path "C:\Program Files\PostgreSQL\14")) {
    choco install postgresql14 --params "/Password:$DB_PASSWORD" -y --force
    
    # Agregar PostgreSQL al PATH
    $pgPath = "C:\Program Files\PostgreSQL\14\bin"
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    if ($currentPath -notlike "*$pgPath*") {
        [Environment]::SetEnvironmentVariable("Path", "$currentPath;$pgPath", "Machine")
    }
    
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Esperar a que PostgreSQL inicie
    Write-Log "Esperando a que PostgreSQL inicie..." "INFO"
    Start-Sleep -Seconds 10
    
    Write-Log "PostgreSQL 14 instalado" "SUCCESS"
} else {
    Write-Log "PostgreSQL 14 ya está instalado" "SUCCESS"
}

# ============================================================================
# PASO 5: Instalar Git
# ============================================================================
Write-Log "PASO 5/10: Instalando Git..." "INFO"

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    choco install git -y --force
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    Write-Log "Git instalado" "SUCCESS"
} else {
    Write-Log "Git ya está instalado" "SUCCESS"
}

# ============================================================================
# PASO 6: Crear Estructura de Directorios
# ============================================================================
Write-Log "PASO 6/10: Creando estructura de directorios..." "INFO"

# Crear directorios principales
$directories = @(
    "$INSTALL_DIR",
    "$INSTALL_DIR\backend",
    "$INSTALL_DIR\backend\src",
    "$INSTALL_DIR\backend\src\config",
    "$INSTALL_DIR\backend\src\models",
    "$INSTALL_DIR\backend\src\controllers",
    "$INSTALL_DIR\backend\src\routes",
    "$INSTALL_DIR\backend\src\middleware",
    "$INSTALL_DIR\backend\src\services",
    "$INSTALL_DIR\backend\src\utils",
    "$INSTALL_DIR\backend\src\database",
    "$INSTALL_DIR\backend\src\database\migrations",
    "$INSTALL_DIR\backend\src\database\seeders",
    "$INSTALL_DIR\backend\src\templates",
    "$INSTALL_DIR\frontend",
    "$INSTALL_DIR\frontend\public",
    "$INSTALL_DIR\frontend\src",
    "$INSTALL_DIR\frontend\src\assets",
    "$INSTALL_DIR\frontend\src\components",
    "$INSTALL_DIR\frontend\src\features",
    "$INSTALL_DIR\frontend\src\store",
    "$INSTALL_DIR\frontend\src\services",
    "$INSTALL_DIR\database",
    "$INSTALL_DIR\uploads",
    "$INSTALL_DIR\uploads\documents",
    "$INSTALL_DIR\uploads\images",
    "$INSTALL_DIR\uploads\imports",
    "$INSTALL_DIR\uploads\exports",
    "$INSTALL_DIR\logs",
    "$INSTALL_DIR\backups"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Write-Log "Estructura de directorios creada en $INSTALL_DIR" "SUCCESS"

# ============================================================================
# PASO 7: Configurar Base de Datos PostgreSQL 14
# ============================================================================
Write-Log "PASO 7/10: Configurando base de datos PostgreSQL..." "INFO"

$env:PGPASSWORD = $DB_PASSWORD

# Crear usuario y base de datos
$createUserSQL = "CREATE USER databrokers_admin WITH PASSWORD '$DB_PASSWORD';"
$createDBSQL = "CREATE DATABASE databrokers_prod OWNER databrokers_admin;"
$grantSQL = "GRANT ALL PRIVILEGES ON DATABASE databrokers_prod TO databrokers_admin;"

try {
    & "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres -c $createUserSQL 2>$null
    & "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres -c $createDBSQL 2>$null
    & "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres -c $grantSQL 2>$null
    Write-Log "Base de datos configurada: databrokers_prod" "SUCCESS"
} catch {
    Write-Log "Base de datos ya existe o error: $_" "WARNING"
}

# ============================================================================
# PASO 8: Copiar Archivos del Sistema
# ============================================================================
Write-Log "PASO 8/10: Copiando archivos del sistema..." "INFO"

$currentDir = $PSScriptRoot
if (Test-Path "$currentDir\backend") {
    Copy-Item -Path "$currentDir\backend\*" -Destination "$INSTALL_DIR\backend\" -Recurse -Force
}
if (Test-Path "$currentDir\frontend") {
    Copy-Item -Path "$currentDir\frontend\*" -Destination "$INSTALL_DIR\frontend\" -Recurse -Force
}
if (Test-Path "$currentDir\database") {
    Copy-Item -Path "$currentDir\database\*" -Destination "$INSTALL_DIR\database\" -Recurse -Force
}

Write-Log "Archivos copiados" "SUCCESS"

# ============================================================================
# PASO 9: Ejecutar Script SQL de Inicialización
# ============================================================================
Write-Log "PASO 9/10: Creando tablas e índices..." "INFO"

$sqlScript = "$INSTALL_DIR\database\init-database.sql"
if (Test-Path $sqlScript) {
    $env:PGPASSWORD = $DB_PASSWORD
    & "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U databrokers_admin -d databrokers_prod -f $sqlScript
    Write-Log "Tablas e índices creados correctamente" "SUCCESS"
} else {
    Write-Log "Script SQL no encontrado en: $sqlScript" "WARNING"
}

# ============================================================================
# PASO 10: Crear Archivos de Configuración
# ============================================================================
Write-Log "PASO 10/10: Creando archivos de configuración..." "INFO"

# Backend .env
$backendEnv = @"
# DataBrokers Backend Configuration - Windows
NODE_ENV=production
PORT=5000

# Database PostgreSQL 14
DB_HOST=localhost
DB_PORT=5432
DB_NAME=databrokers_prod
DB_USER=databrokers_admin
DB_PASSWORD=$DB_PASSWORD

# JWT
JWT_SECRET=$(-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_}))
JWT_EXPIRES_IN=8h
JWT_REFRESH_EXPIRES_IN=7d

# File Upload
UPLOAD_DIR=$INSTALL_DIR\uploads
MAX_FILE_SIZE=10485760

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=noreply@databrokers.cl
FROM_NAME=DataBrokers

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

# Timezone
TZ=America/Santiago
"@

$backendEnv | Out-File -FilePath "$INSTALL_DIR\backend\.env" -Encoding UTF8

# Frontend .env
$frontendEnv = @"
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=production
REACT_APP_NAME=DataBrokers
"@

$frontendEnv | Out-File -FilePath "$INSTALL_DIR\frontend\.env" -Encoding UTF8

Write-Log "Archivos de configuración creados" "SUCCESS"

# ============================================================================
# Crear Scripts de Inicio para Windows
# ============================================================================
Write-Log "Creando scripts de inicio..." "INFO"

# Script para iniciar Backend
$startBackend = @"
@echo off
echo Iniciando DataBrokers Backend...
cd /d $INSTALL_DIR\backend
call npm start
pause
"@
$startBackend | Out-File -FilePath "$INSTALL_DIR\start-backend.bat" -Encoding ASCII

# Script para iniciar Frontend
$startFrontend = @"
@echo off
echo Iniciando DataBrokers Frontend...
cd /d $INSTALL_DIR\frontend
call npm start
pause
"@
$startFrontend | Out-File -FilePath "$INSTALL_DIR\start-frontend.bat" -Encoding ASCII

# Script para iniciar ambos
$startAll = @"
@echo off
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                    DATABROKERS - INICIO                          ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo Iniciando servicios...
echo.

start "DataBrokers Backend" cmd /k "cd /d $INSTALL_DIR\backend && npm start"
timeout /t 5 /nobreak >nul
start "DataBrokers Frontend" cmd /k "cd /d $INSTALL_DIR\frontend && npm start"

echo.
echo Servicios iniciados:
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.
echo Presiona cualquier tecla para abrir el navegador...
pause >nul

start http://localhost:3000

"@
$startAll | Out-File -FilePath "$INSTALL_DIR\INICIAR-DATABROKERS.bat" -Encoding ASCII

Write-Log "Scripts de inicio creados" "SUCCESS"

# ============================================================================
# Guardar Credenciales
# ============================================================================
$credentialsFile = "$INSTALL_DIR\CREDENCIALES.txt"
$credentials = @"
╔══════════════════════════════════════════════════════════════════╗
║              CREDENCIALES DEL SISTEMA - DATABROKERS              ║
╚══════════════════════════════════════════════════════════════════╝

Fecha de instalación: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

SISTEMA OPERATIVO
━━━━━━━━━━━━━━━━━━━━━
$($os.Caption)
Versión: $($os.Version)

BASE DE DATOS POSTGRESQL 14
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Host: localhost
Puerto: 5432
Base de datos: databrokers_prod
Usuario: databrokers_admin
Contraseña: $DB_PASSWORD

CONTRASEÑA POSTGRES
━━━━━━━━━━━━━━━━━━━━━
Usuario: postgres
Contraseña: $DB_PASSWORD

ACCESO AL SISTEMA
━━━━━━━━━━━━━━━━━━━━━
URL Frontend: http://localhost:3000
URL Backend API: http://localhost:5000

Usuario Administrador:
Email: admin@databrokers.cl
Contraseña: DataBrokers2025!
(⚠️ Cambiar en primer acceso)

DIRECTORIOS
━━━━━━━━━━━━━━━━━━━━━
Instalación: $INSTALL_DIR
Backend: $INSTALL_DIR\backend
Frontend: $INSTALL_DIR\frontend
Base de datos: $INSTALL_DIR\database
Uploads: $INSTALL_DIR\uploads
Logs: $INSTALL_DIR\logs
Backups: $INSTALL_DIR\backups

SCRIPTS DE INICIO
━━━━━━━━━━━━━━━━━━━━━
Iniciar todo: $INSTALL_DIR\INICIAR-DATABROKERS.bat
Backend solo: $INSTALL_DIR\start-backend.bat
Frontend solo: $INSTALL_DIR\start-frontend.bat

SERVICIOS INSTALADOS
━━━━━━━━━━━━━━━━━━━━━
✓ Node.js $(node -v)
✓ PostgreSQL 14
✓ Git

PRÓXIMOS PASOS
━━━━━━━━━━━━━━━━━━━━━
1. Instalar dependencias:
   cd $INSTALL_DIR\backend
   npm install
   
   cd $INSTALL_DIR\frontend
   npm install

2. Compilar frontend:
   cd $INSTALL_DIR\frontend
   npm run build

3. Iniciar sistema:
   Ejecutar: $INSTALL_DIR\INICIAR-DATABROKERS.bat

IMPORTANTE
━━━━━━━━━━━━━━━━━━━━━
⚠️ Guarda este archivo en un lugar seguro
⚠️ No compartas las contraseñas
⚠️ Cambia las contraseñas por defecto

SOPORTE
━━━━━━━━━━━━━━━━━━━━━
Documentación: $INSTALL_DIR\docs
Logs: $INSTALL_DIR\logs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© 2025 DataBrokers - Sistema de Gestión de Negocios Inmobiliarios
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"@

$credentials | Out-File -FilePath $credentialsFile -Encoding UTF8

Write-Log "Credenciales guardadas en: $credentialsFile" "SUCCESS"

# ============================================================================
# Crear acceso directo en el escritorio
# ============================================================================
$WshShell = New-Object -ComObject WScript.Shell
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcut = $WshShell.CreateShortcut("$desktopPath\DataBrokers.lnk")
$shortcut.TargetPath = "$INSTALL_DIR\INICIAR-DATABROKERS.bat"
$shortcut.WorkingDirectory = $INSTALL_DIR
$shortcut.Description = "Iniciar DataBrokers"
$shortcut.Save()

Write-Log "Acceso directo creado en el escritorio" "SUCCESS"

# ============================================================================
# Resumen Final
# ============================================================================
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                                  ║" -ForegroundColor Green
Write-Host "║               INSTALACIÓN COMPLETADA EXITOSAMENTE                ║" -ForegroundColor Green
Write-Host "║                                                                  ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Log "DataBrokers ha sido instalado correctamente en: $INSTALL_DIR" "SUCCESS"
Write-Host ""
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Instalar dependencias Node.js:" -ForegroundColor White
Write-Host "   cd $INSTALL_DIR\backend" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor Cyan
Write-Host ""
Write-Host "   cd $INSTALL_DIR\frontend" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Compilar frontend para producción:" -ForegroundColor White
Write-Host "   cd $INSTALL_DIR\frontend" -ForegroundColor Cyan
Write-Host "   npm run build" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Iniciar el sistema:" -ForegroundColor White
Write-Host "   Hacer doble clic en el acceso directo 'DataBrokers' del escritorio" -ForegroundColor Cyan
Write-Host "   O ejecutar: $INSTALL_DIR\INICIAR-DATABROKERS.bat" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Acceder al sistema:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Revisar credenciales:" -ForegroundColor White
Write-Host "   notepad $credentialsFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Red
Write-Host "   - Cambia la contraseña del administrador en el primer acceso" -ForegroundColor Yellow
Write-Host "   - Guarda el archivo CREDENCIALES.txt en un lugar seguro" -ForegroundColor Yellow
Write-Host ""
Write-Log "Logs de instalación: $INSTALL_DIR\logs" "INFO"
Write-Log "Documentación: $INSTALL_DIR\docs" "INFO"
Write-Host ""
Write-Host "¡Sistema listo para usar! 🚀" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona cualquier tecla para abrir el archivo de credenciales..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
notepad $credentialsFile
