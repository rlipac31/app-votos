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
                  firstName: "$$candidate.name.firstName",
                  paternalSurname: "$$candidate.surname.paternal_surname",
                  candidateImageUrl: "$$candidate.candidate_imageUrl"
                }
              }
            },
            0
          ]
        }
      }
    }
  ])



  res.status(200).json(resultadoVotos);


}


const saveVotos = async (req = request, res = response) => {

  const { candidatoId } = req.params;
  const { identity } = req.body;

  const voto = new Voto({ identity, candidatoId });

  try {

    const votacion = await voto.save();
    if (votacion) {
      res.json({
        msg: 'Guaradar votacion corectamente',
        votacion
      });
    } else {
      res.status(401).json({
        msg: 'no se pudo guardar'
      })
    }


  } catch (error) {
    console.log(error)
    res.json({ msg: 'Error NO se guardo en la bd' })
  }
}

module.exports = {
  saveVotos,
  listarVotos,
  conteoVotos

} 