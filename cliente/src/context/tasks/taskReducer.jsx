import { SELECCIONAR_TAREAS, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_A_MODIFICAR, MODIFICAR_TAREA } from '../../types';

export default (state, action) => {
    switch(action.type){
      
        case SELECCIONAR_TAREAS:
            return {
                ...state,
                tareasDeMateria:  action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasDeMateria: [ action.payload, ...state.tareasDeMateria ],
                errorTarea: false

            }  
        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasDeMateria: state.tareasDeMateria.filter(tarea => tarea._id !== action.payload)
            }      
        case MODIFICAR_TAREA:
            return{
                ...state,
                tareasDeMateria: state.tareasDeMateria.map(tarea => tarea._id === action.payload._id ?
                    action.payload : tarea), 
                tareaAModificar: null 
            }

        case TAREA_A_MODIFICAR:
            return{
                ...state,
                tareaAModificar: action.payload 
            }    
        default:
            return state;
    }

}