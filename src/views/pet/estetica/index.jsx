import React from "react";
import Table from "../../../components/table";

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
    label: "Fecha",
    key: "date",
  },
];

const data = [
  {
    description: "baño de  perro grande",
    cost: "$250",

    date: "12/12/2022",
  },
  {
    description: "baño de  perro grande",
    cost: "$250",

    date: "12/12/2022",
  },
  {
    description: "baño de  perro grande",
    cost: "$250",

    date: "12/12/2022",
  },
];
const buttonConf = {
    label: "Añadir Visita",
  };
  
  export default function Estetica() {
    return <Table buttonConf={buttonConf} columns={titles} data={data} />;
  }
  