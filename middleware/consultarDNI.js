// archivo: consultarDNI.js

const fetch = require('node-fetch');

async function consultarDNI(dni) {
  const token = 'apis-token-15091.YMfday3IixETfjPdPfWDYSZcozW4uQ5H';
  const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
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