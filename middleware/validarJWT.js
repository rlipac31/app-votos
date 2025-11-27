const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const validarJWT = async (req = request, res = response, next) => {

  const token = req.header('token');
  

  try {
    if (!token) {
      return res.status(401).json({
        msg: 'No hay tokenn en la peticion'
      });
    }

    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY_WORD);
  
  //pasamoms el  uid del ussuario logueado al la request
    const usuario = await Usuario.findById(uid);
    req.usuario = usuario;
    if (!usuario) {
      return res.json({
        msg: ' Token no valido - usuario no exist en BD'
      })
    }

    if (!usuario.state) {
      return res.json({
        msg: ' Token no valido - usuario inactivo '
      })
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'enctro al catch...huboo un error'
    });
  }


  next();
//
}

module.exports = {
  validarJWT
}