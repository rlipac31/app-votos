const { Router } = require('express');

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
router.post('/', guardarUsuarios);
router.patch('/:id', actualizarUsuarios);
router.delete('/:id', borrandoUsuarios);





module.exports = router;
