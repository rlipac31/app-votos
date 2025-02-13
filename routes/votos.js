const { Router } = require('express');
const { check } = require('express-validator');

//middlewares

const { validarCampos } = require('../middleware/validar-campos');

//helpers 
const { validarDNILocal } = require('../helpers/regex');
const { yaVoto } = require('../helpers/db-validators');

const { saveVotos, listarVotos, conteoVotos } = require('../controllers/votoController');



const router = Router();


router.get('/total-votos', listarVotos );

router.get('/result-votos', conteoVotos );

router.post('/:candidatoId',[
      check('identity').custom(validarDNILocal),
      check('identity').custom(yaVoto),
      check('candidatoId',' no es un un candidato valido o no  existe el la  BD').isMongoId(),
      validarCampos
    ],
    
  saveVotos );




module.exports=router;