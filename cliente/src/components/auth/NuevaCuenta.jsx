import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alerta/alertaContext';
import authContext from '../../context/auth/authContext';

const NuevaCuenta = (props) => {

  const {alerta, mostrarAlerta} = useContext(alertaContext);
  const {registrarUsuario, mensaje, autenticado} = useContext(authContext);

  useEffect(()=>{
    if(autenticado){
      props.history.push('/materias');
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, setUsuario] = useState({
    nombre:'',
    email:'',
    password:'',
    passwordDos:''
  })

  const { nombre, email, password, passwordDos } = usuario; 

  const onChangeCrearCuenta = e => {
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value 
    })
  }

  const onSubmitNuevaCuenta = e => {
    e.preventDefault();

    //validar campos
    if(email.trim() === '' || password.trim() === '' || passwordDos.trim() === '' || nombre.trim() === ''){
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
      return;
    }

    //longitud de pass
    if(password.trim().length < 6){
      mostrarAlerta("La password debe tener mínimo 6 caracteres", "alerta-error");
      return;
    }
    //2 pass iguales
    if(password.trim() !== passwordDos.trim()){
      mostrarAlerta("Las passwords deben ser iguales", "alerta-error");
      return;
    }

    // action
    registrarUsuario({
      nombre,
      email, 
      password,
    })

  }


    return (
      <div className='form-usuario'>
      
      <div className='contenedor-form sombra-dark'>
        <h1>MARTE</h1>
        <h2>Crear cuenta</h2>
        {alerta ? (<h1 className={`alerta ${alerta.categoria}`}> {alerta.msg}</h1>): null}

        <form onSubmit={onSubmitNuevaCuenta}>
        <div className='campo-form'>
            <label htmlFor="nombre">Nombre</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              placeholder='Tu nombre'
              value={nombre}
              onChange={onChangeCrearCuenta}
            />
          </div>

          <div className='campo-form'>
            <label htmlFor="email">Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Tu email'
              value={email}
              onChange={onChangeCrearCuenta}
            />
          </div>

          <div className='campo-form'>
            <label htmlFor="password">Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Tu password'
              value={password}
              onChange={onChangeCrearCuenta}
            />
          </div>

          <div className='campo-form'>
            <label htmlFor="password">Confirmar Password</label>
            <input
              type='password'
              id='passwordDos'
              name='passwordDos'
              placeholder='Repetir tu password'
              value={passwordDos}
              onChange={onChangeCrearCuenta}
            />
          </div>

          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registrarse'
            />
          </div>

          <Link to={'/'} className='enlace-cuenta'>
              Volver a iniciar sesión
          </Link>

        </form>
      </div>
    </div>
      );
}
 
export default NuevaCuenta;
