const materiaDAO = require('../dao/MateriaDAO');

exports.obtenerMaterias = (idUsuario) => {
    return materiaDAO.obtenerMaterias(idUsuario);
}

exports.getById = (idMateria) => {
    return materiaDAO.getById(idMateria);
}

exports.tienePermisos = (idCreador, idLogueado) => {
    if(idCreador.toString() === idLogueado) return true;
}

exports.llenar = (body) =>{
    const nuevaMateria = {};
    
    nuevaMateria.nombre = body.nombre;
    return nuevaMateria;
}

exports.actualizar = (materia, nuevaMateria) => {
    return materiaDAO.actualizar(materia, nuevaMateria);
}

exports.eliminar = (materia) => {
    return materiaDAO.eliminar(materia);
}