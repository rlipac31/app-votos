const express = require('express');
const cors = require("cors");

const { dbConnections } = require('../database/config');



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
          //cors
          this.app.use(cors());
          //lectura y parseo del body
          this.app.use( express.json());
          //directorio publico
          this.app.use( express.static('public'));
    }
    //llamando a las rutas
    routes(){
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