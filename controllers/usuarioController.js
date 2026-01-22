import {request, response} from 'express';
import bcryptjs from 'bcryptjs';

// importando Modelo


import Usuario from '../models/Usuario.js';

import { usuarioExiste  } from '../helpers/db-validators.js';



export const listarUsuarios = async (req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };


  const [totalUsuarios, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))

  ])

  try {

    res.json({ totalUsuarios, usuarios });
  } catch (error) {
    console.log(error)
    res.json({ msg: error })
  }
}

export const guardarUsuarios = async (req = request, res = response) => {

  const { name, email, password, role, age, cyti, avatarImg } = req.body;
  const usuario = new Usuario({ name, email, password, role, age, cyti, avatarImg });

  // ENCRIPTANDO CONTRASEÑA
  const salt = bcryptjs.genSaltSync();//salt de 10 po default
  usuario.password = bcryptjs.hashSync(password, salt);
  try {

    const usuarioSave = await usuario.save();
    if (usuarioSave) {
      res.json({
        msg: 'Guaradar usuarios corectamente',
        usuarioSave
      });
    } else {
      res.status(401).json({
        msg: 'no sse pudo guardar'
      })
    }


  } catch (error) {
    console.log(error)
    res.json({ msg: 'Error NO se guardo en la bd' })
  }
}

export const actualizarUsuarios = async(req = request, res = response) => {

  const { id }= req.params;

  const { _id, role, password, ...resto } = req.body;
  //validar password por base de datos
  

  try {
    if( password ){
      const salt = await bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
  
    }
    const usuario = await Usuario.findByIdAndUpdate( id , resto );
    const usuarioUpdate = await Usuario.findById(id);
    

    res.json({ usuarioUpdate });
  } catch (error) {
    console.log(error)
    res.json({ msg: error })
  }
}

export const borrandoUsuarios = async(req = request, res = response) => {
  
    try {
      const { id  } = req.params;
      const usuario = await Usuario.findByIdAndUpdate( id, { state: false } );
      const  usuarioEliminado = await Usuario.findById(id);
      //console.log(usuaiosAutenticado);
      return res.json({
        usuarioEliminado
      
      });
  }catch (error) {
      console.log(error);         
  }
}


