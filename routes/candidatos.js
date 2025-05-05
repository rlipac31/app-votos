const { Router } = require('express');
const { check } = require('express-validator');
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
      const arichivosPermitidos = ['image/jpeg', 'image/svg+xml', 'image/webp', 'image/png', 'image/svg'];
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
const {  validarJWT } = require('../middleware/validarJWT');
const { validarCampos } = require('../middleware/validar-campos');
const { esAdminRole } = require('../middleware/validar-role');


const router = Router();


router.get('/', listarCandidatos);
router.get('/:id', candidatoId );//ss
router.post('/',[
    validarJWT,
    esAdminRole,
    validarCampos
], upload.single('imagen.url'), guardarCandidatos);

/* router.put('/:id', validarJWT , upload.single('political_party.imgeUrl'), actualizarCandidato); */
router.patch('/:id', upload.single('imagen.url'), actualizarCandidato);
router.delete('/:id', validarJWT, deleteCandidato);




module.exports= router;
