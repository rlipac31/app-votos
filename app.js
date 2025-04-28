require('dotenv').config();

const Server = require('./models/Server');


const servidor = new Server();


servidor.listen();