const { validationResult } = require('express-validator');

const { request, response } = require('express');

const validarCampos = ( req, res, next )=>{

    const errors = validationResult(req);// genera un aarreglo de erros del reques y lo muestra cuando ocurra un error
      if(!errors.isEmpty()){
        return res.status(400).json({ errors, msg:' de validar campos '});
      }
      next();
}

module.exports = {
  validarCampos

}