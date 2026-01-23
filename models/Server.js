

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';


import { dbConnections } from '../config/db.js';
import { crearUserdmin } from '../config/config.js';

import routerVotos from '../routes/votos.js';
import routerCandidatos from '../routes/candidatos.js';
import routerUsuarios from '../routes/usuarios.js';
import routerAuth from '../routes/auth.js';

      //inicio cors
      // Define la URL de tu frontend.
// Es crucial que esta URL sea EXACTA (incluyendo http/https, www, puerto si lo tiene).
// Puedes obtenerla de una variable de entorno para mayor flexibilidad en diferentes entornos (desarrollo, producción).


const allowedOrigins = [
  'https://votalibre.netlify.app',
  'https://app-votar-2025.vercel.app',
  'http://localhost:3000' // Next.js por defecto usa el 3000
];

const corsOptions = {
  origin: function (origin, callback) {
    // Si no hay origin (como curl normal o Postman), permitir
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Importante: null en el primer parámetro para que Express no explote
      // false en el segundo para que el navegador bloquee el CORS
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200 
};

/* 
// Configuración de CORS
const corsOptions = {
    origin: function (origin, callback) {
        // Permite solicitudes sin origen (como las de Postman/Insomnia o solicitudes de archivos locales)
        // O si el origen de la solicitud está en nuestra lista de orígenes permitidos
       // if (!origin || allowedOrigins.includes(origin)) {
         //   callback(null, true); // Permite la solicitud

      if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
                  callback(null, true);

        } else {
            callback(new Error('No permitido por CORS')); // Bloquea la solicitud
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Si tu frontend necesita enviar cookies o encabezados de autorización con credenciales
    optionsSuccessStatus: 204 // Para pre-vuelos OPTIONS
};
 */

      //fin cors

class Server {
    constructor(){
      this.app = express();
      this.port = process.env.PORT || 8080;
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
         
          middlewares() {
            // 1. Crear admin (Ejecutar lógica antes de configurar tráfico si es necesario)
            //crearUserdmin();
             this.app.set('trust proxy', 1);//Esta línea le dice a Express: "Confía en el servidor que tienes delante". activa la lectura al poner valor 1 del Ip del usuario o cliente
              // Si estás detrás de un proxy (como Heroku, AWS ELB, Nginx, etc.), habilita esta configuración
            // 2. CORS (Siempre debe ir de los primeros)
            this.app.use(cors(corsOptions));
            // 3. Lectura y parseo del Body (SOLO UNO)
            // Importante: Debe ir ANTES de las rutas y del limitador si este analiza contenido
            this.app.use(express.json({ limit: '50mb' })); 
            this.app.use(express.urlencoded({ extended: true }));

            // 4. Rate Limiter
            const apiLimiter = rateLimit({
                windowMs: 15 * 60 * 1000,
                max: 50,
                message: 'Demasiadas solicitudes, intenta en 20 minutos'
            });
            this.app.use('/api/', apiLimiter);

            // 5. Directorio público
            this.app.use(express.static('public'));
        }
    //llamando a las rutass
    routes(){
      crearUserdmin();
      this.app.use( this.usuariosPath, routerUsuarios); 
      this.app.use( this.authPath, routerAuth)
      this.app.use( this.candidatosPath, routerCandidatos);
      this.app.use( this.votosPath, routerVotos);
    }
    //levantando el servidor

    listen(){
      this.app.listen( this.port, () => {
        console.log('Servidor corriendo en el puerto', this.port);
      })
    }
}

export default Server;

