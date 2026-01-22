//require('dotenv').config();


import 'dotenv/config';


import Server from './models/Server.js';


const servidor = new Server();


servidor.listen();