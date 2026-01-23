

import Usuario from '../models/Usuario.js';
import Voto from '../models/Voto.js';
import Candidato from '../models/Candidate.js';




export const emailYaExiste = async(email)=>{
  //validar si email ya existe en laa base de datos

  const emailExiste = await Usuario.findOne({ email });
  if( emailExiste ){
    throw new Error(` el correo: ${email} ya esta registrado en la base de datos`);

  }
}

export const usuarioExiste = async(id) => {
  //verificar si usuario existe con el id
  const usuarioIdExiste = await Usuario.findById( id );
  if(!usuarioIdExiste){
    throw new Error(`el id :  ${ id } no esta registrado en la BD`)
  }
}

export const usuarioStateFalse = async(id)=> {
  const usuarioActivo = await Usuario.findById( id );
    if(usuarioActivo.state === false ){
      throw new Error(`el usuario :  ${ usuarioActivo.email } no esta habilitado`);
    }
}


export const yaVoto = async(identity)=>{
  
  //validar si email ya existe en laa base de datos

  const votoExiste = await Voto.findOne({ identity });
  console.log("desde helpers voto existe y es ::::  ", votoExiste);
  if( votoExiste ){
    throw new Error(` el DNI: ${identity} ya voto `);

  }
}

export const canditatoExiste = async(candidatoId) => {
  //verificar si canditato existe con el id
  const canditatoIdExiste = await Candidato.findById( candidatoId );
  if(!canditatoIdExiste){
    throw new Error(`el candidato  :  ${ id } no esta registrado en la BD`)
  }
  
}


