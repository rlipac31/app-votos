

import {request, response} from 'express';
import bcryptjs from 'bcryptjs';
//model
import Usuario from '../models/Usuario.js';

import { generarJWT } from '../helpers/generar-JWT.js';

export const login = async( req, res )=> {
  const { email, password } = req.body;

  try {
      // verificar si usuario existe
      const usuario = await Usuario.findOne({ email });
      if(!usuario){
          return res.status(400).json({
            msg:'usuario no existe'
        })
      }

      // verifica si usuario esta activo, es decir habilitado
      if(!usuario.state){
          return res.status(400).json({
            msg:'usuario y/o password no son correctos/// inacttivo= false'
        })
      }

      //verificar contraseña

      const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
              msg:`usuario y/o password no son correctos/// password '${password}' no valido`
          });

        }

      // generar token
      const token = await generarJWT( usuario.id );  

      // const uid= usuario._id;
      res.json({
        usuario,//modifcado desde model
      //  uid,//desde controller
        token
    })

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg:'hable con  el admnistradodr'
  })
  }

}

