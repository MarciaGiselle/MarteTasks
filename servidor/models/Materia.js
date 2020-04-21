const mongoose = require ('mongoose');

const MateriaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Materia', MateriaSchema);