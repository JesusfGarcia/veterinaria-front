import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

const titles = [
  {
    label: "Nombre",
    key: "name",
  },

  {
    label: "Descripción",
    key: "description",
  },
  {
    label: "Precio de compra",
    key: "shopping_price",
  },
  {
    label: "Precio de venta",
    key: "selling_price",
  },

  {
    label: "Cantidad",
    key: "quantity",
  },
  {
    label: "Categoría",
    key: "category",
  },
  {
    label: "Proveedor",
    key: "provider",
  },
];
const data = [
  {
    name: "Nexgar",
    description: "trataiento para las garrapatas",
    shopping_price: "$100",
    selling_price: "$250",
    quantity: "20",
    category: "medicamento",
    provider: "bayer",
  },
  {
    name: "Nexgar",
    description: "trataiento para las garrapatas",
    shopping_price: "$100",
    selling_price: "$250",
    quantity: "20",
    category: "medicamento",
    provider: "bayer",
  },
  {
    name: "Nexgar",
    description: "trataiento para las garrapatas",
    shopping_price: "$100",
    selling_price: "$250",
    quantity: "20",
    category: "medicamento",
    provider: "bayer",
  },
];

const initialState = {
  name: "",
  description: "",
  shopping_price: "",
  selling_price: "",
  quantity: "",
  category: "",
  provider: "",
};
export default function StockScreen() {
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
    <Container>
      <Content title="Inventario">
        <div className="linea"></div>
        <Table buttonConf={buttonConf} columns={titles} data={data} />
        <Modal
          onSave={onSave}
          title="Añadir producto"
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
            name="description"
            value={body.description}
            size="small"
            label="Descripción"
          />
          <TextField
            onChange={handleChange}
            name="shopping_price"
            value={body.shopping_price}
            size="small"
            label="Precio de compra"
          />
          <TextField
            onChange={handleChange}
            name="selling_price"
            value={body.selling_price}
            size="small"
            label="Precio de Venta"
          />
          <TextField
            onChange={handleChange}
            name=" quantity"
            value={body.quantity}
            size="small"
            label="Cantidad"
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
            name="provide"
            value={body.provider}
            size="small"
            label="Proveedor"
          />
        </Modal>
      </Content>
    </Container>
  );
}
