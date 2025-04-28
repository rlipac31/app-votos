const { response, request } = require('express');


// importando Modelo
const Voto = require('../models/Voto');
const Candidato = require('../models/Candidate');

const listarVotos = async (req = request, res = response) => {

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

const conteoVotos = async (req = request, res = response) => {

  //agretate para agrupar,$group para buscar grupo { count: cuenta documentos, $suma y multiplica por 1 el resultado}

  const resultadoVotos = await Voto.aggregate([
    {
      $group: {//agrupa
        _id: "$candidatoId",
        totalVotes: { $sum: 1 }// suma los votos que conicidan con el candidateId
      }
    },
    {
      $lookup: {//buscar y hace un join de las tablas con id local y id foranea
        from: "candidatos",//tabla canddidatos
        localField: "_id",//campo local
        foreignField: "_id",//campo foraneo
        as: "candidateDetails" //como
      }
    },
    {
      $project: {
        totalVotes: 1,
        candidateDetails: {//crea un objeto con la informacion solicitada
          $arrayElemAt: [//crea un elemento del array soliccitado
            {
              $map: {// recorre el arrray
                input: "$candidateDetails",
                as: "candidate",
                in: {// muesttra los datoss solicitados
                  firstName: "$$candidate.nameCandidato.firstName",
                  paternalSurname: "$$candidate.surname.paternal",
                  candidateImageUrl: "$$candidate.imagen.url"
                }
              }
            },
            0
          ]
        }
      }
    }
  ])

  let  votosCandidato = resultadoVotos.map(row=>row.totalVotes)
  let nameCandidatos = resultadoVotos.map(row => row.candidateDetails.firstName)


  res.status(200).json({
    votosCandidato,
    nameCandidatos,
    resultadoVotos

  });


}

const saveVotos = async (req = request, res = response) => {

  const { candidatoId } = req.params;
  const { identity, localidad } = req.body;

  const voto = new Voto({ identity, localidad, candidatoId });

  try {

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
    res.json({ msg: 'Error NO se guardo en la bd' })
  }
}

///


const  resultCandidatos = async (req, res) => {
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


module.exports = {
  resultCandidatos,
  saveVotos,
  listarVotos,
  conteoVotos

} 