const Tarea = require("../models/Tarea");
const materiaServicio = require("../services/MateriaServicio");
const tareaServicio = require("../services/TareaServicio");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const materia = await materiaServicio.getById(req.body.idMateria);

    if (materia) {
      if (materiaServicio.tienePermisos(materia.creador, req.usuario.id)) {
        const tarea = new Tarea(req.body);
        await tareaServicio.guardar(tarea);

        res.json(tarea);
      } else {
        return res
          .status(401)
          .json({ msg: "No tiene permisos para crear la tarea" });
      }
    } else {
      return res.status(404).json({ msg: "La materia no existe" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const {idMateria} = req.query;     
    const materia = await materiaServicio.getById(idMateria);

    if (materia) {
      if (materiaServicio.tienePermisos(materia.creador, req.usuario.id)) {
        const tareas = await tareaServicio.obtenerTodas(idMateria);

        res.json(tareas);
      } else {
        return res
          .status(401)
          .json({ msg: "No tiene permisos para ver las tareas" });
      }
    } else {
      return res.status(404).json({ msg: "La materia no existe" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let tarea = await tareaServicio.getById(req.params.id);
   
    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    const materia = await materiaServicio.getById(tarea.idMateria);

    if (materiaServicio.tienePermisos(materia.creador, req.usuario.id)) {
      const nuevaTarea = tareaServicio.llenar(req.body);
      tarea = await tareaServicio.actualizar(tarea, nuevaTarea);
    } else {
      return res.status(401).json({ msg: "No tiene permisos para editar la tarea" });
    }

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
};

exports.eliminarTarea = async (req, res) => {
    try { 
        let tarea = await tareaServicio.getById(req.params.id);
       
        if (!tarea) {
          return res.status(404).json({ msg: "No existe la tarea" });
        }
    
        const materia = await materiaServicio.getById(tarea.idMateria);
    
        if (materiaServicio.tienePermisos(materia.creador, req.usuario.id)) {
            tarea = await tareaServicio.eliminarTarea(tarea);
        } else {
          return res.status(401).json({ msg: "No tiene permisos para eliminar la tarea" });
        }
    
        res.json({msg: 'Eliminado'});

      } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
      }
} 