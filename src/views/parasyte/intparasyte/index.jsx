import React from "react";
import Table from ".././../../components/table";

const titles = [
    {
        label: "Poducto",
        key: "product",
      },
      {
        label: "Fecha de aplicación",
        key: "date",
      },
  {
    label: "Peso",
    key: "weight",
  },
  {
    label: "Proxima Aplicación",
    key: "date2",
  },
  

  
];
const data =[
    {
        product:"nexgar",
        date:"14/02/23",
        weight:"23kg",
        date2:"14/03/23",
    },
    {
        product:"nexgar",
        date:"14/02/23",
        weight:"23kg",
        date2:"14/03/23",
    },
    {
      product:"nexgar",
      date:"14/02/23",
      weight:"23kg",
      date2:"14/03/23",
  },
];

const buttonConf = {
    label: "Añadir Registro",
  };
  
  export default function ParasitosInt() {
    return <Table buttonConf={buttonConf} columns={titles} data={data} />;
  }
