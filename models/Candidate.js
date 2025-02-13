const { Schema, model } = require('mongoose');


CandidatoSchema = Schema({
  name: {
    firstName: { type: String, required: [true, 'el primer nombre es requerido'] },
    lastName: { type: String }
  },
  surname: {
    paternal_surname: { type: String, required: [true, 'el apellido paaterno es requerido'] },
    maternal_surname: { type: String }
  },
  candidate_imageUrl: { type: String, required: [true, 'La imagen del Politico es requerida'] },

  political_party: {
    name: { type: String, required: [true, 'el nombre del parttido  es requerido'] },
    imageUrl: { type: String }
  },
  biography: {
    reseña: { type: String, required: [true, 'La biografia del candidato es requerido'] },
    link_wiki: { type: String, }
  },
  //votos: [{ type: String }],

 votos: {
    type: Schema.Types.ObjectId,
    ref: 'Voto'
  }, 
  state: { type: Boolean, default: true }

});

//metodoos
CandidatoSchema.methods.toJSON = function () {
  const { __v, ...candidate } = this.toObject();

  return candidate;
}


module.exports = model('Candidato', CandidatoSchema);