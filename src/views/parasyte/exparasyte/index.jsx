import { TextField } from "@mui/material";
import React from "react";
import Content from "../../../components/content";
import Table from ".././../../components/table";
import Modal from "../../../components/dialog";
const titles = [
  {
    label: "Nombre",
    key: "name",
  },
  {
    label: "Poducto",
    key: "product",
  },
  {
    label: "Precio",
    key: "price",
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
const data = [
  {
    name: "Bolt",
    product: "nexgar",
    price: "236",
    date: "14/02/23",
    weight: "23kg",
    date2: "14/03/23",
  },
];
const initialState = {
  name: "",
  product: "",
  price: "",
  date: "",
  weight: "",
  date2: "",
};
const buttonConf = {
  label: "Añadir Registro",
};

export default function ParasitosEx() {
  const [isOpenModal, setisOpenModal] = React.useState(false);
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
    console.log(body);
  };
  const buttonConf = {
    label: "Añadir Producto",
    onClick: () => setisOpenModal(true),
  };

  return (
    <>
      
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Añadir Registro"
        isOpen={isOpenModal}
        onClose={closeForm}
      >
        <TextField
          onChange={handleChange}
          name="name"
          value={body.name}
          size="small"
          label="Nombre"
        />
        <TextField
          onChange={handleChange}
          name="product"
          value={body.product}
          size="small"
          label="Producto"
        />
        <TextField
          onChange={handleChange}
          name="price"
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
        <TextField
          onChange={handleChange}
          name="weight"
          value={body.weight}
          size="small"
          label="Peso"
        />
        <TextField
          onChange={handleChange}
          name=" date2"
          value={body.date2}
          size="small"
          label="Proxima Fecha de aplicación"
        />
      </Modal>
    </>
  );
}
