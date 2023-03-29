import React from "react";
import Content from "../../components/content";
import Container from "../../components/container";
import Table from "../../components/table";
import Modal, { DeleteDialog } from "../../components/dialog";
import { TextField, Pagination } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { initialState } from "./reducer/contants";
import { actions } from "./reducer/actions";
import { reducer } from "./reducer";
import { getServerError } from "../../helpers/getServerError";
import apiConsumer from "../../services";

export default function ConfigurationScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: actions.GET_DATA });
        const { data } = await apiConsumer({
          method: "GET",
          url: `/users?page=${state.page}&pageSize=${state.pageSize}&advanced=${state.filterText}`,
        });

        dispatch({ type: actions.GET_DATA_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: actions.GET_DATA_ERROR,
          payload: getServerError(error),
        });
      }
    };
    const delay = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(delay);
  }, [state.filterText, state.reload, state.page, state.pageSize]);

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
        data: state.body,
        url: "/users",
      });
      dispatch({ type: actions.SAVE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_USER_ERROR,
        payload: getServerError(error),
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
        payload: getServerError(error),
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
        payload: getServerError(error),
      });
    }
  };

  const buttonConf = {
    label: "Añadir usuarios",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const titles = [
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
            const edituser = state.list.find((users) => users.id === id);
            dispatch({ type: actions.ON_EDIT, payload: edituser });
          },
        },
        {
          label: "delete",
          onClick: (id) => {
            const edituser = state.list.find((users) => users.id === id);
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: edituser,
            });
          },
        },
      ],
    },
  ];

  return (
    <Container>
      <Content title="Lista de Usuarios">
        <div className="linea"></div>
        <Table
          isLoading={state.isLoading}
          buttonConf={buttonConf}
          columns={titles}
          data={state.list}
          filter={state.filterText}
          setFilter={(text) =>
            dispatch({ type: actions.HANDLE_FILTER_TEXT, payload: text })
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Pagination
            page={state.page}
            onChange={(e, value) =>
              dispatch({ type: actions.CHANGE_PAGE, payload: value })
            }
            count={state.count}
            color="primary"
          />
        </div>
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
            value={state.body.name}
            size="small"
            label="Nombre"
          />
          <TextField
            onChange={handleChange}
            name="lastName"
            value={state.body.lastName}
            size="small"
            label="Apellido"
          />
          <TextField
            onChange={handleChange}
            name="email"
            value={state.body.email}
            size="small"
            label="Correo"
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.body.isAdmin}
                  onChange={() =>
                    handleChange({
                      target: {
                        name: "isAdmin",
                        value: !state.body.isAdmin,
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
          title={`¿Seguro que desea eliminar a ${state.body.name}?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.isSaveLoading}
          errorText={state.saveErrorText}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
