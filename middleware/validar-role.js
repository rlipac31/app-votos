const esAdminRole = (req, res, next)=>{

 
    if(!req.usuario ){
      return res.status(500).json({
        msg: ' see  requieree verificar el JsonWeb Token Primero'
    } )

  }

  const { role, email } = req.usuario;
  if( role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: ' see  requieree ser Administrador '
  })
  }
next();
}

const tieneRol = (req, res, next)=>{
  if(!req.usuario ){
    return res.status(500).json({
      msg: ' primmero  tiene  que loguearse  para generar su token'
  } )

}

const { role, email } = req.usuario;
    if( role !=='ADMIN_ROLE' &&  role !=='COLABORADOR' ){
        console.log('ver rol =>> ', req.usuario);
        return res.status(401).json({
          msg: ' see  requiere tener un rol  usuario o admin '  
      } )
    }
  next();

}

module.exports ={
    esAdminRole,
    tieneRol
  }