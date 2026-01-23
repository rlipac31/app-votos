
import { Router } from 'express';
import { check } from 'express-validator';

//middlewares
import { votarLimiter } from '../middleware/limiter-peticion.js'
import { validarCampos } from '../middleware/validar-campos.js';

//import { validarDNILocal } from '../helpers/regex';
import { yaVoto, canditatoExiste } from '../helpers/db-validators.js';
import { saveVotos, listarVotos, conteoVotos, resultCandidatos } from '../controllers/votoController.js';



const router = Router();

router.get('/resultados', resultCandidatos );
router.get('/total-votos', listarVotos );

router.get('/result-votos', conteoVotos );

router.post('/:candidatoId',
  votarLimiter,
   [
      check('candidatoId','el id del candidato esta en blanco').not().isEmpty(),
      check('candidatoId',' no es un un candidato valido o no  existe el la  BD').isMongoId(),
      check('candidatoId').custom(canditatoExiste),
      check('identity').custom(yaVoto),
      validarCampos
     
    ],
  saveVotos );


export default router;
