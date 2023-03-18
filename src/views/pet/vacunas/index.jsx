import React from "react";
import Table from "../../../components/table";
import Modal from "../../../components/dialog";
import { TextField } from "@mui/material";
import { CarContext } from "../../../components/dashboard";

const data = [
  {
    date: "14/02/23",
    name: "Sextuple",
    lab: "Merial",
    doctor: "MVZ.Thelma",
    nextDate: "25/02/23",
    isPayed: true,
  },
  {
    date: "14/02/23",
    name: "Sextuple",
    lab: "Merial",
    doctor: "MVZ.Thelma",
    nextDate: "25/02/23",
    isPayed: false,
  },
];
const initialState = {
  date: "",
  name: "",
  lab: "",
  doctor: "",
  nextDate: "",
};
export default function Vacunas() {
  const [isOpenModal, setisOpenModal] = React.useState(false);
  const [body, setBody] = React.useState({ ...initialState });
  const { addToCar } = React.useContext(CarContext);
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
  
  };
  const buttonConf = {
    label: "Ingresar paciente",
    onClick: () => setisOpenModal(true),
  };
  const titles = [
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
      key: "doctor",
    },
    {
      label: "Proxima vacuna",
      key: "nextDate",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "parasitologia" });
      },
    },
  ];
  return (
    <>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Añadir Vacuna"
        isOpen={isOpenModal}
        onClose={closeForm}
      >
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
          name="doctor"
          value={body.doctor}
          size="small"
          label="Medico"
        />
        <TextField
          onChange={handleChange}
          name="nextDate"
          value={body.nextDate}
          size="small"
          label="Proxima aplicación"
        />
      </Modal>
    </>
  );
}
