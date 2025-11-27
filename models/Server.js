const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit'); // ¡Importa express-rate-limit!


const { dbConnections } = require('../config/db');
const { crearUserdmin } = require('../config/config')
      //inicio cors
      // Define la URL de tu frontend.
// Es crucial que esta URL sea EXACTA (incluyendo http/https, www, puerto si lo tiene).
// Puedes obtenerla de una variable de entorno para mayor flexibilidad en diferentes entornos (desarrollo, producción).
const allowedOrigins = [
  `https://app-votar-2025-orpin.vercel.app/`, // index
   `https://app-votos-cnnb.onrender.com/api/candidatos/`,//lista candidatos
   `https://app-votos-cnnb.onrender.com/api/votos/result-votos`,//lista votos
   `http://localhost:5000/api/votos/result-votos`,//votos local
    'http://localhost:4000', // Si tu frontend corre en localhost para desarrollo (ej. 
   'http://localhost:5000',// 
    'http://localhost:3000', // O si tu frontend corre en otro puerto de localhost
  

];

// Configuración de CORS
const corsOptions = {
    origin: function (origin, callback) {
        // Permite solicitudes sin origen (como las de Postman/Insomnia o solicitudes de archivos locales)
        // O si el origen de la solicitud está en nuestra lista de orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permite la solicitud
        } else {
            callback(new Error('No permitido por CORS')); // Bloquea la solicitud
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Si tu frontend necesita enviar cookies o encabezados de autorización con credenciales
    optionsSuccessStatus: 204 // Para pre-vuelos OPTIONS
};
      //fin cors

class Server {
    constructor(){
      this.app = express();
      this.port = process.env.PORT || 5000;
      //rutas iniciales
      this.authPath = '/api/auth';
      this.usuariosPath = '/api/usuarios';
     
      this.candidatosPath = '/api/candidatos';
      this.votosPath = '/api/votos';

      //conectar BD
      this.conexionBD();
      //Middleware
      this.middlewares();
      //rutas de la app

      this.routes();

    }

    //funcion conexcion Bd
    async conexionBD(){
      await  dbConnections();
    }
  
    //Middlewares
    middlewares(){
      // Aplica el middleware CORS con tus opciones personalizadas
      crearUserdmin();
      //datos  inniciaales
          //cors
          this.app.use(cors(corsOptions));
          //lectura y parseo del body
          // Configuración del Rate Limiter
      // Esto limitará cada IP a 100 peticiones en un período de 15 minutos
       const apiLimiter = rateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutos
          max: 50, // Limita cada IP a 100 peticiones por ventana
          message: 'Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo después de 20 minutos'
      });

      // Aplica el rate limiter a todas las rutas que empiecen con /api/
      // Esto significa que tus rutas como /api/auth, /api/usuarios, etc., estarán protegidas.

         this.app.use('/api/', apiLimiter);
          this.app.use( express.json());
          this.app.use(bodyParser.json());    
          this.app.use(bodyParser.urlencoded({ extended: true }));
          //directorio publico
          this.app.use( express.static('public'));
    }
    //llamando a las rutass
    routes(){
      crearUserdmin();
      this.app.use( this.usuariosPath, require('../routes/usuarios'));
      this.app.use( this.authPath, require('../routes/auth'))
      this.app.use( this.candidatosPath, require('../routes/candidatos'));
      this.app.use( this.votosPath, require('../routes/votos'));
    }
    //levantando el servidor

    listen(){
      this.app.listen( this.port, () => {
        console.log('Servidor corriendo en el puerto', this.port);
      })
    }
}

module.exports = Server;