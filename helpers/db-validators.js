const Usuario = require('../models/Usuario');
const Voto = require('../models/Voto');
const Candidato = require('../models/Candidate');



const emailYaExiste = async(email)=>{
  //validar si email ya existe en laa base de datos

  const emailExiste = await Usuario.findOne({ email });
  if( emailExiste ){
    throw new Error(` el correo: ${email} ya esta registrado en la base de datos`);

  }
}

const usuarioExiste = async(id) => {
  //verificar si usuario existe con el id
  const usuarioIdExiste = await Usuario.findById( id );
  if(!usuarioIdExiste){
    throw new Error(`el id :  ${ id } no esta registrado en la BD`)
  }
}

const usuarioStateFalse = async(id)=> {
  const usuarioActivo = await Usuario.findById( id );
    if(usuarioActivo.state === false ){
      throw new Error(`el usuario :  ${ userIdExiste.email } no esta habilitado`);
    }
}


const yaVoto = async(identity)=>{
  
  //validar si email ya existe en laa base de datos

  const votoExiste = await Voto.findOne({ identity });
  if( votoExiste ){
    throw new Error(` el DNI: ${identity} ya voto `);

  }
}

const canditatoExiste = async(candidatoId) => {
  //verificar si canditato existe con el id
  const canditatoIdExiste = await Candidato.findById( candidatoId );
  if(!canditatoIdExiste){
    throw new Error(`el candidato  :  ${ id } no esta registrado en la BD`)
  }
  
}


module.exports = {
  emailYaExiste,
  usuarioExiste,
  usuarioStateFalse,
  yaVoto,
  canditatoExiste
 
}