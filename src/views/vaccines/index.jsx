import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

const titles = [
  {
    label: "Nombre",
    key: "pet",
  },
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
  {
    label: "Cobro",
    key: "isPayed",
  },
];
const data = [
  {
    pet: "coffee",
    date: "14/02/23",
    name: "Sextuple",
    lab: "Merial",
    name2: "MVZ.Thelma",
    date2: "25/02/23",
    isPayed: true,
  },
  {
    pet: "sisi",
    date: "14/02/23",
    name: "Sextuple",
    lab: "Merial",
    name2: "MVZ.Thelma",
    date2: "25/02/23",
    isPayed: false,
  },
];
const initialState = {
  pet: "",
  date: "",
  name: "",
  lab: "",
  name2: "",
  date2: "",
};
export default function VacciensScreen() {
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
    label: "Añadir Vacuna",
    onClick: () => setisOpenModal(true),
  };

  return (
    <Container>
      <Content title="Vacunas">
        <div className="linea"></div>
        <Table buttonConf={buttonConf} columns={titles} data={data} />
        <Modal
          onSave={onSave}
          title="Añadir Vacuna"
          isOpen={isOpenModal}
          onClose={closeForm}
        >
          <TextField
            onChange={handleChange}
            name="pet"
            value={body.pet}
            size="small"
            label="Nombre"
          />
          <TextField
            onChange={handleChange}
            name="date"
            value={body.date}
            size="small"
            label="Fecha de aplicación"
          />
          <TextField
            onChange={handleChange}
            name="name"
            value={body.name}
            size="small"
            label="Nombre de la vacuna"
          />
          <TextField
            onChange={handleChange}
            name="lab"
            value={body.lab}
            size="small"
            label="Laboratorio"
          />
          <TextField
            onChange={handleChange}
            name="name2"
            value={body.name2}
            size="small"
            label="Medico"
          />
          <TextField
            onChange={handleChange}
            name="date2"
            value={body.date2}
            size="small"
            label="Proxima aplicación"
          />
        </Modal>
      </Content>
    </Container>
  );
}
