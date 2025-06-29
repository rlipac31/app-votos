const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 peticiones por ventana
    message: 'Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo después de 15 minutos'
});

// Aplícalo a rutas específicas o globalmente
/* app.use('/api/', apiLimiter); */

module.exports=apiLimiter