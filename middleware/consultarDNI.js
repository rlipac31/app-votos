// archivo: consultarDNI.js

import fetch from 'node-fetch';
/* 
export  async function consultarDNI(dni) {
  const token = process.env.TOKEN_CONSULTA_DNI;
  const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;
  const newurl='https://apiperu.dev/api/dni';

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
 */
/* consultarDNI('46027897')
  .then(data => console.log(data))
  .catch(err => console.error(err)); */



const fetchDataFromApiPeru = async (dni, token) => {
    const url = 'https://apiperu.dev/api/dni';
    
    const params = {
        dni: dni
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
          //  throw new Error(`Error HTTP: ${response.status}`);
            console.log('error en servicio consulta dni', response.status)// 
        }

        const data = await response.json();
       // console.log('data fetchDataFromApiPeru funcion madre : ', data);
        return data;
    } catch (error) {
        // console.error('Error en la solicitud:', error);
        throw error;
    }
};

// Ejemplo de uso
export const consultarDNI = async (dni) => {
    try {
        const token = process.env.TOKEN_CONSULTA_DNI;
        
        const resultado = await fetchDataFromApiPeru(dni, token);
       // console.log('Respuesta de la API DNI :', resultado);
        return resultado;
    } catch (error) {
        console.error('Error al consultar DNI:', error);
    }
};

// Ejecutar consulta
//consultarDNI(11111111);




















//api.net.peru-token:apis-token-15091.YMfday3IixETfjPdPfWDYSZcozW4uQ5H