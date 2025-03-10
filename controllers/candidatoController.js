const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const upload = multer({ dest: '/uploads/' })

cloudinary.config({
  cloud_name: 'rlipac',
  api_key: '841547412373225',
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});



// importando Modelo
const Candidato = require('../models/Candidate');
//const { usuarioExiste } = require('../helpers/db-validators');

const listarCandidatos = async (req = request, res = response) => {



  const { limite = 0, desde = 0 } = req.query;
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

      if (!req.file) {
       return res.status(401).send('Error: Tipo de archivo no permitido.');
    }
    console.log(req.file); // Aquí deberías obtener el archivo


  try {

    const { originalname, path } = req.file;

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
        path, {
        public_id: originalname,
      }
      )
      .catch((error) => {
        console.log('Error uploadResult: ', error);
      });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.url, {
      transformation: [
        {
          quality: 'auto'
        },
        {
          fetch_format: 'auto'
        }
      ]
    });

    const {
      ' nameCandidato.firstName': firstName,
      'surname.paternal': paternal,
      'imagen.alt': alt,
      ' biography.resumenBio': resumenBio,
      'political_party.name': name
    } = req.body;



    const nameCandidato = {
      firstName: firstName,
      lastName: ''
    }
    const surname = {
      paternal: paternal,
      maternal: ''
    }
    const imagen = {
      url: optimizeUrl,
      alt: uploadResult.public_id
    }
    const biography = {
      resumenBio: resumenBio,
      link_wiki: ''
    }
    const political_party = {
      name: name,
      url: ''
    }
    const candidato = new Candidato({
      nameCandidato,
      surname,
      imagen,
      political_party,
      biography,
    });

    console.log('candidato: ', candidato);

    const candidateSave = await candidato.save();

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

const candidatoId = async (req, res) => {
  const { id } = req.params;

  try {

    const candidato = await Candidato.findById(id)
    console.log(candidato);



    res.json({ candidato });
  } catch (error) {
    console.log(error)
    res.json({ msg: error })
  }
}



const actualizarCandidato = async (req = request, res = response) => {


  const { id } = req.params;
  console.log(id + ' el id =>');
  const { _id, ...resto } = req.body;
  console.log( req.body)

  //validar password por base de datos

 
  try {

    const candidato = await Candidato.findByIdAndUpdate(id, resto);
    console.log(candidato);
    const candidatoUpdate = await Candidato.findById(id);
    res.json({ candidatoUpdate });
  } catch (error) {
    console.log(error)
    res.json({ msg: error })
  }
} 
const imgePartidoCandidatoUpdate = async(req= request, res = response )=>{
  const { originalname, path } = req.file;
 if (!req.file) {
  return res.status(401).send('Error: Tipo de archivo no permitido.');
}
console.log(' req.file: ',req.file); // Aquí deberías obtener el archivo

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
        path, {
        public_id: originalname,
      }
      )
      .catch((error) => {
        console.log('Error uploadResult: ', error);
      });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.url, {
      transformation: [
        {
          quality: 'auto'
        },
        {
          fetch_format: 'auto'
        }
      ]
    });
 
     const political_party = {
      imagUrl: optimizeUrl,
    
    }
}


const deleteCandidato = async (req = request, res = response) => {

  try {
    const { id } = req.params;
    const candidato = await Candidato.findByIdAndUpdate(id, { state: false });
    const candidatoEliminado = await Candidato.findById(id);
    //console.log(usuaiosAutenticado);
    return res.json({
      candidatoEliminado

    });
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  listarCandidatos,
  guardarCandidatos,
  actualizarCandidato,
  deleteCandidato,
  candidatoId
}