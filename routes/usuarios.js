
import { Router } from 'express';
import { check } from 'express-validator';

//middlewares




import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { esAdminRole } from '../middleware/validar-role.js';
//helpers



import { emailYaExiste, usuarioExiste, usuarioStateFalse } from '../helpers/db-validators.js';
import { validarContrasena, validarNombreUsuario } from '../helpers/regex.js';

//controllers

import {
  listarUsuarios,
  guardarUsuarios,
  actualizarUsuarios,
  borrandoUsuarios
} from '../controllers/usuarioController.js';


const router = Router();


//listar usarios
router.get('/', listarUsuarios);

router.post('/', [
  check('name').custom(validarNombreUsuario),
  check('email').custom(emailYaExiste),
  // check('password').custom(validarContrasena),
  check('password', 'el password es obligatorio y tiene que tener al menos 6 caracteres').isLength({ min: 6 }),
  check('role', 'rol no valido').isIn(['ADMIN', 'COLABORADOR']),
  validarCampos
], guardarUsuarios);


router.put('/:id', [
  validarJWT,
  check('id', 'no es un id valido de mongoDB').isMongoId(),
  check('id').custom(usuarioExiste),
  check('id').custom(usuarioStateFalse),
  validarCampos
], actualizarUsuarios);

router.delete('/:id', [
  validarJWT,
  check('id', 'no es un id valido de mongoDB').isMongoId(),
  check('id').custom(usuarioExiste),
  check('id').custom(usuarioStateFalse),
 // validarCampos
], borrandoUsuarios);




export default router;
