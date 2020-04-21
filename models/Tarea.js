const mongoose = require ('mongoose');

const TareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: false,
    },
    idMateria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Tarea', TareaSchema);