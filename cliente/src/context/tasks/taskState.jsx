import React, { useReducer } from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import clienteAxios from '../../config/axios';

import { SELECCIONAR_TAREAS,
        AGREGAR_TAREA, 
        VALIDAR_TAREA, 
        ELIMINAR_TAREA,
        MODIFICAR_TAREA,
        TAREA_A_MODIFICAR
    } from '../../types';

const TaskState = props => {

    const inicialState = {
        tareasDeMateria: [],
        errorTarea: false,
        tareaAModificar: null     

    }

    //dispatch
    const [state, dispatch] = useReducer(taskReducer, inicialState);

    const obtenerTareasDeMateria = async idMateria =>{
        try {
            const tareas = await clienteAxios.get('api/tarea/', {params: {idMateria}}) ;
            dispatch({
               type: SELECCIONAR_TAREAS,
               payload: tareas.data
           })
        } catch (error) {
            console.log(error);
        }
       

    }

    const nuevaTarea = async tarea => {
       try {
        const nuevaTarea = await clienteAxios.post('/api/tarea/', tarea)    
        dispatch({
            type: AGREGAR_TAREA,
            payload: nuevaTarea
        })
       } catch (error) {
           console.log(error);
       }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    
    const eliminarTarea = async tarea => {
       try {
        await clienteAxios.delete(`api/tarea/${tarea}`)
        dispatch({
            type:ELIMINAR_TAREA,
            payload: tarea
        })
       } catch (error) {
           console.log(error);
       }
    }

    const modificarTarea = async tarea => {
       try {
           const respuesta = await clienteAxios.put(`/api/tarea/${tarea._id}`, tarea);
           dispatch({
            type:MODIFICAR_TAREA,
            payload: respuesta.data
        })
       } catch (error) {
           console.log(error);
       }
    }

    

    const setTareaAModificar = tarea => {
        dispatch({
            type: TAREA_A_MODIFICAR,
            payload: tarea
        })
    }

    return (  
        <taskContext.Provider
            value={{
                tareasDeMateria: state.tareasDeMateria,
                errorTarea: state.errorTarea,
                tareaAModificar: state.tareaAModificar,
                obtenerTareasDeMateria,
                nuevaTarea,
                validarTarea,
                eliminarTarea,
                modificarTarea,
                setTareaAModificar
            }}
        
        >

            {props.children}
        </taskContext.Provider>

    );
}
 
export default TaskState;