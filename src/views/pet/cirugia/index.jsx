import { TextField } from "@mui/material";
import React from "react";
import Content from "../../../components/content";
import Table from "../../../components/table";
import Modal from "../../../components/dialog";

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
    label: "Medico",
    key: "name",
  },
  {
    label: "Realizada",
    key: "done",
    isBoolean: true,
  },
  {
    label: "Cobro",
    key: "isPayed",
  },
];
const data = [
  {
    category: "Esterilización",
    price: "$1500",
    date: "12/06/22",
    name: "MVZ.Anna",
    done: false,
    isPayed: false,
  },
];
const initialState = {
  concept: "",
  category: "",
  price: "",
  date: "",
};

export default function Cirugia() {
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
    label: "Añadir Cirugía",
    onClick: () => setisOpenModal(true),
  };
  return (
    <>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Añadir cirugía"
        isOpen={isOpenModal}
        onClose={closeForm}
      >
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
    </>
  );
}
