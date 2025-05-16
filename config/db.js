const mongoose = require('mongoose');
/* 
 const dbConnections = async () => {

  try {

    await mongoose.connect( process.env.CONECCTION_BD );
   //await mongoose.connect(process.env.CONECCTION_BD_LOCAL);
       
      console.log('se conecto exitosamente LOCAL');    
  } catch (error) {
 
    console.log(error);
    console.log('no se  CONECTO');
    throw new Error('Error a  la hora de conectar la base de datos Votos');

  }

} */


 const dbConnections = async () => {
  try {
    let connected = false;
    const cloudConnectionString = process.env.CONECCTION_BD;
    const localConnectionString = process.env.CONECCTION_BD_LOCAL;

    if (cloudConnectionString) {
      try {
        await mongoose.connect(cloudConnectionString, { serverSelectionTimeoutMS: 3000 }); // Timeout más corto
        console.log('Conexión exitosa a la base de datos en la nube');
        connected = true;
      } catch (cloudError) {
        console.error('Error al conectar a la base de datos en la nube:', cloudError);
        console.log('Intentando conectar a la base de datos local...');
        if (localConnectionString) {
          try {
            await mongoose.connect(localConnectionString, { serverSelectionTimeoutMS: 3000 }); // Timeout más corto
            console.log('Conexión exitosa a la base de datos local');
            connected = true;
          } catch (localError) {
            console.error('Error al conectar a la base de datos local:', localError);
          }
        }
      }
    } else if (localConnectionString) {
      try {
        await mongoose.connect(localConnectionString, { serverSelectionTimeoutMS: 3000 }); // Timeout más corto
        console.log('Conexión exitosa a la base de datos local');
        connected = true;
      } catch (localError) {
        console.error('Error al conectar a la base de datos local:', localError);
      }
    }

    if (!connected) {
      throw new Error('No se pudo conectar a ninguna de las bases de datos');
    }

  } catch (error) {
    console.error(error);
    throw new Error('Error general durante la conexión a la base de datos');
  }
}



module.exports = {
  dbConnections
}