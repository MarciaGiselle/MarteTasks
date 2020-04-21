import React from "react";
import NuevaMateria from "../proyects/NuevaMateria";
import ListadoMaterias from "../proyects/ListadoMaterias";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MARTE<span>Tasks</span>
      </h1>

      <NuevaMateria/>
        <br/>
      <ListadoMaterias />
    </aside>
  );
};

export default Sidebar;
