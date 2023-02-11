import React from "react";

import MichiJpg from "../../assets/images/michi.jpeg";
import Content from "../../components/content";
import Table from "../../components/table";

const titles = [
  {
    label: "Descripción",
    key: "description",
  },
  {
    label: "Costo",
    key: "cost",
  },
  {
    label: "Tratamiento",
    key: "treatment",
  },
  {
    label: "Fecha",
    key: "date",
  },
];

const data = [
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
  },
];

export default function UsersScreen() {
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

          <div onkeydown="buscar(event)" class="input">
            <input type="text" />
            <img alt="lupa icon" src="./lupa.png" />
          </div>
          <Table columns={titles} data={data} />
        </div>
      </div>
    </Content>
  );
}



const myobject = {
  name: "sakldjfas",
  skere: "adlksjfas"
}

const {name} = myobject

console.log(name)