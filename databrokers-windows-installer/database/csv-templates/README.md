# Plantillas CSV para Carga Masiva
## DataBrokers v1.0

---

## 📋 Archivos Disponibles

### Plantillas Vacías (para completar):
- `proyectos_plantilla.csv` - Para cargar nuevos proyectos
- `propiedades_plantilla.csv` - Para cargar propiedades
- `clientes_plantilla.csv` - Para cargar clientes
- `usuarios_plantilla.csv` - Para cargar usuarios del sistema

### Archivos de Ejemplo (con datos de prueba):
- `proyectos_ejemplo.csv` - 5 proyectos de ejemplo
- `propiedades_ejemplo.csv` - 15 propiedades de ejemplo
- `clientes_ejemplo.csv` - 12 clientes de ejemplo
- `usuarios_ejemplo.csv` - 8 usuarios de ejemplo

---

## 🔧 Cómo Usar

### 1. Preparar el archivo CSV

- Use las plantillas vacías como base
- Complete todos los campos requeridos
- Mantenga el formato UTF-8 sin BOM
- Use comas (,) como separador
- No modifique los nombres de las columnas

### 2. Formato de Datos

#### Proyectos
```csv
codigo: Único, ej: PROY-001
nombre: Texto, ej: Edificio Vista Mar
direccion: Texto completo
comuna: Nombre de la comuna
region: Nombre de la región
tipo_proyecto: edificio|condominio|parcelas|oficinas|comercial|mixto
estado: planificacion|construccion|entrega|terminado
fecha_inicio: YYYY-MM-DD
fecha_termino_estimada: YYYY-MM-DD
inmobiliaria: Nombre de la inmobiliaria
total_unidades: Número entero
precio_minimo: Número sin separadores, ej: 4500000
precio_maximo: Número sin separadores
descripcion: Texto descriptivo
```

#### Propiedades
```csv
codigo: Único, ej: PROP-VM-501
proyecto_codigo: Debe existir en tabla proyectos
tipo_unidad: departamento|casa|oficina|local|bodega|estacionamiento|terreno
tipologia: ej: 2D2B, 3D2B, 4D3B
superficie_util: Número decimal, ej: 65.5
superficie_terraza: Número decimal
precio_venta: Número sin separadores
precio_arriendo: Número sin separadores (0 si no aplica)
numero_piso: Número entero (0 para casas/terrenos)
numero_unidad: Texto, ej: 501, Casa 1
dormitorios: Número entero
banos: Número entero (baños completos)
estacionamientos: Número entero
bodegas: Número entero
orientacion: Norte|Sur|Oriente|Poniente|N/A
estado: disponible|reservada|promesa|vendida|arrendada|bloqueada
gastos_comunes: Número sin separadores
contribuciones: Número sin separadores
```

#### Clientes
```csv
rut: Formato 12345678-9 (con guión)
nombres: Texto (obligatorio para personas)
apellidos: Texto (obligatorio para personas)
email: Formato email válido (único)
telefono_1: +56912345678 (con +56)
telefono_2: Opcional
direccion: Texto completo
comuna: Nombre de la comuna
region: Nombre de la región
tipo_cliente: persona|empresa
estado_civil: Opcional (casado|soltero|divorciado|viudo)
profesion: Texto (opcional)
origen_lead: web|facebook|instagram|google|referido|linkedin
```

#### Usuarios
```csv
rut: Formato 12345678-9 (único)
nombres: Texto
apellidos: Texto
email: Email corporativo (único)
rol: administrador|analista|supervisor|ejecutivo
telefono: +56912345678
fecha_ingreso: YYYY-MM-DD
```

---

## ⚠️ Reglas Importantes

### Codificación
- **IMPORTANTE**: Los archivos CSV deben estar en UTF-8 sin BOM
- En Excel: "Guardar como" → "CSV UTF-8"
- En LibreOffice: Seleccionar "UTF-8" al guardar

### Campos Obligatorios
- No dejar campos obligatorios vacíos
- Usar 0 o "N/A" para campos numéricos/texto no aplicables

### Formatos Numéricos
- **Sin puntos de miles**: ❌ 4.500.000 → ✅ 4500000
- **Decimales con punto**: ❌ 65,5 → ✅ 65.5
- **Sin signos monetarios**: ❌ $4.500.000 → ✅ 4500000

### Fechas
- **Formato**: YYYY-MM-DD
- **Correcto**: 2024-01-15
- **Incorrecto**: 15/01/2024, 15-01-2024

### Códigos Únicos
- Proyectos: PROY-XXX
- Propiedades: PROP-XXX-YYY
- Asegúrese de que no haya duplicados

---

## 📊 Proceso de Importación

### Desde la Interfaz Web:

1. Login como administrador
2. Ir a "Configuración" → "Importar Datos"
3. Seleccionar tipo de importación
4. Cargar archivo CSV
5. Revisar preview de datos
6. Confirmar importación
7. Revisar reporte de resultados

### Errores Comunes:

❌ **Error de codificación**
- Solución: Guardar como UTF-8 sin BOM

❌ **Código duplicado**
- Solución: Verificar que códigos sean únicos

❌ **Referencia no existe**
- Solución: Importar proyectos antes que propiedades

❌ **Formato de fecha incorrecto**
- Solución: Usar YYYY-MM-DD

❌ **Formato numérico incorrecto**
- Solución: Sin puntos de miles, decimal con punto

---

## 📝 Orden de Importación Recomendado

1. **Primero**: Usuarios (si no existen)
2. **Segundo**: Proyectos
3. **Tercero**: Propiedades (requieren proyectos)
4. **Cuarto**: Clientes

---

## 🔍 Validaciones del Sistema

El sistema valida automáticamente:

✅ Formato de RUT chileno
✅ Formato de email
✅ Existencia de referencias (proyecto_id)
✅ Valores dentro de rangos válidos
✅ Duplicados de códigos únicos
✅ Formatos de fecha
✅ Tipos de datos correctos

---

## 💡 Tips

### Excel / LibreOffice

**Guardar correctamente:**
1. Archivo → Guardar como
2. Tipo: "CSV UTF-8 (delimitado por comas)"
3. Guardar

**Evitar conversión automática:**
- Códigos como texto: Preceder con apóstrofe '
- Ejemplo: '12345678-9 para RUT

### Editor de Texto

- Use VS Code, Sublime Text o Notepad++
- Configurar codificación UTF-8
- Reemplazar tabulaciones por comas si es necesario

---

## 🆘 Soporte

Si tiene problemas con la importación:

1. Verifique el log de errores en el reporte de importación
2. Corrija los errores indicados
3. Reintente la importación
4. Contacte soporte: tech@databrokers.cl

---

## 📚 Recursos Adicionales

- Manual de usuario: `/docs/manual-usuario.pdf`
- Video tutoriales: https://docs.databrokers.cl/videos
- FAQs: https://docs.databrokers.cl/faqs

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0
