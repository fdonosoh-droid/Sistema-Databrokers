# 🚀 DataBrokers - Instalador para Windows 10/11

Sistema completo auto-instalable de Gestión de Negocios Inmobiliarios

---

## 📦 Contenido del Instalador

```
databrokers-windows-installer/
├── install-databrokers.ps1         # Script PowerShell de instalación
├── database/
│   ├── init-database.sql          # Script SQL completo (PostgreSQL 14)
│   └── csv-templates/              # Plantillas para carga masiva
│       ├── proyectos_plantilla.csv
│       ├── propiedades_plantilla.csv
│       ├── clientes_plantilla.csv
│       └── usuarios_plantilla.csv
├── backend/                        # (Archivos del backend)
├── frontend/                       # (Archivos del frontend)
└── README.md                       # Este archivo
```

---

## ⚡ Instalación Rápida

### Requisitos Previos
- ✅ Windows 10 o Windows 11
- ✅ 8 GB RAM mínimo (16 GB recomendado)
- ✅ 30 GB espacio en disco
- ✅ Permisos de Administrador
- ✅ Conexión a internet

### Instalación en 3 Pasos

**1. Abrir PowerShell como Administrador**
   - Click derecho en el menú Inicio
   - Seleccionar "Windows PowerShell (Administrador)"

**2. Permitir ejecución de scripts**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**3. Ejecutar el instalador**
```powershell
cd C:\ruta\donde\descargaste\databrokers-windows-installer
.\install-databrokers.ps1
```

⏱️ **Tiempo estimado:** 20-30 minutos

---

## 📋 ¿Qué Instala el Script?

### Software Instalado Automáticamente

El script instalará automáticamente (si no están presentes):

✅ **Chocolatey** - Gestor de paquetes para Windows  
✅ **Node.js 18 LTS** - Runtime de JavaScript  
✅ **PostgreSQL 14** - Base de datos  
✅ **Git** - Control de versiones  

### Base de Datos

✅ 14 tablas creadas  
✅ 30+ índices optimizados  
✅ Triggers y funciones  
✅ Vistas SQL  
✅ Usuario administrador  
✅ 2 modelos de negocio por defecto  

### Estructura del Sistema

Todo se instalará en: `C:\DataBrokers\`

```
C:\DataBrokers\
├── backend\                    # API Backend (Node.js + Express)
│   ├── src\
│   ├── package.json
│   └── .env
├── frontend\                   # Aplicación React
│   ├── src\
│   ├── public\
│   ├── package.json
│   └── .env
├── database\                   # Scripts SQL
│   ├── init-database.sql
│   └── csv-templates\
├── uploads\                    # Archivos subidos
├── logs\                       # Logs del sistema
├── backups\                    # Respaldos
├── INICIAR-DATABROKERS.bat     # ⭐ Ejecutar para iniciar
├── start-backend.bat
├── start-frontend.bat
└── CREDENCIALES.txt            # ⚠️ Información sensible
```

---

## 🔧 Post-Instalación

Después de que el instalador termine, debes:

### 1. Instalar Dependencias de Node.js

Abrir PowerShell o CMD y ejecutar:

```cmd
cd C:\DataBrokers\backend
npm install

cd C:\DataBrokers\frontend
npm install
```

⏱️ Esto tomará 5-10 minutos

### 2. Compilar el Frontend (Producción)

```cmd
cd C:\DataBrokers\frontend
npm run build
```

⏱️ Esto tomará 2-3 minutos

### 3. Iniciar el Sistema

**Opción A: Usar el acceso directo (Recomendado)**
- Hacer doble clic en el icono "DataBrokers" en el escritorio

**Opción B: Usar el archivo .bat**
- Ir a `C:\DataBrokers\`
- Hacer doble clic en `INICIAR-DATABROKERS.bat`

**Opción C: Manual**
```cmd
# Terminal 1 - Backend
cd C:\DataBrokers\backend
npm start

# Terminal 2 - Frontend
cd C:\DataBrokers\frontend
npm start
```

### 4. Acceder al Sistema

El navegador se abrirá automáticamente, o acceder a:

```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

**Credenciales por defecto:**
- Email: `admin@databrokers.cl`
- Contraseña: `DataBrokers2025!`

⚠️ **IMPORTANTE:** Cambiar la contraseña en el primer acceso

---

## 📊 Base de Datos PostgreSQL 14

### Información de Conexión

```
Host: localhost
Puerto: 5432
Base de datos: databrokers_prod
Usuario: databrokers_admin
Contraseña: [Ver archivo CREDENCIALES.txt]
```

### Acceso con pgAdmin

Si quieres administrar la base de datos visualmente:

1. Instalar pgAdmin: `choco install pgadmin4 -y`
2. Abrir pgAdmin 4
3. Crear nueva conexión:
   - Host: localhost
   - Puerto: 5432
   - Database: databrokers_prod
   - Usuario: databrokers_admin
   - Contraseña: [del archivo CREDENCIALES.txt]

### Tablas Creadas

| Tabla | Descripción |
|-------|-------------|
| usuarios | Usuarios del sistema |
| modelos_negocio | Modelos de venta/arriendo |
| proyectos | Proyectos inmobiliarios |
| propiedades | Unidades disponibles |
| clientes | Base de clientes |
| negocios | Pipeline de ventas (CRM) |
| cotizaciones | Cotizaciones generadas |
| actividades | Registro de actividades |
| alertas | Notificaciones del sistema |
| documentos | Archivos adjuntos |
| imagenes | Imágenes de propiedades |
| reportes | Reportes generados |
| importaciones | Log de importaciones CSV |
| audit_logs | Auditoría completa |

---

## 📁 Importación Masiva de Datos

### Plantillas CSV Incluidas

Las plantillas están en: `C:\DataBrokers\database\csv-templates\`

1. **proyectos_plantilla.csv** - Proyectos inmobiliarios
2. **propiedades_plantilla.csv** - Unidades del proyecto
3. **clientes_plantilla.csv** - Base de clientes
4. **usuarios_plantilla.csv** - Usuarios del sistema

### Cómo Usar las Plantillas

1. Abrir la plantilla en Excel
2. Completar con tus datos
3. Guardar como CSV (UTF-8)
4. Importar desde el sistema web en la sección correspondiente

---

## 🎨 Características del Sistema

### Módulos Principales

✅ **Gestión de Propiedades**
- Registro de proyectos y unidades
- Galería de imágenes
- Estados y disponibilidad
- Importación masiva CSV

✅ **CRM de Negocios**
- Pipeline visual (Kanban)
- 10 estados configurables
- Historial de actividades
- Tracking completo

✅ **Cotizaciones**
- Generador paso a paso
- Simulación financiera
- Exportación PDF
- Envío automatizado

✅ **Reportería**
- Reportes por modelo
- Consolidados multi-modelo
- Exportación PDF/Excel
- Programación automática

✅ **Dashboard Ejecutivo**
- KPIs en tiempo real
- Gráficos interactivos
- Ranking de ejecutivos
- Alertas visuales

✅ **Sistema de Alertas**
- Notificaciones automáticas
- Configurables por rol
- Email y push notifications

---

## 🛠 Gestión del Sistema

### Iniciar Servicios

**Ambos (recomendado):**
```
Doble clic en: C:\DataBrokers\INICIAR-DATABROKERS.bat
```

**Solo Backend:**
```
Doble clic en: C:\DataBrokers\start-backend.bat
```

**Solo Frontend:**
```
Doble clic en: C:\DataBrokers\start-frontend.bat
```

### Detener Servicios

Cerrar las ventanas de CMD que se abrieron, o presionar `Ctrl+C` en cada terminal.

### Ver Logs

```
C:\DataBrokers\logs\
```

---

## 🔄 Backup y Restauración

### Backup Manual de Base de Datos

Abrir CMD y ejecutar:

```cmd
"C:\Program Files\PostgreSQL\14\bin\pg_dump.exe" -U databrokers_admin -d databrokers_prod -F c -f "C:\DataBrokers\backups\backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%.backup"
```

### Restaurar Backup

```cmd
"C:\Program Files\PostgreSQL\14\bin\pg_restore.exe" -U databrokers_admin -d databrokers_prod "C:\DataBrokers\backups\backup_20251028.backup"
```

### Backup de Archivos

Simplemente copiar la carpeta `C:\DataBrokers\uploads` a un lugar seguro.

---

## 🐛 Troubleshooting

### El instalador dice "no se puede ejecutar scripts"

**Solución:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "npm no se reconoce como comando"

**Solución:**
1. Cerrar y volver a abrir PowerShell/CMD
2. O agregar Node.js al PATH manualmente:
   - Panel de Control → Sistema → Configuración avanzada → Variables de entorno
   - Agregar: `C:\Program Files\nodejs\`

### El backend no inicia

**Verificar:**
1. PostgreSQL está corriendo:
   - Abrir "Servicios" (services.msc)
   - Buscar "postgresql-x64-14"
   - Debe estar "Ejecutándose"

2. Puerto 5000 disponible:
```powershell
netstat -ano | findstr :5000
```

### El frontend muestra pantalla en blanco

**Solución:**
```cmd
cd C:\DataBrokers\frontend
rd /s /q node_modules
rd /s /q build
npm install
npm run build
```

### Error de conexión a la base de datos

**Verificar:**
1. PostgreSQL está corriendo
2. Credenciales en `.env` son correctas
3. Abrir `C:\DataBrokers\CREDENCIALES.txt` y verificar contraseña

---

## 🔒 Seguridad

### Cambiar Contraseñas

**Usuario Administrador:**
1. Login en el sistema
2. Ir a Mi Perfil → Cambiar Contraseña

**Base de Datos:**
```sql
ALTER USER databrokers_admin WITH PASSWORD 'nueva_contraseña_segura';
```

Luego actualizar en `C:\DataBrokers\backend\.env`

### Firewall

Windows Firewall permitirá las conexiones locales automáticamente.

Para acceso desde otras máquinas en la red:
1. Panel de Control → Firewall de Windows
2. Regla de entrada nueva
3. Puerto TCP 3000 (Frontend) y 5000 (Backend)

---

## 🔥 Desinstalación

Si necesitas desinstalar completamente:

```powershell
# Detener servicios
Stop-Service postgresql-x64-14

# Desinstalar software
choco uninstall postgresql14 -y
choco uninstall nodejs-lts -y

# Eliminar archivos
Remove-Item -Path "C:\DataBrokers" -Recurse -Force

# Eliminar acceso directo
Remove-Item -Path "$env:USERPROFILE\Desktop\DataBrokers.lnk"
```

---

## 📞 Soporte

### Archivos Importantes

- **Credenciales:** `C:\DataBrokers\CREDENCIALES.txt`
- **Logs Backend:** `C:\DataBrokers\logs\backend.log`
- **Logs Frontend:** `C:\DataBrokers\logs\frontend.log`
- **Configuración Backend:** `C:\DataBrokers\backend\.env`
- **Configuración Frontend:** `C:\DataBrokers\frontend\.env`

### Documentación

- Documentación completa incluida
- Guías de usuario en el sistema
- Ejemplos en plantillas CSV

---

## ✅ Checklist Post-Instalación

- [ ] Script PowerShell ejecutado sin errores
- [ ] PostgreSQL 14 instalado y corriendo
- [ ] Node.js 18 instalado
- [ ] Base de datos creada (databrokers_prod)
- [ ] 14 tablas creadas
- [ ] Dependencias backend instaladas (`npm install`)
- [ ] Dependencias frontend instaladas (`npm install`)
- [ ] Frontend compilado (`npm run build`)
- [ ] Sistema iniciado correctamente
- [ ] Login exitoso en http://localhost:3000
- [ ] Contraseña admin cambiada
- [ ] Backup inicial realizado

---

## 🚀 Próximos Pasos

1. ✅ Cambiar contraseñas por defecto
2. ✅ Configurar email (SendGrid API Key)
3. ✅ Importar datos iniciales (proyectos, propiedades)
4. ✅ Crear usuarios del equipo
5. ✅ Configurar modelos de negocio
6. ✅ Capacitar al equipo
7. ✅ ¡Comenzar a usar el sistema!

---

## 🎉 Todo Listo

El sistema DataBrokers está instalado y listo para usar en tu computadora con Windows.

**Acceso rápido:**
- Hacer doble clic en "DataBrokers" en el escritorio
- Esperar 10-15 segundos a que inicien los servicios
- El navegador se abrirá automáticamente

---

**© 2025 DataBrokers - Sistema de Gestión de Negocios Inmobiliarios**

**Versión:** 1.0 Windows Edition  
**PostgreSQL:** 14  
**Node.js:** 18 LTS  
**Servidor:** Local (localhost)  

¡Sistema listo para producción! 🎉
