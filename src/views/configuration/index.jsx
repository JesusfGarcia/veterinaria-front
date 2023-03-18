import React from "react";
import Content from "../../components/content";
import Container from "../../components/container";
import Table from "../../components/table";
import Modal, { DeleteDialog } from "../../components/dialog";
import { TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { initialState } from "./reducer/contants";
import { actions } from "./reducer/actions";
import { reducer } from "./reducer";

import apiConsumer from "../../services";

export default function ConfigurationScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: actions.GET_DATA });
        const { data } = await apiConsumer({
          method: "GET",
          url: "/users",
        });
        console.log("data =>", data);
        dispatch({ type: actions.GET_DATA_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: actions.GET_DATA_ERROR,
          payload: error.response?.data?.errors || "Error en el servidor",
        });
      }
    };
    getData();
  }, [state.reload]);

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
        method: "post",
        data: state.form,
        url: "/users",
      });
      dispatch({ type: actions.SAVE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_USER_ERROR,
        payload: error.response?.data?.errors || "Error en el servidor",
      });
    }
  };

  const onEdit = async () => {
    try {
      dispatch({ type: actions.SAVE_USER });
      await apiConsumer({
        method: "put",
        data: state.form,
        url: `/users/${state.form.id}`,
      });
      dispatch({ type: actions.SAVE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_USER_ERROR,
        payload: error.response?.data?.errors || "Error en el servidor",
      });
    }
  };

  const onDelete = async () => {
    try {
      dispatch({ type: actions.SAVE_USER });
      await apiConsumer({
        method: "delete",
        data: state.form,
        url: `/users/${state.form.id}`,
      });
      dispatch({ type: actions.SAVE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_USER_ERROR,
        payload: error.response?.data?.errors || "Error en el servidor",
      });
    }
  };

  const buttonConf = {
    label: "Añadir usuarios",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const titles = React.useMemo(() => {
    return [
      {
        label: "Nombre",
        key: "name",
      },
      {
        label: "Apellido",
        key: "lastName",
      },
      {
        label: "Correo",
        key: "email",
      },
      {
        label: "Tipo",
        key: "type",
      },
      {
        label: "Acciones",
        key: "actions",
        type: "actions",
        actions: [
          {
            label: "see",
            onClick: (id) => {
              const editUser = state.list.find((user) => user.id === id);
              dispatch({ type: actions.ON_EDIT, payload: editUser });
            },
          },
          {
            label: "delete",
            onClick: (id) => {
              const deleteUser = state.list.find((user) => user.id === id);
              dispatch({
                type: actions.OPEN_DELETE_MODAL,
                payload: deleteUser,
              });
            },
          },
        ],
      },
    ];
  }, [state.list]);

  return (
    <Container>
      <Content title="Lista de Usuarios">
        <div className="linea"></div>
        <Table buttonConf={buttonConf} columns={titles} data={state.list} />
        <Modal
          onSave={state.isEdit ? onEdit : onSave}
          title={state.isEdit ? "Editar Usuario" : "Añadir Usuario"}
          isOpen={state.showModal}
          onClose={closeForm}
          isLoading={state.isSaveLoading}
          errorText={state.saveErrorText}
        >
          <TextField
            onChange={handleChange}
            name="name"
            value={state.form.name}
            size="small"
            label="Nombre"
          />
          <TextField
            onChange={handleChange}
            name="lastName"
            value={state.form.lastName}
            size="small"
            label="Apellido"
          />
          <TextField
            onChange={handleChange}
            name="email"
            value={state.form.email}
            size="small"
            label="Correo"
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.form.isAdmin}
                  onChange={() =>
                    handleChange({
                      target: {
                        name: "isAdmin",
                        value: !state.form.isAdmin,
                      },
                    })
                  }
                />
              }
              label="¿El usuario es administrador?"
            />
          </FormGroup>
        </Modal>
        <DeleteDialog
          onSave={onDelete}
          title={`¿Seguro que desea eliminar a ${state.form.name}?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.isSaveLoading}
          errorText={state.saveErrorText}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
