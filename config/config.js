const bcryptjs = require('bcryptjs');


const User = require('../models/Usuario');

//coloreaa la  consola  
const  colors = require('colors');
const crearUserdmin = async () => {
  console.log('crando usuario')
  const usuarioAdminExistente = await User.findOne({ email: process.env.EMAIL_ADMIN });
  if(usuarioAdminExistente){
    if(!usuarioAdminExistente.state){
    return   console.log(colors.bgBrightCyan.black('usuario inabhilitado" .'));
    }
    return   console.log(colors.bgBrightCyan.black('usuario administrador ya existe .'));
  }
     // const password = process.env.USER_PASSWORD;
      const nuevoUsuario = new User({
          email: process.env.EMAIL_ADMIN,
          password: process.env.USER_PASSWORD, // Recuerda encriptar las contraseñas
          role: 'ADMIN_ROLE'
      });
      //haseando passworrdsss
      const salt = bcryptjs.genSaltSync();//salt de 10 vueltas por defaults
      nuevoUsuario.password = bcryptjs.hashSync(nuevoUsuario.password, salt); 
      await nuevoUsuario.save();
  // console.log('Usuario administrador creado exitosamente.');
      console.log(colors.bgGreen.black(' USUARIO creado EXITOSAMENTE.'));
      

    }

module.exports = {
    crearUserdmin
}