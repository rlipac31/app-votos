const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

// importando Modelo
const Candidato = require('../models/Candidate');
//const { usuarioExiste } = require('../helpers/db-validators');

const listarCandidatos = async (req = request, res = response) => {

  const { limite = 6, desde = 0 } = req.query;
  const query = { state: true };


  const [totalCandidatos, candidatos] = await Promise.all([
    Candidato.countDocuments(query),
    Candidato.find(query)
      .skip(Number(desde))
      .limit(Number(limite))

  ])

  try {

    res.json({
      totalCandidatos,
      candidatos
    });
  } catch (error) {
    console.log(error)
    res.json({ msg: error })
  }
}

const guardarCandidatos = async (req = request, res = response) => {

  const { name,
          surname,
          candidate_imageUrl,
          political_party,
          biography
        } = req.body;
  const usuario = new Candidato({ name,
                                surname,
                                candidate_imageUrl,
                                political_party,
                                biography,
                              });


  try {

    const candidateSave = await usuario.save();
    if (candidateSave) {
      res.json({
        msg: 'Guaradar usuarios corectamente',
        candidateSave
      });
    } else {
      res.status(401).json({
        msg: 'no sse pudo guardar'
      })
    }


  } catch (error) {
    console.log(error)
    res.json({ msg: 'Error NO se guardo en la bd' })
  }
}

/* const actualizarUsuarios = async(req = request, res = response) => {

  const { id }= req.params;
  console.log(id + ' el id =><>');
  const { _id, role, password, ...resto } = req.body;
  //validar password por base de datos
  

  try {
    if( password ){
      const salt = await bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
  
    }
    const usuario = await Usuario.findByIdAndUpdate( id , resto );
    const usuarioUpdate = await Usuario.findById(id);
    

    res.json({ usuarioUpdate });
  } catch (error) {
    console.log(error)
    res.json({ msg: error })
  }
}

const borrandoUsuarios = async(req = request, res = response) => {
  
  try {
    const { id  } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { state: false } );
    const  usuarioEliminado = await Usuario.findById(id);
    //console.log(usuaiosAutenticado);
    return res.json({
       usuarioEliminado
     
    });
}catch (error) {
    console.log(error);         
}
} 
 */

module.exports = {
 listarCandidatos,
 guardarCandidatos
}