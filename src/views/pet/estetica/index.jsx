import React from "react";
import Table from "../../../components/table";
import Modal from "../../../components/dialog";
import { TextField } from "@mui/material";

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
  {
    label: "Cobro",
    key: "isPayed",
  },
];

const data = [
  {
    description: "baño de  perro grande",
    cost: "$250",

    date: "12/12/2022",
    isPayed: true,
  },
  {
    description: "baño de  perro grande",
    cost: "$250",

    date: "12/12/2022",
    isPayed: false,
  },
  {
    description: "baño de  perro grande",
    cost: "$250",

    date: "12/12/2022",
    isPayed: false,
  },
];
const initialState = {
  serviceType: "",
  date: "",
  price: "",
  observations: "",
  phone: "",
};

export default function Estetica() {
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
    label: "Añadir Visita",
    onClick: () => setisOpenModal(true),
  };
  return (
    <>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Añadir Visita"
        isOpen={isOpenModal}
        onClose={closeForm}
      >
        <TextField
          onChange={handleChange}
          name="serviceType"
          value={body.serviceType}
          size="small"
          label="Tipo de servicio"
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
          value={body.price}
          size="small"
          label="Precio"
          name="price"
        />
        <TextField
          value={body.observations}
          size="small"
          label="Observaciones"
          onChange={handleChange}
          name="observations"
        />
        <TextField
          onChange={handleChange}
          value={body.phone}
          size="small"
          label="Telefono"
          name="phone"
        />
      </Modal>
    </>
  );
}
