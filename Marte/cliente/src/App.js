import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import PanelAula from "./components/proyects/PanelAula";
import RutaPrivada from "./components/rutas/RutaPrivada";

import MateriaState from "./context/materia/materiaState";
import TaskState from "./context/tasks/taskState";
import AlertaState from "./context/alerta/alertaState";
import AuthState from "./context/auth/authState";
import authToken from './config/authToken';

const token = localStorage.getItem('token');
if(token){
  authToken(token);
}

function App() {

  return (
    <MateriaState>
      <TaskState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/materias" component={PanelAula} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TaskState>
    </MateriaState>
  );
}

export default App;
