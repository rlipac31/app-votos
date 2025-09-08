const { Router } = require('express');
const { check } = require('express-validator');

//middlewares

const { validarCampos } = require('../middleware/validar-campos');

//helpers 
const { validarDNILocal } = require('../helpers/regex');
const { yaVoto, canditatoExiste } = require('../helpers/db-validators');

const { saveVotos, listarVotos, conteoVotos, resultCandidatos } = require('../controllers/votoController');



const router = Router();

router.get('/resultados', resultCandidatos );
router.get('/total-votos', listarVotos );

router.get('/result-votos', conteoVotos );

router.post('/:candidatoId',[
      check('candidatoId','el id del candidato esta en blanco').not().isEmpty(),
      check('candidatoId',' no es un un candidato valido o no  existe el la  BD').isMongoId(),
      check('candidatoId').custom(canditatoExiste),
      check('identity').custom(yaVoto),
      validarCampos
    //  check('identity').custom(validarDNILocal),
     
    ],
  saveVotos );




module.exports=router;