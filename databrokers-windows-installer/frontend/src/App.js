import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography, Paper } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#3D4A99' },
    secondary: { main: '#F5A623' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #3D4A99 0%, #2C3770 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3
        }}>
          <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>
                📊 DataBrokers
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                Sistema de Gestión de Negocios Inmobiliarios
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, color: 'success.main' }}>
                ✅ Sistema instalado correctamente
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Windows Edition | PostgreSQL 14 | Localhost
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: 'warning.main' }}>
                🚧 Interfaz en desarrollo - Backend funcionando
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Backend API: <a href="http://localhost:5000/api" target="_blank" rel="noopener noreferrer">http://localhost:5000/api</a>
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
