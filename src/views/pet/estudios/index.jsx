import { TextField } from "@mui/material";
import React from "react";
import Table from "../../../components/table";
import Modal from "../../../components/dialog";
import { CarContext } from "../../../components/dashboard";

const data = [
  {
    date: "12/12/22",
    cost: "$250",
    study: "biometria",
    observation: "paciente con sintomas de parvovirus",
    isPayed: false,
  },
  {
    date: "12/12/22",
    cost: "$250",
    study: "biometria",
    observation: "paciente con sintomas de parvovirus",
    isPayed: true,
  },
  {
    date: "12/12/22",
    cost: "$250",
    study: "biometria",
    observation: "paciente con sintomas de parvovirus",
    isPayed: false,
  },
];
const initialState = {
  date: "",
  cost: "",
  study: "",
  observation: "",
};

export default function Estudios() {
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
    label: "Añadir Estudio",
    onClick: () => setisOpenModal(true),
  };
  const titles = [
    {
      label: "Fecha",
      key: "date",
    },
    {
      label: "Costo",
      key: "cost",
    },
    {
      label: "Tipo de estudio",
      key: "study",
    },
    {
      label: "Observaciones",
      key: "observation",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "estudios" });
      },
    },
  ];
  return (
    <>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
      <Modal
        onSave={onSave}
        title="Añadir Estudio"
        isOpen={isOpenModal}
        onClose={closeForm}
      >
        <TextField
          onChange={handleChange}
          name="date"
          value={body.date}
          size="small"
          label="Fecha"
        />
        <TextField
          onChange={handleChange}
          name="cost"
          value={body.shopping_cost}
          size="small"
          label="Precio"
        />
        <TextField
          onChange={handleChange}
          name="study"
          value={body.study}
          size="small"
          label="Estudio"
        />
        <TextField
          onChange={handleChange}
          name="observation"
          value={body.observation}
          size="small"
          label="Observaciones"
        />
      </Modal>
    </>
  );
}
