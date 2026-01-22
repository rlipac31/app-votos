
import { Router } from 'express';
import { check } from 'express-validator';

// middlewwares
import {login} from '../controllers/authController.js';

import { validarCampos } from '../middleware/validar-campos.js';


const router = Router();

//login User

router.post('/login',[

  check('email', 'emaail no valido').isEmail(),
  check('password', 'inserte una contraseña').not().isEmpty(),
  validarCampos

], login);

export default router;