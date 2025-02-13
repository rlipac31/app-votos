const mongoose = require('mongoose');

const dbConnections = async () => {

  try {

     // await mongoose.connect( process.env.CONECCTION_BD);
     await mongoose.connect('mongodb://localhost:27017/votos-local');
  
      console.log('se conecto exitosamente');    
  } catch (error) {
 
    console.log(error);
    console.log('no se  CONECTO');
    throw new Error('Error a  la hora de conectar la base de datos Votos');

  }

}

module.exports = {
  dbConnections
}