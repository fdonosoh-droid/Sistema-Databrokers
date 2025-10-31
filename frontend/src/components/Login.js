import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoBox = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 16,
  margin: '0 auto 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxShadow: '0 4px 12px rgba(61, 74, 153, 0.3)',
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  '&::before': {
    content: '""',
    width: 30,
    height: 30,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    position: 'absolute',
    top: 10,
    left: 10,
    boxShadow: '0 2px 8px rgba(245, 166, 35, 0.5)',
  },
}));

const LogoBars = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  position: 'relative',
  zIndex: 1,
  '& > div': {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
});

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: 'admin@databrokers.cl',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'remember' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulación de login
      // En producción, esto haría una llamada a: http://localhost:5000/api/auth/login
      
      if (!formData.email || !formData.password) {
        throw new Error('Por favor completa todos los campos');
      }

      // Credenciales de prueba
      if (formData.email === 'admin@databrokers.cl' && formData.password === 'DataBrokers2025!') {
        // Guardar token (simulado)
        localStorage.setItem('token', 'demo-token-12345');
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: formData.email,
          nombre: 'Administrador',
          rol: 'administrador'
        }));

        // Llamar callback de login exitoso
        if (onLogin) {
          onLogin({
            email: formData.email,
            nombre: 'Administrador',
            rol: 'administrador'
          });
        }
      } else {
        throw new Error('Credenciales incorrectas. Usuario: admin@databrokers.cl | Contraseña: DataBrokers2025!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3D4A99 0%, #2C3770 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Logo */}
          <LogoBox>
            <LogoIcon />
            <LogoBars>
              <div style={{ width: 30 }} />
              <div style={{ width: 40 }} />
              <div style={{ width: 40 }} />
            </LogoBars>
          </LogoBox>

          {/* Título */}
          <Typography
            variant="h3"
            align="center"
            color="primary"
            fontWeight={700}
            gutterBottom
          >
            DataBrokers
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            sx={{ mb: 4 }}
          >
            Sistema de Gestión de Negocios Inmobiliarios
          </Typography>

          {/* Alerta de error */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Alerta de info */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Credenciales de prueba:</strong><br />
            Email: admin@databrokers.cl<br />
            Contraseña: DataBrokers2025!
          </Alert>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={loading}
                />
              }
              label="Recordarme en este dispositivo"
              sx={{ mt: 1, mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(61, 74, 153, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(61, 74, 153, 0.4)',
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Iniciar Sesión'
              )}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link
                href="#"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Contacta al administrador para recuperar tu contraseña');
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </form>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              © 2025 DataBrokers - Todos los derechos reservados
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Versión 1.0 | PostgreSQL 14 | Localhost
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
