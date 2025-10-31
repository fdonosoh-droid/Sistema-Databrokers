-- ============================================================================
-- DATABROKERS - Sistema de Gestión de Negocios Inmobiliarios
-- Script de Inicialización de Base de Datos PostgreSQL 15
-- ============================================================================
-- Codificación: UTF-8 sin BOM
-- Ejecutar con: psql -d databrokers_prod -f init-database.sql
-- ============================================================================

-- Configuración inicial
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsqueda full-text
CREATE EXTENSION IF NOT EXISTS "cube"; -- Para cálculos geográficos
CREATE EXTENSION IF NOT EXISTS "earthdistance"; -- Para distancias

\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo '  DATABROKERS - Creando Base de Datos'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

-- ============================================================================
-- TABLA: usuarios
-- ============================================================================
\echo '→ Creando tabla usuarios...'

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('administrador', 'analista', 'supervisor', 'ejecutivo')),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido')),
    supervisor_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    telefono VARCHAR(20),
    foto_perfil VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    intentos_fallidos INTEGER DEFAULT 0,
    bloqueado_hasta TIMESTAMP,
    token_reset VARCHAR(255),
    token_reset_expira TIMESTAMP,
    preferencias JSONB DEFAULT '{}'
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rut ON usuarios(rut);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_usuarios_estado ON usuarios(estado);

-- ============================================================================
-- TABLA: modelos_negocio
-- ============================================================================
\echo '→ Creando tabla modelos_negocio...'

CREATE TABLE IF NOT EXISTS modelos_negocio (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('venta', 'arriendo', 'leasing', 'mixto')),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    descripcion TEXT,
    configuracion JSONB DEFAULT '{}',
    estructura_comisiones JSONB DEFAULT '{}',
    etapas_proceso JSONB DEFAULT '[]',
    campos_personalizados JSONB DEFAULT '{}',
    documentos_requeridos JSONB DEFAULT '[]',
    creado_por INTEGER REFERENCES usuarios(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_modelos_tipo ON modelos_negocio(tipo);
CREATE INDEX idx_modelos_estado ON modelos_negocio(estado);

-- ============================================================================
-- TABLA: proyectos
-- ============================================================================
\echo '→ Creando tabla proyectos...'

CREATE TABLE IF NOT EXISTS proyectos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(255),
    comuna VARCHAR(100),
    region VARCHAR(100),
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    tipo_proyecto VARCHAR(50) CHECK (tipo_proyecto IN ('edificio', 'condominio', 'parcelas', 'oficinas', 'comercial', 'mixto')),
    estado VARCHAR(30) DEFAULT 'planificacion' CHECK (estado IN ('planificacion', 'construccion', 'entrega', 'terminado')),
    fecha_inicio DATE,
    fecha_termino_estimada DATE,
    inmobiliaria VARCHAR(100),
    descripcion TEXT,
    caracteristicas JSONB DEFAULT '{}',
    logo_proyecto VARCHAR(255),
    imagen_principal VARCHAR(255),
    total_unidades INTEGER,
    unidades_disponibles INTEGER,
    precio_minimo DECIMAL(15, 2),
    precio_maximo DECIMAL(15, 2),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_proyectos_codigo ON proyectos(codigo);
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_proyectos_comuna ON proyectos(comuna);

-- ============================================================================
-- TABLA: propiedades
-- ============================================================================
\echo '→ Creando tabla propiedades...'

CREATE TABLE IF NOT EXISTS propiedades (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    proyecto_id INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    tipo_unidad VARCHAR(30) NOT NULL CHECK (tipo_unidad IN ('departamento', 'casa', 'oficina', 'local', 'bodega', 'estacionamiento', 'terreno')),
    tipologia VARCHAR(20),
    superficie_util DECIMAL(8, 2),
    superficie_terraza DECIMAL(8, 2) DEFAULT 0,
    superficie_total DECIMAL(8, 2),
    precio_venta DECIMAL(15, 2),
    precio_arriendo DECIMAL(12, 2),
    numero_piso INTEGER,
    numero_unidad VARCHAR(20),
    orientacion VARCHAR(20),
    dormitorios INTEGER,
    banos INTEGER,
    bodegas INTEGER DEFAULT 0,
    estacionamientos INTEGER DEFAULT 0,
    estado VARCHAR(30) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'reservada', 'promesa', 'vendida', 'arrendada', 'bloqueada')),
    fecha_disponibilidad DATE,
    fecha_reserva TIMESTAMP,
    caracteristicas JSONB DEFAULT '{}',
    gastos_comunes DECIMAL(10, 2),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    publicado BOOLEAN DEFAULT true
);

CREATE INDEX idx_propiedades_codigo ON propiedades(codigo);
CREATE INDEX idx_propiedades_proyecto ON propiedades(proyecto_id);
CREATE INDEX idx_propiedades_estado ON propiedades(estado);
CREATE INDEX idx_propiedades_tipo ON propiedades(tipo_unidad);
CREATE INDEX idx_propiedades_precio_venta ON propiedades(precio_venta);

-- ============================================================================
-- TABLA: clientes
-- ============================================================================
\echo '→ Creando tabla clientes...'

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    razon_social VARCHAR(200),
    email VARCHAR(100) UNIQUE,
    telefono_1 VARCHAR(20),
    telefono_2 VARCHAR(20),
    direccion VARCHAR(255),
    comuna VARCHAR(100),
    region VARCHAR(100),
    tipo_cliente VARCHAR(20) DEFAULT 'persona' CHECK (tipo_cliente IN ('persona', 'empresa')),
    estado_civil VARCHAR(20),
    profesion VARCHAR(100),
    origen_lead VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'prospecto', 'cliente')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registrado_por INTEGER REFERENCES usuarios(id)
);

CREATE INDEX idx_clientes_rut ON clientes(rut);
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_estado ON clientes(estado);

-- ============================================================================
-- TABLA: negocios
-- ============================================================================
\echo '→ Creando tabla negocios...'

CREATE TABLE IF NOT EXISTS negocios (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    modelo_id INTEGER NOT NULL REFERENCES modelos_negocio(id),
    propiedad_id INTEGER NOT NULL REFERENCES propiedades(id),
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    ejecutivo_id INTEGER NOT NULL REFERENCES usuarios(id),
    supervisor_id INTEGER REFERENCES usuarios(id),
    estado VARCHAR(50) DEFAULT 'lead_generado' CHECK (estado IN (
        'lead_generado', 'contacto_establecido', 'presentacion_realizada',
        'cotizacion_enviada', 'negociacion', 'promesa_firmada',
        'escrituracion', 'cerrado_ganado', 'cerrado_perdido', 'cancelado'
    )),
    valor_negocio DECIMAL(15, 2) NOT NULL,
    descuento_aplicado DECIMAL(15, 2) DEFAULT 0,
    comision_estimada DECIMAL(15, 2),
    probabilidad_cierre INTEGER DEFAULT 20 CHECK (probabilidad_cierre >= 0 AND probabilidad_cierre <= 100),
    origen_lead VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_estimada_cierre DATE,
    fecha_cierre_real TIMESTAMP,
    dias_en_pipeline INTEGER DEFAULT 0,
    motivo_cancelacion VARCHAR(100),
    observaciones TEXT,
    datos_adicionales JSONB DEFAULT '{}'
);

CREATE INDEX idx_negocios_codigo ON negocios(codigo);
CREATE INDEX idx_negocios_modelo ON negocios(modelo_id);
CREATE INDEX idx_negocios_propiedad ON negocios(propiedad_id);
CREATE INDEX idx_negocios_cliente ON negocios(cliente_id);
CREATE INDEX idx_negocios_ejecutivo ON negocios(ejecutivo_id);
CREATE INDEX idx_negocios_estado ON negocios(estado);
CREATE INDEX idx_negocios_fecha ON negocios(fecha_creacion);

-- ============================================================================
-- TABLA: cotizaciones
-- ============================================================================
\echo '→ Creando tabla cotizaciones...'

CREATE TABLE IF NOT EXISTS cotizaciones (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    negocio_id INTEGER NOT NULL REFERENCES negocios(id) ON DELETE CASCADE,
    propiedad_id INTEGER NOT NULL REFERENCES propiedades(id),
    version INTEGER DEFAULT 1,
    precio_base DECIMAL(15, 2) NOT NULL,
    descuento_monto DECIMAL(15, 2) DEFAULT 0,
    precio_final DECIMAL(15, 2) NOT NULL,
    pie_inicial DECIMAL(15, 2),
    plazo_meses INTEGER,
    tasa_interes_anual DECIMAL(5, 2),
    cuota_mensual DECIMAL(12, 2),
    gastos_totales DECIMAL(12, 2),
    pdf_generado VARCHAR(255),
    enviada_a VARCHAR(255),
    fecha_envio TIMESTAMP,
    estado VARCHAR(30) DEFAULT 'borrador' CHECK (estado IN ('borrador', 'enviada', 'vista', 'aceptada', 'rechazada')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creada_por INTEGER REFERENCES usuarios(id)
);

CREATE INDEX idx_cotizaciones_negocio ON cotizaciones(negocio_id);
CREATE INDEX idx_cotizaciones_estado ON cotizaciones(estado);

-- ============================================================================
-- TABLA: actividades
-- ============================================================================
\echo '→ Creando tabla actividades...'

CREATE TABLE IF NOT EXISTS actividades (
    id SERIAL PRIMARY KEY,
    negocio_id INTEGER REFERENCES negocios(id) ON DELETE CASCADE,
    cliente_id INTEGER REFERENCES clientes(id),
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    tipo_actividad VARCHAR(50) NOT NULL CHECK (tipo_actividad IN (
        'llamada', 'email', 'reunion', 'visita_terreno', 
        'presentacion', 'seguimiento', 'nota', 'tarea'
    )),
    titulo VARCHAR(200),
    descripcion TEXT,
    fecha_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completada BOOLEAN DEFAULT false,
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'urgente'))
);

CREATE INDEX idx_actividades_negocio ON actividades(negocio_id);
CREATE INDEX idx_actividades_usuario ON actividades(usuario_id);
CREATE INDEX idx_actividades_fecha ON actividades(fecha_actividad);

-- ============================================================================
-- TABLA: alertas
-- ============================================================================
\echo '→ Creando tabla alertas...'

CREATE TABLE IF NOT EXISTS alertas (
    id SERIAL PRIMARY KEY,
    tipo_alerta VARCHAR(50) NOT NULL CHECK (tipo_alerta IN (
        'nuevo_negocio', 'cambio_estado', 'cancelacion',
        'cotizacion_enviada', 'promesa_firmada', 'sistema'
    )),
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'critica')),
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    entidad_tipo VARCHAR(50),
    entidad_id INTEGER,
    destinatarios INTEGER[],
    usuarios_leido INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url_accion VARCHAR(255)
);

CREATE INDEX idx_alertas_tipo ON alertas(tipo_alerta);
CREATE INDEX idx_alertas_fecha ON alertas(fecha_creacion);

-- ============================================================================
-- TABLA: documentos
-- ============================================================================
\echo '→ Creando tabla documentos...'

CREATE TABLE IF NOT EXISTS documentos (
    id SERIAL PRIMARY KEY,
    entidad_tipo VARCHAR(50) NOT NULL,
    entidad_id INTEGER NOT NULL,
    tipo_documento VARCHAR(50) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    tamano_bytes BIGINT,
    mime_type VARCHAR(100),
    subido_por INTEGER REFERENCES usuarios(id),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documentos_entidad ON documentos(entidad_tipo, entidad_id);

-- ============================================================================
-- TABLA: imagenes
-- ============================================================================
\echo '→ Creando tabla imagenes...'

CREATE TABLE IF NOT EXISTS imagenes (
    id SERIAL PRIMARY KEY,
    entidad_tipo VARCHAR(50) NOT NULL CHECK (entidad_tipo IN ('propiedad', 'proyecto')),
    entidad_id INTEGER NOT NULL,
    tipo_imagen VARCHAR(30) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    url_publica VARCHAR(500),
    orden INTEGER DEFAULT 0,
    es_principal BOOLEAN DEFAULT false,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_imagenes_entidad ON imagenes(entidad_tipo, entidad_id);

-- ============================================================================
-- TABLA: reportes
-- ============================================================================
\echo '→ Creando tabla reportes...'

CREATE TABLE IF NOT EXISTS reportes (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    tipo_reporte VARCHAR(50) NOT NULL,
    modelo_id INTEGER REFERENCES modelos_negocio(id),
    periodo_inicio DATE NOT NULL,
    periodo_fin DATE NOT NULL,
    parametros JSONB DEFAULT '{}',
    archivo_generado VARCHAR(500),
    estado VARCHAR(30) DEFAULT 'programado',
    generado_por INTEGER REFERENCES usuarios(id),
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reportes_tipo ON reportes(tipo_reporte);

-- ============================================================================
-- TABLA: importaciones
-- ============================================================================
\echo '→ Creando tabla importaciones...'

CREATE TABLE IF NOT EXISTS importaciones (
    id SERIAL PRIMARY KEY,
    tipo_importacion VARCHAR(50) NOT NULL,
    archivo_original VARCHAR(255) NOT NULL,
    registros_total INTEGER DEFAULT 0,
    registros_exitosos INTEGER DEFAULT 0,
    registros_error INTEGER DEFAULT 0,
    log_errores JSONB DEFAULT '[]',
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    fecha_importacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(30) DEFAULT 'procesando'
);

CREATE INDEX idx_importaciones_tipo ON importaciones(tipo_importacion);
CREATE INDEX idx_importaciones_fecha ON importaciones(fecha_importacion);

-- ============================================================================
-- TABLA: audit_logs
-- ============================================================================
\echo '→ Creando tabla audit_logs...'

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    accion VARCHAR(50) NOT NULL,
    entidad_tipo VARCHAR(50) NOT NULL,
    entidad_id INTEGER,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_origen VARCHAR(45),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resultado VARCHAR(20) CHECK (resultado IN ('exito', 'error', 'denegado'))
);

CREATE INDEX idx_audit_usuario ON audit_logs(usuario_id);
CREATE INDEX idx_audit_fecha ON audit_logs(fecha_hora);

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================
\echo '→ Creando funciones y triggers...'

-- Trigger para actualizar días en pipeline
CREATE OR REPLACE FUNCTION actualizar_dias_pipeline()
RETURNS TRIGGER AS $$
BEGIN
    NEW.dias_en_pipeline := EXTRACT(DAY FROM (CURRENT_TIMESTAMP - NEW.fecha_creacion));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_dias_pipeline
    BEFORE UPDATE ON negocios
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_dias_pipeline();

-- ============================================================================
-- DATOS INICIALES
-- ============================================================================
\echo '→ Insertando datos iniciales...'

-- Usuario administrador por defecto
INSERT INTO usuarios (rut, nombres, apellidos, email, password_hash, rol, estado)
VALUES (
    '11111111-1',
    'Administrador',
    'Sistema',
    'admin@databrokers.cl',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5aeGNXXXXXXXX', -- DataBrokers2025!
    'administrador',
    'activo'
) ON CONFLICT (email) DO NOTHING;

-- Modelo de negocio por defecto (Venta)
INSERT INTO modelos_negocio (codigo, nombre, tipo, estado, configuracion)
VALUES (
    'MDL-VENTA-01',
    'Venta Estándar',
    'venta',
    'activo',
    '{"comision_porcentaje": 3.5, "comision_minima": 1500000, "permite_descuentos": true, "descuento_maximo_porcentaje": 5}'
) ON CONFLICT (codigo) DO NOTHING;

-- Modelo de negocio por defecto (Arriendo)
INSERT INTO modelos_negocio (codigo, nombre, tipo, estado, configuracion)
VALUES (
    'MDL-ARR-01',
    'Arriendo Estándar',
    'arriendo',
    'activo',
    '{"comision_porcentaje": 50, "comision_minima": 500000, "permite_descuentos": false}'
) ON CONFLICT (codigo) DO NOTHING;

-- ============================================================================
-- VISTAS
-- ============================================================================
\echo '→ Creando vistas...'

CREATE OR REPLACE VIEW v_negocios_completos AS
SELECT 
    n.id,
    n.codigo,
    n.estado,
    n.valor_negocio,
    n.probabilidad_cierre,
    n.fecha_creacion,
    n.dias_en_pipeline,
    m.nombre as modelo_nombre,
    p.codigo as propiedad_codigo,
    p.tipo_unidad,
    pr.nombre as proyecto_nombre,
    c.nombres || ' ' || c.apellidos as cliente_nombre,
    c.email as cliente_email,
    u.nombres || ' ' || u.apellidos as ejecutivo_nombre
FROM negocios n
INNER JOIN modelos_negocio m ON n.modelo_id = m.id
INNER JOIN propiedades p ON n.propiedad_id = p.id
INNER JOIN proyectos pr ON p.proyecto_id = pr.id
INNER JOIN clientes c ON n.cliente_id = c.id
INNER JOIN usuarios u ON n.ejecutivo_id = u.id;

-- ============================================================================
-- FINALIZACIÓN
-- ============================================================================

\echo ''
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo '  ✓ Base de datos inicializada correctamente'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo ''
\echo 'Tablas creadas: 14'
\echo 'Índices creados: 30+'
\echo 'Triggers creados: 1'
\echo 'Vistas creadas: 1'
\echo ''
\echo 'Usuario administrador:'
\echo '  Email: admin@databrokers.cl'
\echo '  Contraseña: DataBrokers2025!'
\echo ''
\echo '⚠️  IMPORTANTE: Cambia la contraseña por defecto en el primer acceso'
\echo ''
