import React from "react";
import Table from "../../../components/table";
import Modal from "../../../components/dialog";
import { TextField } from "@mui/material";
import { CarContext } from "../../../components/dashboard";

const data = [
  {
    entryDate: "12/12/22",
    observation: "perrito aja con algo ",
    treatment: "yo que se no le se",
    dischargeDate: "12/3/23",
    isPayed: false,
  },
];

const initialState = {
  name: "",
  date1: "",
  obs: "",
  trata: "",
  date: "",
};
export default function Hospital() {
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
    console.log(body);
  };
  const buttonConf = {
    label: "Ingresar paciente",
    onClick: () => setisOpenModal(true),
  };
  const titles = [
    {
      label: "Fecha de ingreso",
      key: "entryDate",
    },
    {
      label: "Observaciones",
      key: "observation",
    },
    {
      label: "Tratamiento",
      key: "treatment",
    },
    {
      label: "Fecha de de alta",
      key: "dischargeDate",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "consulta" });
      },
    },
  ];
  return (
    <>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Ingresar paciente"
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
          name="name"
          value={body.name}
          size="samll"
          label="Nombre"
        />

        <TextField
          onChange={handleChange}
          name="date1"
          value={body.date1}
          size="samll"
          label="Fecha de ingreso"
        />
        <TextField
          onChange={handleChange}
          name="obs"
          value={body.obs}
          size="small"
          label="Observaciones"
        />
        <TextField
          onChange={handleChange}
          name="trata"
          value={body.trata}
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
