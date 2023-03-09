import React from "react";
import Modal from "../../../components/dialog";
import Table from "../../../components/table";
export default function Sales2() {
    const [isOpen, setIsOpen] = React.useState(false);
}  
const titles = [
    {
      label: "Concepto",
      key: "concept",
    },
    {
        label: "Cantidad",
        key: "quantity",
      },
    {
      label: "Fecha",
      key: "Date",
    },
  
    
    {
      label: "Autorizó",
      key: "authorize",
    },
  
    
  ];
  const data = [
    {
     concept:"Retiro de efectivo",
      quantity: "2",
      date:"12/03/23",
      authorize:"mvz.Paola",
    },
    {
    concept:"Retiro de efectivo",
     quantity: "2",
     date:"12/03/23",
    authorize:"mvz.Paola",
    },
       
  ];
  const buttonConf = {
    label: "Añadir Movimiento",
    onClick:()=> alert("hola mundo")
  };
  const onClose = () => {
    setIsOpen(false)
  }

  
export default function Sales1() {
  return (
    <div>
      <Table  buttonConf={buttonConf} columns={titles} data={data} />
<Modal 
 title="Hola"
 isOpen={isOpen}
 onClose={onClose}>

</Modal>
     
    </div>
  );
}
