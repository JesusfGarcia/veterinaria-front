import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

export const data = [
  {
    name: "Anna Soto Ochoa",
    number: "6681335606",
    address: "calle cerro de san antonio NO.2160",
    city: "Los Mochis",
    state: "Sinaloa",
    pet: "coffee Soto",
    id: "4589",
  },
  {
    name: "Alhely Lugo Celaya",
    number: "66898754",
    address: "calle cerro de san antonio NO.2160",
    city: "Los Mochis",
    state: "Sinaloa",
    pet: "Frida Lugo",
    id: "1989",
  },
  {
    name: "Jesús García",
    number: "66836598",
    address: "calle cerro de san antonio NO.2160",
    city: "Los Mochis",
    state: "Sinaloa",
    pet: "Chester García",
    id: "9852",
  },
  {
    name: "Felipe Martinez",
    number: "668987523",
    address: "calle cerro de san antonio NO.2160",
    city: "Los Mochis",
    state: "Sinaloa",
    pet: "nachito martinez",
    id: "7942",
  },
];
const initialState = {
  name: "",
  number: "",
  address: "",
  city: "",
  state: "",
  pet: "",

};
export default function UsersScreen() {
  const navigate = useNavigate();

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
    label: "Añadir Cliente",
    onClick: () => setisOpenModal(true),
  };

  const title = [
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "Número de telefono",
      key: "number",
    },
    {
      label: "Dirección",
      key: "address",
    },
    {
      label: "Ciudad",
      key: "city",
    },
    {
      label: "Estado",
      key: "state",
    },
    {
      label: "Mascota",
      key: "pet",
    },
    {
      label: "ID",
      key: "id",
    },
    {
      label: "ver",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (id) => navigate(`${id}`),
        },
      ],
    },
  ];
  return (
    <Container>

   
    <Content title="Clientes">
      <div className="linea"></div>

      <Table buttonConf={buttonConf} columns={title} data={data} />
      <Modal
        onSave={onSave}
        isOpen={isOpenModal}
        title="Añadir cliente"
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
          name="number"
          value={body.number}
          size="small"
          label="Número"
        />
        <TextField
          onChange={handleChange}
          name="address"
          value={body.address}
          size="small"
          label="Dirección"
        />
        <TextField
          onChange={handleChange}
          name="city"
          value={body.city}
          size="small"
          label="Ciudad"
        />
        <TextField
          onChange={handleChange}
          name="state"
          value={body.state}
          size="small"
          label="Estado"
        />
        <TextField
          onChange={handleChange}
          name="pet"
          value={body.pet}
          size="small"
          label="Mascota"
        />
      </Modal>
    </Content>
    </Container>
  );
}
