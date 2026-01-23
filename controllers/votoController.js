import { request, response } from 'express';

// importando Modelo


import Voto from '../models/Voto.js';
import Candidato from '../models/Candidate.js';

//const { consultarDNI }= require('../middleware/consultarDNI')

export const listarVotos = async (req = request, res = response) => {

  try {

    const votos = await Voto.find();
    //where({ candidatoId: '67ad5f0366ffb3a9ea7ae211'})
    // populate('candidatoId', 'name surname')
    const totalVotos = votos.length;
    return res.json({
      msg: 'votos',
      totalVotos,
      votos
    });
  } catch (error) {
    console.log(error);
  }

}

export const conteoVotos = async (req = request, res = response) => {

  //agretate para agrupar,$group para buscar grupo { count: cuenta documentos, $suma y multiplica por 1 el resultado}

  const resultadoVotos = await Voto.aggregate([
  {
    $lookup: {
      from: "candidatos",
      localField: "candidatoId",
      foreignField: "_id",
      as: "candidateInfo"
    }
  },
  {
    $match: {
      "candidateInfo.state": true
    }
  },
  {
    $group: {
      _id: "$candidatoId",
      totalVotes: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "candidatos",
      localField: "_id",
      foreignField: "_id",
      as: "candidateDetails"
    }
  },
  {
    $match: {
      "candidateDetails.state": true
    }
  },
  {
    $project: {
      totalVotes: 1,
      candidateDetails: {
        $arrayElemAt: [
          {
            $map: {
              input: "$candidateDetails",
              as: "candidate",
              in: {
                nameCandidatos: "$$candidate.nameCandidato",
                Surname: "$$candidate.surname",
                candidateImageUrl: "$$candidate.imagen.url"
              }
            }
          },
          0
        ]
      }
    }
  }
]);

  let  votosCandidato = resultadoVotos.map(row=>row.totalVotes)
// Usa map para crear un nuevo array 'listaCandidatos'
const nameCandidatos = resultadoVotos.map(candidato => {
    // Para cada candidato, devolvemos un nuevo objeto con el formato deseado
    return {
        nombre: candidato.candidateDetails.nameCandidatos,
        apellido: candidato.candidateDetails.Surname
    };
});

  res.status(200).json({
    votosCandidato,
    nameCandidatos,
    resultadoVotos

  });


}

export const saveVotos = async (req = request, res = response) => {

  const { candidatoId } = req.params;
  const { identity, localidad } = req.body;
  try {
  // Ejemplo de uso:// servicio caido
  /*   const dniValido = await consultarDNI(identity)//valida desde uuna api externa si el dni existe o nos
        .then(data => console.log(data))
        .catch(err => res.status(403).json({
            msg: err
          }) );
        if(!dniValido || !dniValido.nombres){
          return res.status(403).json({
            msg:"Inggresa un DNI Real"
          })
        } */
      
  const voto = new Voto({ identity, localidad, candidatoId });
    const votacion = await voto.save();
    if (votacion) {
    return  res.json({
        msg: 'Guaradar votacion corectamente',
        votacion
      });
    } else {
    return  res.status(401).json({
        msg: 'no se pudo guardar'
      })
    }
  } catch (error) {
  return  console.log(error)
    //res.json({ msg: 'Error NO se guardo en la bd' })
  }
}

///


export const  resultCandidatos = async (req, res) => {
  try {
    const candidatos = await Candidato.aggregate([
      {
        $lookup: {
          from: 'votos', // Nombre de la colección de votos
          localField: '_id',
          foreignField: 'candidatoId',
          as: 'total_votos'
        }
      },
      {
        $addFields: {
          cantidad_votos: { $size: '$total_votos' } // Cuenta los votos
        }
      },
      {
        $sort: { cantidad_votos: -1 } // Orden descendente (mayor número de votos primero)
      }
    ]);
    
    console.log('Lista de candidatos ordenados:', candidatos);
   // const votos = candidatos.map(item => item.totalvotos);
    return res.status(200).json({
      candidatos,
     // votos
    })
  } catch (error) {
    console.error('Error al obtener los candidatos:', error);
  }
}

// Llamada a la función

