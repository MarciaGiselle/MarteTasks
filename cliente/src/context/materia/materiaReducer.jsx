import { FORMULARIO_MATERIA, OBTENER_MATERIAS, AGREGAR_MATERIA, VALIDAR_FORMULARIO, MATERIA_ACTUAL, ELIMINAR_MATERIA, ERROR_MATERIA } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_MATERIA:
            return{
                ...state,
                formularioMateria : true
            }
        case OBTENER_MATERIAS:
            return {
                ...state,
                materias: action.payload
            }    
        case AGREGAR_MATERIA:    
            return {
                ...state,
                //el objecto se agrega al array q teniamos
                materias: [...state.materias, action.payload],
                formularioMateria: false,
                errorFormulario: false

            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }
        case MATERIA_ACTUAL:
            return {
                ...state,
                materiaActual: ([...state.materias].filter(materia => materia._id === action.payload))[0]
            }     
        case ELIMINAR_MATERIA:
            return {
                ...state,
                materias: [...state.materias].filter(materia => materia._id !== action.payload),
                materiaActual: null
            }     
        case ERROR_MATERIA:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}