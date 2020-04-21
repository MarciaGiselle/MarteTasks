const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const authentication = require("../middleware/authentication");
const { check } = require("express-validator");

// api/tarea
// Crear tarea
router.post(
  "/",
  authentication,
  [
    check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty(),
    check("idMateria", "La materia es obligatoria").not().isEmpty(),
  ],
  tareaController.crearTarea
);

//Obtener tareas
router.get("/", authentication, tareaController.obtenerTareas);

//Modificar tareas
router.put(
  "/:id",
  authentication,
  [check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty()],
  tareaController.actualizarTarea
);

//Eliminar tareas
router.delete(
  "/:id",
  authentication,
  tareaController.eliminarTarea
);

module.exports = router;
