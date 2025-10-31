import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  Assignment,
  Assessment as AssessmentIcon,
  TrendingUp,
  AttachMoney,
  People as PeopleIcon,
} from '@mui/icons-material';

function DashboardHome() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Negocios Activos',
      value: '24',
      change: '+12%',
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: '#3D4A99'
    },
    {
      title: 'Propiedades Disponibles',
      value: '156',
      change: '+8',
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      color: '#F5A623'
    },
    {
      title: 'Clientes Nuevos',
      value: '18',
      change: '+5',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#10B981'
    },
    {
      title: 'Ventas del Mes',
      value: '$2.4M',
      change: '+18%',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#3B82F6'
    }
  ];

  const quickActions = [
    {
      title: 'Gestionar Propiedades',
      description: 'Ver, editar y agregar propiedades',
      icon: <HomeIcon color="primary" sx={{ fontSize: 32 }} />,
      path: '/propiedades',
      color: '#3D4A9910'
    },
    {
      title: 'CRM - Pipeline',
      description: 'Gestionar negocios en curso',
      icon: <BusinessIcon sx={{ color: '#F5A623', fontSize: 32 }} />,
      path: '/crm',
      color: '#F5A62310'
    },
    {
      title: 'Cotizaciones',
      description: 'Crear y enviar cotizaciones',
      icon: <Assignment sx={{ color: '#10B981', fontSize: 32 }} />,
      path: '/cotizaciones',
      color: '#10B98110'
    },
    {
      title: 'Reportes',
      description: 'Generar reportes ejecutivos',
      icon: <AssessmentIcon sx={{ color: '#3B82F6', fontSize: 32 }} />,
      path: '/reportes',
      color: '#3B82F610'
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
        Resumen general del negocio
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 160,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: stat.color + '20',
                    color: stat.color,
                    p: 1,
                    borderRadius: 2,
                    mr: 2
                  }}
                >
                  {stat.icon}
                </Box>
                <Chip
                  label={stat.change}
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Acciones Rápidas */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              🎯 Acciones Rápidas
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: action.color, transform: 'translateY(-2px)' }
                    }}
                    onClick={() => navigate(action.path)}
                  >
                    <CardContent>
                      {action.icon}
                      <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Alertas Recientes */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              🔔 Alertas Recientes
            </Typography>
            <Box sx={{ mt: 2 }}>
              <AlertItem severity="info" text="Nuevo cliente registrado" />
              <AlertItem severity="warning" text="Negocio próximo a vencer" />
              <AlertItem severity="success" text="Venta confirmada" />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Información del Sistema */}
      <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: '#3D4A9910' }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          ℹ️ Información del Sistema
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">
              <strong>Base de Datos:</strong> PostgreSQL 14
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">
              <strong>Servidor:</strong> Localhost
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">
              <strong>Versión:</strong> 1.0
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

function AlertItem({ severity, text }) {
  const colors = {
    info: '#3B82F6',
    warning: '#F59E0B',
    success: '#10B981'
  };

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderLeft: `4px solid ${colors[severity]}`,
        bgcolor: colors[severity] + '10',
        borderRadius: 1
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}

export default DashboardHome;
