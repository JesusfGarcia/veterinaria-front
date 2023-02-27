import React from "react";

import Cirugia from "./cirugia";
import Consults from "./consultas";
import Estetica from "./estetica";
import Estudios from "./estudios";
import Parasitos from "./parasitos";
import Vacunas from "./vacunas";

import MichiJpg from "../../assets/images/michi.jpeg";
import Content from "../../components/content";
import Tabs from "../../components/tabs";

export default function PetsScreen() {
  return (
    <Content title="Perfil de Mascota">
      <div class="contenedor">
        <div class="content">
          <div class="linea"></div>
          <div class="info">
            <img alt="foto de michi" src={MichiJpg} />
            <div class="datos">
              <h5>Misifu</h5>
              <h6>Gato</h6>
              <h6>Felino</h6>
              <span>26/septiembre/2013</span>
              <span>3kg</span>
            </div>
          </div>
          <Tabs items={items}/>
        </div>
      </div>
    </Content>
  );
}


const items = [
  {
    label: "Consultas",
    component: <Consults />,
  },
  {
    label: "Estéticas",
    component: <Estetica/>
  },
  {
    label: "Estudios",
    component: <Estudios/>,
  },
  {
    label: "Cirugías",
    component: <Cirugia/>,
  },
  {
    label: "Control Parasitos",
    component: <Parasitos/>,
  },
  {
    label: "Vacunas",
    component: <Vacunas/>,
  },
];