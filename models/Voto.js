const { Schema, model } = require('mongoose');

VotoSchema = Schema({
  identity: {
    type: String,
    unique: true,
    required: [true, 'El documento de indetidad es requerido ']
  },
  candidatoId: {
    type: Schema.Types.ObjectId,
    ref: 'Candidato',
    required: true
  },

}, { timestamps: true });

module.exports = model('Voto', VotoSchema);