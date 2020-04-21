import React, { Fragment, useState, useContext } from 'react';
import materiaContext from '../../context/materia/materiaContext';


const NuevaMateria = () => {

    //obtener el state del formulario
    //traigo el context
    const proyectoContext = useContext(materiaContext);
    //obtengo el valor de la variables
    const{ formularioMateria, mostrarFormulario, agregarMaterias, errorFormulario, mostrarError } = proyectoContext;

    const [materia, setMateria] = useState({
        nombre:''
    });

    const { nombre } = materia;

    const onChangeMateria = e => {
        setMateria({
            ...materia,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitMateria = e => {
        e.preventDefault();

        if(nombre.trim() === ''){
            mostrarError();
            return;
        }

        agregarMaterias(materia);
        setMateria({
            nombre: ''
        });
    }

    return (  
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick = {() => mostrarFormulario()}
            >Nueva Materia
            </button>
            
            { formularioMateria
            
            ?
                <form
                    className='formulario-nuevo-proyecto'
                    onSubmit={onSubmitMateria}
                >
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre de la materia'
                        name='nombre'
                        value={nombre}
                        onChange={onChangeMateria}
                    />
            {errorFormulario ? <p className='mensaje error'> <span role='img' aria-label='emoji'>	&#x26A0;&#xFE0F;</span> Ingresa un nombre</p>: null}


                    <input
                        type='submit'
                        className='btn btn-primario btn-block'
                        value='Agregar materia'
                    />
                </form>
            
            
            : null
            }


        </Fragment>
    );
}
 
export default NuevaMateria;
