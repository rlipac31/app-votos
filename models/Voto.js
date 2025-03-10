const { Schema, model } = require('mongoose');

VotoSchema = Schema({
  identity: {
    type: String,
    unique: true,
    required: [true, 'Para Validar tu voto re requiero un DNI Valido !pero tu identida se ecriptara y no se podra ver ni compartir con nadie']
  },
  localidad:{
    type:String,
    required: [true,  'La localidad donde resides en neesaria para las estadisticas de la aplicacion']
  },
  candidatoId: {
    type: Schema.Types.ObjectId,
    ref: 'Candidato',
    required: true
  },

}, { timestamps: true });

module.exports = model('Voto', VotoSchema);