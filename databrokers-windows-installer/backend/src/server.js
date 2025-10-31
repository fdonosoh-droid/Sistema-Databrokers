const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        database: 'PostgreSQL 14'
    });
});

// API Info
app.get('/api', (req, res) => {
    res.json({ 
        message: 'DataBrokers API v1.0 - Windows Edition',
        server: 'localhost',
        database: 'PostgreSQL 14',
        endpoints: [
            '/api/auth - Autenticación',
            '/api/properties - Propiedades',
            '/api/projects - Proyectos',
            '/api/business - Negocios (CRM)',
            '/api/clients - Clientes',
            '/api/quotations - Cotizaciones',
            '/api/reports - Reportes',
            '/api/dashboard - Dashboard',
            '/api/users - Usuarios',
            '/api/models - Modelos de negocio'
        ]
    });
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Backend funcionando correctamente',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.path 
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  🚀 DataBrokers Backend');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  Port: ${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Database: PostgreSQL 14 (localhost:5432)`);
    console.log(`  Time: ${new Date().toLocaleString('es-CL')}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  API Ready: http://localhost:' + PORT);
    console.log('  Health Check: http://localhost:' + PORT + '/health');
    console.log('═══════════════════════════════════════════════════════════');
});

module.exports = app;
