const Tarea = require("../models/Tarea");

exports.guardar = (tarea) => {
    return tarea.save();
}

exports.obtenerTodas = (idMateria) => {
    return Tarea.find({idMateria}).sort({fechaCreacion: -1});
}

exports.getbyId = id => {
    return Tarea.findById(id);
}

exports.actualizar = (tarea, nuevaTarea) => {
    return Tarea.findOneAndUpdate({_id: tarea.id.toString()}, {$set: nuevaTarea}, {new: true});
 }

 exports.eliminar = tarea => {
     return Tarea.findOneAndRemove({_id: tarea.id})
 }