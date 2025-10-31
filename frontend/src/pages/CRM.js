import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp,
  AttachMoney,
} from '@mui/icons-material';

function CRM() {
  // Estados del pipeline
  const estados = [
    { nombre: 'Contacto Inicial', color: '#3B82F6', negocios: 8 },
    { nombre: 'Calificación', color: '#8B5CF6', negocios: 6 },
    { nombre: 'Visita Agendada', color: '#F59E0B', negocios: 5 },
    { nombre: 'Cotización', color: '#10B981', negocios: 4 },
    { nombre: 'Cierre', color: '#EF4444', negocios: 2 },
  ];

  // Negocios de ejemplo
  const negocios = {
    'Contacto Inicial': [
      {
        id: 1,
        cliente: 'Juan Pérez',
        propiedad: 'Depto 203 - Torres del Sol',
        valor: 3500,
        ejecutivo: 'María González',
      },
      {
        id: 2,
        cliente: 'Ana Martínez',
        propiedad: 'Casa 15 - Vista Hermosa',
        valor: 6800,
        ejecutivo: 'Carlos Ruiz',
      },
    ],
    'Calificación': [
      {
        id: 3,
        cliente: 'Pedro López',
        propiedad: 'Depto 105 - Torres del Sol',
        valor: 2900,
        ejecutivo: 'María González',
      },
    ],
    'Visita Agendada': [
      {
        id: 4,
        cliente: 'Laura Sánchez',
        propiedad: 'Casa 8 - Parque Central',
        valor: 5200,
        ejecutivo: 'Carlos Ruiz',
      },
    ],
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            💼 CRM - Pipeline de Negocios
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Gestiona tus negocios en curso y sigue el progreso
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={() => alert('Formulario de nuevo negocio (próximamente)')}
        >
          Nuevo Negocio
        </Button>
      </Box>

      {/* Estadísticas generales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h5" fontWeight={700}>
                25
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              Negocios Activos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AttachMoney sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h5" fontWeight={700}>
                UF 85K
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              Valor Pipeline
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} color="warning.main">
              68%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tasa de Conversión
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} color="info.main">
              12 días
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tiempo Promedio
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Pipeline Kanban */}
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 3, minWidth: 1200, pb: 2 }}>
          {estados.map((estado) => (
            <Box key={estado.nombre} sx={{ flex: 1, minWidth: 280 }}>
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: estado.color + '20',
                  borderTop: `4px solid ${estado.color}`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {estado.nombre}
                  </Typography>
                  <Chip
                    label={negocios[estado.nombre]?.length || 0}
                    size="small"
                    sx={{ bgcolor: estado.color, color: 'white' }}
                  />
                </Box>
              </Paper>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {(negocios[estado.nombre] || []).map((negocio) => (
                  <Card
                    key={negocio.id}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {negocio.cliente}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {negocio.propiedad}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          UF {negocio.valor.toLocaleString()}
                        </Typography>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
                          {negocio.ejecutivo.charAt(0)}
                        </Avatar>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                {/* Placeholder para agregar negocio */}
                <Card
                  sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <AddIcon color="action" />
                    <Typography variant="body2" color="textSecondary">
                      Agregar negocio
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CRM;
