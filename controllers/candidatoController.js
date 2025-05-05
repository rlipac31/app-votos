const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer')
/* const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public/uploads'); //correcionn para serviicio nube Render

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
} */
const upload = multer({ dest: 'api/uploads' })

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

  console.log('saave canddiato')
  if (!req.file) {
    return res.status(401).send('Error: Tipo de archivo no permitido.');
  }
  console.log('file ...',req.file); // Aquí deberías obtener el archivo
  const { originalname, path } = req.file;

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
    //
const imagen = {
   url: optimizeUrl,
   alt: uploadResult.public_id
}

  

    const { ...data } = req.body;

    console.log('data ....', data, 'imageenesn  ...', imagen);

    const candidato = new Candidato({
      ...data,
      imagen
    })

    console.log('candidato: ', candidato);
  
         const candidateSave = await candidato.save();

            if (candidateSave) {
              res.json({
                msg: 'se gurado candidaaato correctamente',
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
  console.log('Updatecandidato  ok')
  const { id } = req.params;
  console.log( ' el id =>', id);
  const {_id,  ...resto } = req.body;
//  console.log( ' el rresto =>', resto);
  if (!req.file) {
 
      try {
      
        const candidato = await Candidato.findByIdAndUpdate(id, resto,  { new: true, runValidators: true }
        );
        console.log(candidato);
       // const candidatoUpdate = await Candidato.findById(id);
       return res.json({ candidato });
      } catch (error) {
        console.log(error)
      return  res.json({ msg: error })
      }
   
  }
  //fin
  try {
    const { originalname, path } = req.file;
   // console.log('uodaate reqq.file', originalname, path);
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
    console.log(req.file);
  /*   console.log(req.file); // Aquí deberías obtener el archivo
      const political_party  ={
      imgeUrl: optimizeUrl
     
    } */
      const imagen ={
        url: optimizeUrl,
        alt: uploadResult.public_id
       
      }
    console.log('upload', uploadResult, 'optimise ', optimizeUrl);
    const candidatoUpdate= {...resto, imagen};
      console.log('updateCandidato =>>>>',candidatoUpdate);
      const candidatoUp = await Candidato.updateOne(
      { _id: id },
      candidatoUpdate,
      {new: true }
  
    );
  
   return res.status(200).json({ candidatoUp }); 
  } catch (error) {
     console.log(error)
      return  res.status(400).json({ msg: error })
  }
 

  //validar password por base de datos


  
}
const imgePartidoCandidatoUpdate = async (req = request, res = response) => {
  const { originalname, path } = req.file;
  if (!req.file) {
    return res.status(401).send('Error: Tipo de archivo no permitido.');
  }
  console.log(' req.file: ', req.file); // Aquí deberías obtener el archivo

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
console.log('elimminaar candidaato');
   try {
    const { id } = req.params;
    const candidato = await Candidato.updateOne(
      { _id: id },
      { state: false },
      {new: true }
  
    );
    //console.log(usuaiosAutenticado);
    return res.status(200).json({
      candidato

    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
     msg: error

    });
    
  }
}


module.exports = {
  listarCandidatos,
  guardarCandidatos,
  actualizarCandidato,
  deleteCandidato,
  candidatoId
}