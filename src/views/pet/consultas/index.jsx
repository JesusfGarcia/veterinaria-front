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
    label: "Tratamiento",
    key: "treatment",
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
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
    isPayed: false,
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
    isPayed: true,
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
    isPayed: true,
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
    isPayed: true,
  },
  {
    description: "Perrito enfermito",
    cost: 50.0,
    treatment: "una sobadita de panza",
    date: "12/12/2022",
    isPayed: false,
  },
];

const initialState = {
  description: "",
  cost: "",
  treatment: "",
  date: "",
};

export default function Consults() {
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
    label: "Añadir Consulta",
    onClick: () => setisOpenModal(true),
  };
  return (
    <>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Añadir Consulta"
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
          multiline
          minRows={3}
        />
        <TextField
          onChange={handleChange}
          name="cost"
          value={body.cost}
          size="small"
          label="Costo"
        />
        <TextField
          onChange={handleChange}
          name="treatament"
          value={body.treatment}
          size="small"
          label="Tratamiento"
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
