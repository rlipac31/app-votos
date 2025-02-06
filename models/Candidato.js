const { Schema, model } = require('mongoose');


CandidatoSchema = Schema({
  name: {
    firstName: { type: String, required: [true, 'el seegundo nom es requerido'] },
    lastName: { type: String }
  },

  surname: {
    paternal_surname: { type: String, required: [true, 'el apellido paaterno es requerido'] },
    maternal_surname: { type: String }
  },

  candidate_image: { type: String, required: [true, 'La imagen del Politico es requerida'] },

  political_party: {
    name: { type: String, required: [true, 'el apellido paaterno es requerido'] },
    image: { type: String }
  },

  biography: { type: String, required: [true, 'La biografia del candidato es requerido'] },

  charges: { type: String },

  Highlights: { type: String },
  
  state:{ type:Boolean, default:true }

});

module.exports= model('Candidato', CandidatoSchema);