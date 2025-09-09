// archivo: consultarDNI.js

const fetch = require('node-fetch');

async function consultarDNI(dni) {
  const token = process.env.TOKEN_CONSULTA_DNI;
  const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log(`error en servicio consulta dni`)// servicio caido al 8 setiembre 2025
    throw new Error('Error en la consulta DNI');
  }

  const data = await response.json();
  return data;
}

/* consultarDNI('46027897')
  .then(data => console.log(data))
  .catch(err => console.error(err)); */
  
  module.exports={
  consultarDNI
} 
//






















//api.net.peru-token:apis-token-15091.YMfday3IixETfjPdPfWDYSZcozW4uQ5H