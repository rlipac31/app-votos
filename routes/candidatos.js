const { Router } = require('express');

const {

      listarCandidatos,
      guardarCandidatos
} = require('../controllers/candidatoController');
const { listarUsuarios } = require('../controllers/usuarioController');


const router = Router();


router.get('/', listarCandidatos)
router.post('/', guardarCandidatos);



module.exports= router;
