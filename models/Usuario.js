const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
  name: {
    type: String,
    require: [true, 'El nombre de usuario es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El  email es obligatorio']
  },
  password: {
    type: String,
    require: [true, 'El password es obligatorio']
  },
  role: {
    type: String,
    required: [true, 'El rol es Requerido'],
    emun: ['ADMIN', 'COLABORADOR']
  },
  avatarImg: {
    type: String
  },
  age: {
    type: Number,
  },
  cyti: {
    type: String
  },
  state: { type: Boolean, default: true }

});

//metodoos
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}



module.exports = model('Usuario', UsuarioSchema);