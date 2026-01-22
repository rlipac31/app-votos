
import bcryptjs from 'bcryptjs';

import User from '../models/Usuario.js';

//coloreaa la  consola  
//const  colors = require('colors');
import colors from 'colors';

export const crearUserdmin = async () => {
  console.log('creando usuario.....---> ')
  const usuarioAdminExistente = await User.findOne({ email: process.env.EMAIL_ADMIN });
  if (usuarioAdminExistente) {
    if (!usuarioAdminExistente.state) {
      return console.log(colors.bgBrightCyan.black('usuario inabhilitado" .'));
    }
    return console.log(colors.bgBrightCyan.black('usuario administrador ya existe .'));
  }
  try {
    // const password = process.env.USER_PASSWORD;
    const nuevoUsuario = new User({
      email: process.env.EMAIL_ADMIN,
      role: process.env.USER_ROLE
    });
    const passwordAntes = process.env.USER_PASSWORD; // Recuerda encriptar las contraseñas
    //console.log('password antes de encriptar:" ', passwordAntes);
    //haseando passworrdsss
    const salt = bcryptjs.genSaltSync();//salt de 10 vueltas por defaults
    nuevoUsuario.password = bcryptjs.hashSync(passwordAntes, salt);
    await nuevoUsuario.save();
    // console.log('Usuario administrador creado exitosamente.');
    console.log(colors.bgGreen.white(' USUARIO creado EXITOSAMENTE.'));

  } catch (error) {
    return console.log(colors.bgRed.white('Error al crear el usuario administrador:', error));

  }



}
