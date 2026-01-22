
// validar nombre usuario valido
let regex = /^[A-Za-z\d-]+$/;//expresion regular no permite caracteres especiales, pero si guiones nb numero

export  function validarNombreUsuario(nombre) {
  return regex.test(nombre);
} 

//validar password 8 digitos como minimo, almenos una mayuscula, un numero y un caracter esopecial

let regexPasword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

export function validarContrasena(password) {
   console.log('vvaallindanddo  passwoord... ')
  return regexPasword.test(password);
  // console.log('regexpasword ', regexPasword.test(password))
}


let regexDNI = /^[\d]{8}$/;

// validar DNI Peru solo 8 digitos solo numeros
export function validarDNILocal(identity){
  console.log('vvaallindanddo  dni... ', identity)
  const dniValido = regexDNI.test(identity);
  if(!dniValido){
    return console.log(dniValido)
  }
     return dniValido
  
 // return console.log('regexDNI ', regexDNI.test(password))
}
