import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alerta/alertaContext';
import authContext from '../../context/auth/authContext';

const Login = (props) => {

  const {alerta, mostrarAlerta} = useContext(alertaContext);
  const { autenticado, mensaje, iniciarSesion } = useContext(authContext);

  useEffect(() => {
     if(autenticado){
      props.history.push('/materias');
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, setUsuario] = useState({
    email:'',
    password:''
  })

  const { email, password } = usuario; 

  const onChangeLogin = e => {
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value 
    })
  }

  const onSubmitLogin = e => {
    e.preventDefault();

    //validar campos
    if(email.trim() === '' || password.trim() === ''){
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
      return;
    }


    //longitud de pass
    if(password.trim().length < 6){
      mostrarAlerta("La password debe tener mínimo 6 caracteres", "alerta-error");
      return;
    }

    iniciarSesion({email, password});

  }

    return (
        <div className='form-usuario'>
          <div className='contenedor-form sombra-dark'>
            <h1>MARTE</h1>
            <h2>Iniciar Sesión</h2>
            {alerta ? (<h1 className={`alerta ${alerta.categoria}`}> {alerta.msg}</h1>): null}
            <form onSubmit={onSubmitLogin}> 
              <div className='campo-form'>
                <label htmlFor="email">Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Tu email'
                  value={email}
                  onChange={onChangeLogin}
                />
              </div>

              <div className='campo-form'>
                <label htmlFor="password">Password</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Tu password'
                  autoComplete='cc-number'
                  value={password}
                  onChange={onChangeLogin}
                />
              </div>

              <div className='campo-form'>
                <input
                  type='submit'
                  className='btn btn-primario btn-block'
                  value='Iniciar Sesión'
                />

              </div>
            </form>

            <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
              Obtener nueva cuenta
            </Link>
          </div>
        </div>
      );
}
 
export default Login;
