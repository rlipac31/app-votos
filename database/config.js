const mongoose = require('mongoose');

const dbConnections = async () => {

  try {

      await mongoose.connect( process.env.CONECCTION_BD);
    // await mongoose.connect('mongodb://127.0.0.1:27017/bd-votosApp');
      console.log('se conecto exitosamente');    
  } catch (error) {
    console.log('no se  CONECTO');
    console.log(error);
    throw new Error('Error a  la hora de conectar la base de datos Votos');

  }

}

module.exports = {
  dbConnections
}