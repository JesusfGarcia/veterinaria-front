import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";
import { CarContext } from "../../components/dashboard";

const data = [
  {
    name: "coffee",
    date1: "14/02/23",
    obs: "perrito con diarrea de hace dos dias, se le dio medicaento en otra veterinaria",
    trata: "se le puso suero y medicamento",
    date: "17/02/23",
    isPayed: false,
  },
  {
    name: "coffee",
    date1: "14/02/23",
    obs: "perrito con diarrea de hace dos dias, se le dio medicaento en otra veterinaria",
    trata: "se le puso suero y medicamento",
    date: "17/02/23",
    isPayed: true,
  },
  {
    name: "coffee",
    date1: "14/02/23",
    obs: "perrito con diarrea de hace dos dias, se le dio medicaento en otra veterinaria",
    trata: "se le puso suero y medicamento",
    date: "17/02/23",
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
export default function HospitalScreen() {
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

  const title = [
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "Fecha de ingreso",
      key: "date1",
    },
    {
      label: "Observaciones",
      key: "obs",
    },
    {
      label: "Tratamiento",
      key: "trata",
    },

    {
      label: "Fecha de alta",
      key: "date",
    },
    {
      label: "cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "consultas" });
      },
    },
  ];

  return (
    <Container>
      <Content title="Hospital">
        <div className="linea"></div>
        <Table 
         
        buttonConf={buttonConf} columns={title} data={data} />
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
      </Content>
    </Container>
  );
}
