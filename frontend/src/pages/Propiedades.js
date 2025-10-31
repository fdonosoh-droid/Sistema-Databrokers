import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

function Propiedades() {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const propiedades = [
    {
      id: 1,
      codigo: 'PROP-001',
      proyecto: 'Torres del Sol',
      tipo: 'Departamento',
      dormitorios: 3,
      banos: 2,
      superficie: 85,
      precio: 3500,
      estado: 'Disponible',
    },
    {
      id: 2,
      codigo: 'PROP-002',
      proyecto: 'Vista Hermosa',
      tipo: 'Casa',
      dormitorios: 4,
      banos: 3,
      superficie: 150,
      precio: 6800,
      estado: 'Reservada',
    },
    {
      id: 3,
      codigo: 'PROP-003',
      proyecto: 'Torres del Sol',
      tipo: 'Departamento',
      dormitorios: 2,
      banos: 2,
      superficie: 65,
      precio: 2900,
      estado: 'Disponible',
    },
  ];

  const getEstadoColor = (estado) => {
    const colors = {
      Disponible: 'success',
      Reservada: 'warning',
      Vendida: 'error',
    };
    return colors[estado] || 'default';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            🏠 Gestión de Propiedades
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Ver, editar y agregar propiedades del sistema
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={() => alert('Formulario de nueva propiedad (próximamente)')}
        >
          Nueva Propiedad
        </Button>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" color="primary" fontWeight={700}>
              156
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Propiedades
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" color="success.main" fontWeight={700}>
              98
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Disponibles
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" color="warning.main" fontWeight={700}>
              32
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Reservadas
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" color="error.main" fontWeight={700}>
              26
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Vendidas
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar por código, proyecto, tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Tabla de propiedades */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f7fa' }}>
              <TableCell><strong>Código</strong></TableCell>
              <TableCell><strong>Proyecto</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell align="center"><strong>Dorm.</strong></TableCell>
              <TableCell align="center"><strong>Baños</strong></TableCell>
              <TableCell align="right"><strong>m²</strong></TableCell>
              <TableCell align="right"><strong>Precio (UF)</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propiedades.map((prop) => (
              <TableRow key={prop.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {prop.codigo}
                  </Typography>
                </TableCell>
                <TableCell>{prop.proyecto}</TableCell>
                <TableCell>{prop.tipo}</TableCell>
                <TableCell align="center">{prop.dormitorios}</TableCell>
                <TableCell align="center">{prop.banos}</TableCell>
                <TableCell align="right">{prop.superficie} m²</TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    UF {prop.precio.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={prop.estado}
                    color={getEstadoColor(prop.estado)}
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
                  <IconButton size="small" color="error">
                    <DeleteIcon />
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

export default Propiedades;
