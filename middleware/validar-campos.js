
import { request, response } from 'express';
import { validationResult } from 'express-validator';
/*  
export const validarCampos = ( req, res, next )=>{

    const errors = validationResult(req);// genera un aarreglo de erros del reques y lo muestra cuando ocurra un error
      if(!errors.isEmpty()){
        console.log("errores de validacion de campos ::: ",  errors);
        const mensageError= errors[0]?.msg;
        console.log("mensaje de error es ::: ",  mensageError);
        return res.status(400).json({ errors, msg: `hay errores en la validacion de los campos : ${mensageError}`});
      }
      next();
} */

export const validarCampos = ( req, res, next )=>{

    // 1. Obtiene el objeto de resultado
    const validationErrors = validationResult(req); 
      
    // 2. Comprueba si el objeto está vacío usando isEmpty()
    if(!validationErrors.isEmpty()){
        console.log("errores de validacion de campos ::: ",  validationErrors);

        // 3. Convierte el objeto a un array de errores
        const errorsArray = validationErrors.array(); 
        
        // 4. Accede al primer elemento del array y a su propiedad 'msg'
        const mensageError = errorsArray[0].msg; 
        
        console.log("mensaje de error es ::: ",  mensageError);
        
        // Devuelve la respuesta, incluyendo el array completo de errores si lo deseas
        return res.status(400).json({ 
            errors: errorsArray, 
            msg: `hay errores en la validacion de los campos : ${mensageError}`
        });
    }
    
    // Si no hay errores, continúa con el siguiente middleware/controlador
    next();
}
