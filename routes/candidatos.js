const { Router } = require('express');
const cloudinary = require('cloudinary').v2;
const  multer   =  require ( 'multer' );

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname);
      }
  });

// Función para filtrar archivos
const fileFilter = (req, file, cb) => {
      // Acepta solo archivos jpg, svg, webp y png
      const arichivosPermitidos = ['image/jpeg', 'image/svg+xml', 'image/webp', 'image/png'];
      if (arichivosPermitidos.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error('Tipo de archivo no permitido. Solo se permiten archivos JPG, SVG, WEBP y PNG.'), false);
      }
  };
  
  const upload = multer({ 
      storage: storage,
      fileFilter: fileFilter
  });

const {

      listarCandidatos,
      guardarCandidatos,
      actualizarCandidato,
      deleteCandidato,
      candidatoId
} = require('../controllers/candidatoController');

const router = Router();


router.get('/', listarCandidatos);
router.get('/:id', candidatoId )
router.post('/', upload.single('imagen.url'), guardarCandidatos);
router.patch('/:id', upload.single('political_party.imageUrl'), actualizarCandidato);
router.delete('/:id', deleteCandidato);




module.exports= router;
