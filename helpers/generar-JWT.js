

import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {// el uid es el id que le pasamos co el uuario

  return new Promise((resolve, reject) => {

    const payload = { uid };// recibe uid de un objeto tipo payload

    jwt.sign(payload, process.env.PRIVATE_KEY_WORD, {// le pasamos el payload, la palabra secreta y las aciones a ahcer com0o un objeto {}

      expiresIn: '6h'// pueden ser segundos minuto horas o dias

    }, (err, token) => {
      if(err) {
        console.log(err);
        reject(' nose pudo generar token');

      } else {
        resolve(token);
      }
    })

  })

}

