import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

import { initialState } from "./reducer/constants";
import { actions } from "./reducer/actions";
import { reducer } from "./reducer";

import apiConsumer from "../../services";
import { getServerError } from "../../helpers/getServerError";

export default function UsersScreen() {
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.HANDLE_CHANGE, payload: { name, value } });
  };

  const closeForm = () => {
    dispatch({ type: actions.CLOSE_MODAL });
  };

  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_USER });
      await apiConsumer({
        method: "POST",
        data: state.client,
        url: "/clients",
      });
      dispatch({ type: actions.SAVE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_USER_ERROR,
        payload: getServerError(error),
      });
    }
  };
  const buttonConf = {
    label: "Añadir Cliente",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const title = [
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "Apellido",
      key: "lastName",
    },
    {
      label: "Número de telefono",
      key: "phone",
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
      label: "ver",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (item) => navigate(`${item.id}`),
        },
      ],
    },
  ];
  return (
    <Container>
      <Content title="Clientes">
        <div className="linea"></div>
        <Table endpoint="/clients" buttonConf={buttonConf} columns={title} />
        <Modal
          onSave={onSave}
          isOpen={state.showModal}
          title="Añadir cliente"
          onClose={closeForm}
          errorText={state.textErrorSave}
          isLoading={state.isLoadingSave}
        >
          <TextField
            onChange={handleChange}
            name="name"
            value={state.client.name}
            size="small"
            label="Nombre"
          />
          <TextField
            onChange={handleChange}
            name="lastName"
            value={state.client.lastName}
            size="small"
            label="Apellido"
          />
          <TextField
            onChange={handleChange}
            name="phone"
            value={state.client.phone}
            size="small"
            label="Número de telefono"
          />
          <TextField
            onChange={handleChange}
            name="address"
            value={state.client.address}
            size="small"
            label="Dirección"
          />
          <TextField
            onChange={handleChange}
            name="city"
            value={state.client.city}
            size="small"
            label="Ciudad"
          />
          <TextField
            onChange={handleChange}
            name="state"
            value={state.client.state}
            size="small"
            label="Estado"
          />
        </Modal>
      </Content>
    </Container>
  );
}
