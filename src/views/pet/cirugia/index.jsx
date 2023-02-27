import React from "react";
import Table from "../../../components/table";
const titles = [

  {
    label: "Categoría",
    key: "category",
  },
  {
    label: "Precio",
    key: "price",
  },
  {
    label: "Fecha",
    key: "date",
  },
  {
    label:"Medico",
    key: "name",
  },
  {
    label:"Realizada",
    key: "done",
    isBoolean:true
  },
];
const data =[
    {
       
        category: "Esterilización",
        price:"$1500",
        date:"12/06/22",
        name: "MVZ.Anna",
        done:false

    },
];
const buttonConf = {
    label: "Añadir Cirugía",
  };
  
  export default function Cirugia() {
    return <Table buttonConf={buttonConf} columns={titles} data={data} />;
  }