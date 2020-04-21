import React, { useReducer } from 'react';
import materiaContext from './materiaContext';
import materiaReducer from './materiaReducer';
import clienteAxios from '../../config/axios';
import { 
    FORMULARIO_MATERIA,
    OBTENER_MATERIAS,
    AGREGAR_MATERIA,
    VALIDAR_FORMULARIO,
    MATERIA_ACTUAL,
    ELIMINAR_MATERIA,
    ERROR_MATERIA
 } from '../../types';

const MateriaState = props => {

    const inicialState = {
        materias : [],
        formularioMateria : false,
        errorFormulario: false,
        materiaActual: null,
        mensaje: null

    }

    //Dispatch para ejecutar las acciones
    const [ state, dispatch ] =  useReducer(materiaReducer, inicialState);

    //funciones del crud
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_MATERIA
        })
    }

    //Obtener los materias
    const obtenerMaterias = async () => {
       try {
        const resultado = await clienteAxios.get('/api/materia');

        dispatch({
            type: OBTENER_MATERIAS,
            payload: resultado.data
        })
       } catch (error) {
        const alerta = {
            msg: 'Ha ocurrido un error inesperado',
            categoria: 'alerta-error'
        }
        dispatch({
            type: ERROR_MATERIA,
            payload: alerta
        })
       }
    }

    //agregar nuevo materia
    const agregarMaterias = async nuevaMateria => {
       try {

        const resultado = await clienteAxios.post('/api/materia', nuevaMateria);
        //console.log(resultado);
        dispatch({
            type: AGREGAR_MATERIA,
            payload: resultado.data
        })
       } catch (error) {
        const alerta = {
            msg: 'Ha ocurrido un error inesperado',
            categoria: 'alerta-error'
        }
        dispatch({
            type: ERROR_MATERIA,
            payload: alerta
        })

       }
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const seleccionarMateria = id => {
        dispatch({
            type: MATERIA_ACTUAL,
            payload: id
        })
    }

    const eliminarMateria = async  id => {

        try {
            await clienteAxios.delete(`/api/materia/${id}`);
            dispatch({
                type: ELIMINAR_MATERIA,
                payload: id
            })
        } catch (error) {
            const alerta = {
                msg: 'Ha ocurrido un error inesperado',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_MATERIA,
                payload: alerta
            })
         }
    }

    return(
        <materiaContext.Provider
            value={{
                formularioMateria: state.formularioMateria,
                materias: state.materias,
                errorFormulario : state.errorFormulario,
                materiaActual : state.materiaActual,
                mensaje : state.mensaje,
                mostrarError,
                mostrarFormulario,
                obtenerMaterias,
                agregarMaterias,
                seleccionarMateria   ,
                eliminarMateria
            }}
        >
            {props.children}
        </materiaContext.Provider>
    )

}

export default MateriaState;