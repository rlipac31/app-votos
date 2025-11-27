const { Router } = require('express');
const { check } = require('express-validator');

// middlewwares
const { validarCampos } = require('../middleware/validar-campos')


const { login } = require('../controllers/authController');


const router = Router();

//login User

router.post('/login',[

  check('email', 'emaail no valido').isEmail(),
  check('password', 'inserte una contraseña').not().isEmpty(),
  validarCampos

], login);

module.exports = router;