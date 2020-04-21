const Materia = require("../models/Materia");

exports.obtenerMaterias =  (idUsuario) => {
    return  Materia.find ({creador: idUsuario});
}

exports.getById = (idMateria) => {
    return Materia.findById(idMateria);
}

exports.actualizar = (materia, nuevaMateria) => {
   return Materia.findOneAndUpdate({_id: materia.id.toString()}, {$set: nuevaMateria}, {new: true});
}

exports.eliminar = (materia) => {
    return Materia.findOneAndRemove({_id: materia.id});
}