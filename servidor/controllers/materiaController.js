const Materia = require("../models/Materia");
const materiaServicio = require('../services/MateriaServicio');
const { validationResult} = require('express-validator');

exports.crearMateria = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const materia = new Materia(req.body);
    // guardar al creador
    
    materia.creador = req.usuario.id;
    materia.save();
    res.json(materia);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};


exports.obtenerMaterias = async (req, res) => {
  try{
    //consulta a  la bd
    const proyectos = await materiaServicio.obtenerMaterias(req.usuario.id);
    res.json(proyectos);

  } catch (error) {
    console.log(error);
    res.status(401).send("Hubo un error");
  }
} 

exports.actualizarMateria = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let materia = await materiaServicio.getById(req.params.id);

    if(materia){
      if( materiaServicio.tienePermisos(materia.creador, req.usuario.id)){
        
        const nuevaMateria = materiaServicio.llenar(req.body);
        materia = await materiaServicio.actualizar(materia, nuevaMateria);

      }else{
        return res.status(401).json({msg: 'No tiene permisos para editar'});
      }
    }else{
      return res.status(404).json({msg: 'La materia no existe'});
    }

    res.json(materia);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
}

exports.eliminarMateria = async (req, res) => {
  try {

    let materia = await materiaServicio.getById(req.params.id);

    if(materia){
      if( materiaServicio.tienePermisos(materia.creador, req.usuario.id)){
        
        materia = await materiaServicio.eliminar(materia);

      }else{
        return res.status(401).json({msg: 'No tiene permisos para eliminar'});
      }
    }else{
      return res.status(404).json({msg: 'La materia no existe'});
    }

    res.json({msg: 'Eliminado'});
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }

}