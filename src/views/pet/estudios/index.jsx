import React from "react";
import Table from "../../../components/table";

const titles = [
    {
        label: "Fecha",
        key: "date",
      },
      {
        label: "Costo",
        key: "cost",
      },
  {
    label: "Tipo de estudio",
    key: "study",
  },
  {
    label: "Observaciones",
    key: "observation",
  },
  

  
];

const data = [
  {
    date:"12/12/22",
    cost: "$250",
    study:"biometria",
    observation:"paciente con sintomas de parvovirus",

  
  },
  {
    date:"12/12/22",
    cost: "$250",
    study:"biometria",
    observation:"paciente con sintomas de parvovirus",

  
  },
  {
    date:"12/12/22",
    cost: "$250",
    study:"biometria",
    observation:"paciente con sintomas de parvovirus",

  
  },
];
const buttonConf = {
    label: "Añadir Estudios",
  };
  
  export default function Estudios() {
    return <Table buttonConf={buttonConf} columns={titles} data={data} />;
  }
  