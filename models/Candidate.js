const { Schema, model } = require('mongoose');


CandidatoSchema = Schema({
  nameCandidato: {
    firstName: { type: String, required: [true, 'el primer nombre es requerido'] },
    lastName: { type: String }
  },
  surname: {
    paternal: { type: String, required: [true, 'el apellido paaterno es requerido'] },
    maternal: { type: String }
  },
  /* imagen: {
     alt:{type:String},
     url:{
      cardImage:{type:String},
      fullImage:{type:String}
      }
  }, */
  imagen: {
    url:{type:String},
    alt:{type:String}
   
 },
  political_party: {
    name: { type: String, required: [true, 'el nombre del parttido  es requerido'] },
    imgeUrl: { type: String }
  },
  biography: {
    resumenBio: { type: String, required: [true, 'La biografia del candidato es requerido'] },
    link_wiki: { type: String, }
  },
  //votos: [{ type: String }],

 votos: {
    type: Schema.Types.ObjectId,
    ref: 'Voto'
  }, 
  state: { type: Boolean, default: true}

});

//metodoos
CandidatoSchema.methods.toJSON = function () {
  const { __v, ...candidate } = this.toObject();

  return candidate;
}


module.exports = model('Candidato', CandidatoSchema);