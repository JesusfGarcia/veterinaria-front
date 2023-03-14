import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

import { CarContext } from "../../components/dashboard";

const data = [
  {
    name: "moli",
    date: "12/12/22",
    cost: "$250",
    study: "biometria",
    observation: "paciente con sintomas de parvovirus",
    isPayed: true,
  },
  {
    name: "moli",
    date: "12/12/22",
    cost: "$250",
    study: "biometria",
    observation: "paciente con sintomas de parvovirus",
    isPayed: false,
  },
];
const initialState = {
  name: "",
  date: "",
  cost: "",
  study: "",
  observation: "",
};
export default function StudiesScreen() {
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
    label: "Añadir Estudio",
    onClick: () => setisOpenModal(true),
  };

  const titles = [
    {
      label: "Nombre",
      key: "name",
    },
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
      label: "costo",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "estudios" });
      },
    },
  ];

  return (
    <Container>
      <Content title="Estudios">
        <div className="linea"></div>
        <Table buttonConf={buttonConf} columns={titles} data={data} />
        <Modal
          onSave={onSave}
          title="Añadir Estudio"
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
      </Content>
    </Container>
  );
}
