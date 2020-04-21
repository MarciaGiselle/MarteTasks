const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const authentication = require('../middleware/authentication');
const {check} = require('express-validator');

// Crear proyecto
// api/materia
router.post('/', 
    authentication,
    [
        check('nombre', 'El nombre de la materia es obligatorio').not().isEmpty(),
    ],
    materiaController.crearMateria
);

//obtener todos las materias
router.get('/', 
    authentication,
    materiaController.obtenerMaterias
);

//actualizar una materia
router.put('/:id', 
    authentication,
    [
        check('nombre', 'El nombre de la materia es obligatorio').not().isEmpty(),
    ],
    materiaController.actualizarMateria
);

//eliminar materia
router.delete('/:id',
    authentication,
    materiaController.eliminarMateria

)
module.exports = router;