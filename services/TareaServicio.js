const tareaDAO = require('../dao/TareaDAO');

exports.getById = (idTarea) => {
    return tareaDAO.getbyId(idTarea);
}

exports.guardar = (tarea) => {
    return tareaDAO.guardar(tarea);
}

exports.obtenerTodas = (idMateria) => {
    return tareaDAO.obtenerTodas(idMateria);
}


exports.llenar = (body) =>{
    const nuevaTarea = {};
        nuevaTarea.nombre = body.nombre;
        nuevaTarea.estado = body.estado
    return nuevaTarea;
}

exports.actualizar = (tarea, nuevaTarea) => {
    return tareaDAO.actualizar(tarea, nuevaTarea);
}

exports.eliminarTarea = (tarea) => {
    return tareaDAO.eliminar(tarea);
}
