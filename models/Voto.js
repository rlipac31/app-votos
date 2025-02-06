const { Schema, model } = require('mongoose');

VotoSchema = Schema({
  identity:{ type:String, required:[true, 'El documento de indetidad es requerido ']},
  voto:{ type:String, required:[true, 'Su Voto es obligatorio para poder registrarlo']},
  
},{ timestamps: true });

module.exports = model( 'Voto', VotoSchema );