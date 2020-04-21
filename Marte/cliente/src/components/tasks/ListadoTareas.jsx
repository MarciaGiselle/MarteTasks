import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import materiaContext from '../../context/materia/materiaContext';
import taskContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup}from 'react-transition-group';

const ListadoTareas = () => {

    const proyectoContext = useContext(materiaContext);
    const{ materiaActual, eliminarMateria } = proyectoContext;

    const tareasContext = useContext(taskContext);
    const{ tareasDeMateria } = tareasContext;
    

    return (  
        <Fragment>
            <h2>Materia {materiaActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasDeMateria.length === 0 ?
                    (<li className='tarea'>
                        <p>No hay tareas</p>
                    </li>)
                :
                    (<TransitionGroup >
                        {tareasDeMateria.map(tarea=>(
                            <CSSTransition
                                key={tarea._id}
                                timeout={300}
                                classNames='tarea'
                                >
                            <Tarea
                                tarea={tarea}
                                
                            />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>)
                }
            </ul>

            <button
                type='button'
                className='btn btn-eliminar'
                onClick={ () => eliminarMateria(materiaActual._id)}
            >
                Eliminar Materia &times;
            </button>

        </Fragment>
    );
}
 
export default ListadoTareas;