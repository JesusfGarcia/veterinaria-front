import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal from "../../components/dialog"
import { TextField } from "@mui/material";

const title=[
    {
        label:"Nombre",
        key:"name"
    },
    {
        label:"Concepto",
        key:"concept",
    },
    {
        label:"Categoría",
        key:"category",
    },
    {
        label:"Precio",
        key:"price",
    },
    {
        label:"Fecha",
        key:"date",
    }

];

const data=[
    {
        name: "coffee",
        concept:"realizar cirugia de perro con solo un testiculo",
        category:"esterlización",
        price:"$1500",
        date:"12/04/23",


    }
]
const initialState = {
    name: "",
    concept:"",
    category:"",
    price:"",
    date:"",
}
export default function SurgeryScreen(){

    const [isOpenModal,setisOpenModal] = React.useState(false)
    const [body, setBody] = React.useState({ ...initialState });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBody({
          ...body,
          [name]: value,
        });
      };
    
      const closeForm = () => {
        setisOpenModal(false);
        setBody({ ...initialState });
      };
    
      const onSave = () => {
        console.log(body)
      }
      const buttonConf = {
        label: "Añadir Cirugía",
        onClick: () => setisOpenModal(true)
      };
    
    
      return (
        <Content title="Cirugías">
          <div className="linea"></div>
          <Table buttonConf={buttonConf} columns={title} data={data} />
          <Modal onSave={onSave} title="Añadir cirugía"isOpen={isOpenModal} onClose={closeForm} >
          <TextField
              onChange={handleChange}
              name="name"
              value={body.name}
              size="small"
              label="Nombre"
            />
            <TextField
            onChange={handleChange}
            name="concept"
            value={body.concept}
            size="small"
            label="Concepto"
            />
             <TextField
            onChange={handleChange}
            name="category"
            value={body.category}
            size="small"
            label="Categoria"
            />
             <TextField
            onChange={handleChange}
            name="priece"
            value={body.price}
            size="small"
            label="Precio"
            />
             <TextField
            onChange={handleChange}
            name="date"
            value={body.date}
            size="small"
            label="Fecha"
            />
    
          </Modal>
    
        </Content>
    
      );


}