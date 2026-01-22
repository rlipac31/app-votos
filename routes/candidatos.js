

import { Router } from 'express';

import { check } from 'express-validator';
import { v2 as  cloudinary} from 'cloudinary';
import multer from 'multer';


import {
    listarCandidatos,
    guardarCandidatos,
    actualizarCandidato,
    deleteCandidato,
    candidatoId,
    updateCandidatoImgeUrl
} from '../controllers/candidatoController.js';

import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { esAdminRole } from '../middleware/validar-role.js';


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



const router = Router();


router.get('/', listarCandidatos);
router.get('/:id', candidatoId );//ss
router.post('/',[
    validarJWT,
    esAdminRole,
   // validarCampos
], upload.single('imagen.url'), guardarCandidatos);

/* router.put('/:id', validarJWT , upload.single('political_party.imgeUrl'), actualizarCandidato); */

router.put('/update/:id', validarJWT, esAdminRole, updateCandidatoImgeUrl);
router.patch('/:id', upload.single('imagen.url'), actualizarCandidato);
router.delete('/:id', validarJWT, deleteCandidato);




export default router;
