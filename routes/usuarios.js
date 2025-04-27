const { Router } = require('express');
const { check } = require('express-validator');


//middlewares

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validarJWT');

//helpers

const { emailYaExiste, usuarioExiste, usuarioStateFalse } = require('../helpers/db-validators');
const { validarNombreUsuario } = require('../helpers/regex')

//controllers

const {
  listarUsuarios,
  guardarUsuarios,
  actualizarUsuarios,
  borrandoUsuarios
} = require('../controllers/usuarioController');



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
  //validarJWT,
  check('id', 'no es un id valido de mongoDB').isMongoId(),
  check('id').custom(usuarioExiste),
  check('id').custom(usuarioStateFalse),
 // validarCampos
], borrandoUsuarios);





module.exports = router;
