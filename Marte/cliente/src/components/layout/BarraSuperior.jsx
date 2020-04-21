import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';


const BarraSuperior = () => {
    const {obtenerUsuarioAutenticado, usuario, cerrarSesion} = useContext(authContext);

    useEffect(() => {
       obtenerUsuarioAutenticado()
       // eslint-disable-next-line
    }, [])
    return (  
        <div className='app-header'>
            <p className='nombre-usuario'>
                Hola  <span>
    {usuario? usuario.nombre:null}</span>
            </p>

            <nav className='nav-principal'>
                <button
                    type='button'
                    className='btn btn-blank cerrar-sesion'
                    onClick={()=> cerrarSesion()}>
                Cerrar Sesión        
                </button>

            </nav>
        </div>
    );
}
 
export default BarraSuperior;