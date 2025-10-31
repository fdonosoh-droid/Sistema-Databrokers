import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  TrendingUp,
  AttachMoney,
  Assignment
} from '@mui/icons-material';

function Dashboard({ user, onLogout }) {
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

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DataBrokers - Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {user?.nombre || 'Administrador'}
            </Typography>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user?.nombre?.charAt(0) || 'A'}
            </Avatar>
            <IconButton color="inherit" onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido Principal */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Bienvenida */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            ¡Bienvenido, {user?.nombre || 'Administrador'}! 👋
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Este es tu panel de control. Aquí podrás ver un resumen de tu negocio.
          </Typography>
        </Box>

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

        {/* Acciones Rápidas */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                🎯 Acciones Rápidas
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: '#3D4A9910' }
                    }}
                  >
                    <CardContent>
                      <HomeIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Gestionar Propiedades
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Ver, editar y agregar propiedades
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: '#F5A62310' }
                    }}
                  >
                    <CardContent>
                      <BusinessIcon sx={{ color: '#F5A623', fontSize: 32, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        CRM - Pipeline
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Gestionar negocios en curso
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: '#10B98110' }
                    }}
                  >
                    <CardContent>
                      <Assignment sx={{ color: '#10B981', fontSize: 32, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Cotizaciones
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Crear y enviar cotizaciones
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: '#3B82F610' }
                    }}
                  >
                    <CardContent>
                      <AssessmentIcon sx={{ color: '#3B82F6', fontSize: 32, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Reportes
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Generar reportes ejecutivos
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                🔔 Alertas Recientes
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Alert severity="info" text="Nuevo cliente registrado" />
                <Alert severity="warning" text="Negocio próximo a vencer" />
                <Alert severity="success" text="Venta confirmada" />
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
      </Container>
    </Box>
  );
}

// Componente de alerta simple
function Alert({ severity, text }) {
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

export default Dashboard;
