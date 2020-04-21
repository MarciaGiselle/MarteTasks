import React, { useContext , useState , useEffect} from 'react';
import materiaContext from '../../context/materia/materiaContext';
import taskContext from '../../context/tasks/taskContext';

const FormularioTarea = () => {

    const proyectoContext = useContext(materiaContext);
    const{ materiaActual } = proyectoContext;

    const tareasContext = useContext(taskContext);
    const{ nuevaTarea, obtenerTareasDeMateria, validarTarea, errorTarea, tareaAModificar, modificarTarea} = tareasContext;
    
  

    const [tarea, setTarea] = useState({
        nombre:''
    });

    const { nombre } = tarea;

    const onChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(tareaAModificar){
            setTarea(tareaAModificar)
        }else{
            setTarea({
                nombre:''
            })
        }
    }, [tareaAModificar])

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        if(!tareaAModificar){
            //crear
            tarea.idMateria = materiaActual._id;
            nuevaTarea(tarea);
        }else{
            //modificar
            modificarTarea(tarea);
        }

        //recarga el array de tareas
        obtenerTareasDeMateria(materiaActual._id);

        //limpiar el form
        setTarea({
            nombre: ''
        })


    }
    return (  
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre de la tarea'
                        name='nombre'
                        value = {nombre}
                        onChange= {onChange}
                    />
                </div>
                {errorTarea ? <p className='mensaje error'> <span role='img' aria-label='emoji'>	&#x26A0;&#xFE0F;</span> Ingresa un nombre para la tarea</p>: null}


                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaAModificar ? 'Editar Tarea': 'Agregar tarea'}
                    />
                </div>
            </form>
        </div>
    );
}
 
export default FormularioTarea;