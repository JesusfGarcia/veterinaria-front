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
    label: "Tipo de servicio",
    key: "serviceType",
  },
  {
    label: "Fecha",
    key: "date",
  },

  {
    label: "Precio",
    key: "price",
  },
  {
    label: "Observaciones",
    key: "observations",
  },
  {
    label: "Teléfono",
    key: "phone",
  },
  {
    label: "cobro",
    key: "isPayed",
  },
];
const data = [
  {
    name: "Chester García",
    serviceType: "Baño Grande",
    date: "12/04/23",
    price: "$200",
    observations: "Nervioso",
    phone: "668156498",
    isPayed: false,
  },
  {
    name: "Nicky Lugo",
    serviceType: "Baño Grande",
    date: "7/04/23",
    price: "$300",
    observations: "Usar Bozal",
    phone: "668156498",
    isPayed: true,
  },
  {
    name: "Coffee Soto",
    serviceType: "Baño chico",
    date: "22/07/22",
    price: "$150",
    observations: "Nerviosa",
    phone: "668156498",
    isPayed: false,
  },
];

const initialState = {
  name: "",
  serviceType: "",
  date: "",
  price: "",
  observations: "",
  phone: "",
};

export default function EstheticScreen() {
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
    <Container>
      <Content title="Estetica">
        <div className="linea"></div>
        <Table buttonConf={buttonConf} columns={titles} data={data} />
        <Modal
          onSave={onSave}
          title="Añadir Visita"
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
      </Content>
    </Container>
  );
}
