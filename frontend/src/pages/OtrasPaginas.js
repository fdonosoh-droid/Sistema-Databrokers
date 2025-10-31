import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export function Clientes() {
  const clientes = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '+56912345678', negocios: 2, estado: 'Activo' },
    { id: 2, nombre: 'Ana Martínez', email: 'ana@email.com', telefono: '+56987654321', negocios: 1, estado: 'Activo' },
    { id: 3, nombre: 'Pedro López', email: 'pedro@email.com', telefono: '+56923456789', negocios: 0, estado: 'Inactivo' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            👥 Gestión de Clientes
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Base de datos de clientes y contactos
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Nuevo Cliente
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar cliente por nombre, email o teléfono..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f7fa' }}>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Teléfono</strong></TableCell>
              <TableCell align="center"><strong>Negocios</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id} hover>
                <TableCell>
                  <Typography fontWeight={600}>{cliente.nombre}</Typography>
                </TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell align="center">{cliente.negocios}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={cliente.estado}
                    color={cliente.estado === 'Activo' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function Cotizaciones() {
  const cotizaciones = [
    { id: 1, numero: 'COT-001', cliente: 'Juan Pérez', propiedad: 'Depto 203', valor: 3500, fecha: '2025-10-25', estado: 'Enviada' },
    { id: 2, numero: 'COT-002', cliente: 'Ana Martínez', propiedad: 'Casa 15', valor: 6800, fecha: '2025-10-24', estado: 'Aprobada' },
    { id: 3, numero: 'COT-003', cliente: 'Pedro López', propiedad: 'Depto 105', valor: 2900, fecha: '2025-10-23', estado: 'Pendiente' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            📄 Cotizaciones
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Crear y enviar cotizaciones a clientes
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Nueva Cotización
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f7fa' }}>
              <TableCell><strong>Número</strong></TableCell>
              <TableCell><strong>Cliente</strong></TableCell>
              <TableCell><strong>Propiedad</strong></TableCell>
              <TableCell align="right"><strong>Valor (UF)</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cotizaciones.map((cot) => (
              <TableRow key={cot.id} hover>
                <TableCell>
                  <Typography fontWeight={600}>{cot.numero}</Typography>
                </TableCell>
                <TableCell>{cot.cliente}</TableCell>
                <TableCell>{cot.propiedad}</TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>UF {cot.valor.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>{cot.fecha}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={cot.estado}
                    color={
                      cot.estado === 'Aprobada' ? 'success' :
                      cot.estado === 'Enviada' ? 'info' : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <ViewIcon />
                  </IconButton>
                  <Button size="small" variant="outlined" sx={{ ml: 1 }}>
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function Reportes() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          📊 Reportes Ejecutivos
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genera reportes detallados del negocio
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
        <Paper sx={{ p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
          <Typography variant="h5" gutterBottom>📈 Reporte de Ventas</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Ventas por periodo, ejecutivo y proyecto
          </Typography>
          <Button variant="contained">Generar</Button>
        </Paper>

        <Paper sx={{ p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
          <Typography variant="h5" gutterBottom>💰 Reporte Financiero</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Análisis de ingresos y comisiones
          </Typography>
          <Button variant="contained">Generar</Button>
        </Paper>

        <Paper sx={{ p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
          <Typography variant="h5" gutterBottom>🏠 Reporte de Inventario</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Estado actual de propiedades
          </Typography>
          <Button variant="contained">Generar</Button>
        </Paper>

        <Paper sx={{ p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
          <Typography variant="h5" gutterBottom>👥 Reporte de Clientes</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Análisis de base de clientes
          </Typography>
          <Button variant="contained">Generar</Button>
        </Paper>

        <Paper sx={{ p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
          <Typography variant="h5" gutterBottom>📊 Dashboard Completo</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Reporte ejecutivo consolidado
          </Typography>
          <Button variant="contained">Generar</Button>
        </Paper>

        <Paper sx={{ p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
          <Typography variant="h5" gutterBottom>⚡ Reporte Personalizado</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Crea tu propio reporte
          </Typography>
          <Button variant="contained">Configurar</Button>
        </Paper>
      </Box>
    </Box>
  );
}
