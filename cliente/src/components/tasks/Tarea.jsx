import React, {useContext} from 'react';
import taskContext from '../../context/tasks/taskContext';

const Tarea = ({tarea}) => {

    const tareasContext = useContext(taskContext);
    const{ eliminarTarea, obtenerTareasDeMateria, modificarTarea, setTareaAModificar } = tareasContext;

    const eliminar = () => {
        eliminarTarea(tarea._id);
        obtenerTareasDeMateria(tarea.idMateria)
    }

    const cambiarEstadoTarea = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        modificarTarea(tarea);
    }

    const modificarTareaSeleccionada = tarea => {
        setTareaAModificar(tarea);
    }

    return ( 
        <li className='tarea sombra' >
            <p>{tarea.nombre}</p>
            <div className='estado'>
                {tarea.estado
                ?
                <button 
                    type='button' 
                    className='completo'
                    onClick={()=>cambiarEstadoTarea(tarea)}>
                    Completo
                </button>
                :
                <button 
                    type='button' 
                    className='incompleto'
                    onClick={()=>cambiarEstadoTarea(tarea)}>
                    Incompleto
                </button>
                }
            </div>

            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick= {() => modificarTareaSeleccionada(tarea)}
                >
                  Editar  
                </button>

                <button
                    type='button'
                    className='btn btn-secunadario'
                    onClick={eliminar}
                >
                  Eliminar  
                </button>
                
            </div>    


        </li>
    );
}
 
export default Tarea;