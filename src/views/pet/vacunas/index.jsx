import React from "react";
import Table from "../../../components/table";

const titles = [
    {
        label: "Fecha de aplicación",
        key: "date",
      },
    {
        label: "Nombre de la vacuna",
        key: "name",
      },
      {
        label: "Laboratorio",
        key: "lab",
      },
  {
    label: "Medico",
    key: "name2",
  },
  {
    label: "Proxima vacuna",
    key: "date2",
  },
  

  
];
const data =[
    {
        
        date:"14/02/23",
        name:"Sextuple",
        lab:"Merial",
        name2:"MVZ.Thelma",
        date2:"25/02/23",
    },
    {
        date:"14/02/23",
        name:"Sextuple",
        lab:"Merial",
        name2:"MVZ.Thelma",
        date2:"25/02/23",
    },
];

const buttonConf = {
    label: "Añadir Vacuna",
  };
  
  export default function Vacunas() {
    return <Table buttonConf={buttonConf} columns={titles} data={data} />;
  }
