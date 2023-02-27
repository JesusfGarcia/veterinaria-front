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

const buttonConf = {
  label: "Añadir Consulta",
};

export default function Consults() {
  return <Table buttonConf={buttonConf} columns={titles} data={data} />;
}
