
import { request, response } from 'express';
import { validationResult } from 'express-validator';
 
export const validarCampos = ( req, res, next )=>{

    const errors = validationResult(req);// genera un aarreglo de erros del reques y lo muestra cuando ocurra un error
      if(!errors.isEmpty()){
        return res.status(400).json({ errors, msg:' de validar campos '});
      }
      next();
}

