import React, { useContext, useEffect } from "react";
import Materia from "./Materia";
import materiaContext from "../../context/materia/materiaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import alertaContext from '../../context/alerta/alertaContext';

const ListadoMaterias = () => {
  //extraigo los proyectos del state inicial
  const { mensaje, materias, obtenerMaterias } = useContext(materiaContext);
  const {alerta, mostrarAlerta} = useContext(alertaContext);

  //consulto si tiene contenido
  useEffect(() => {

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerMaterias();
    //eslint-disable-next-line
  }, [mensaje]);

  return (
    <div className="proyectos">
      <h2>Tus materias</h2>

      <ul className="listado-proyectos">
      {alerta ? (<h1 className={`alerta ${alerta.categoria}`}> {alerta.msg}</h1>): null}
        {materias.length === 0 ? (
          <li className="tarea">
            <p>No hay materias</p>
          </li>
        ) : (
          <TransitionGroup>
            {materias.map((materia) => (
              <CSSTransition
                key={materia._id}
                timeout={300}
                classNames="proyecto"
              >
                <Materia materia={materia} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </div>
  );
};

export default ListadoMaterias;
