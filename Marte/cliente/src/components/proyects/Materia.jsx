import React, { useContext } from 'react';
import materiaContext from '../../context/materia/materiaContext';
import taskContext from '../../context/tasks/taskContext';

const Materia = ({materia}) => {
    const proyectoContext = useContext(materiaContext);
    const{ seleccionarMateria } = proyectoContext;

    const tareasContext = useContext(taskContext);
    const{ obtenerTareasDeMateria } = tareasContext;


    const obtenerMateria = id => {
        seleccionarMateria(id);
        obtenerTareasDeMateria(id)
    }


    return (  
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick = {() => obtenerMateria(materia._id) }
            >
                {materia.nombre}
            </button>
        </li>
    )
}
 
export default Materia;