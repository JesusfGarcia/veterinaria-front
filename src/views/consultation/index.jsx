import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal, { DeleteDialog } from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

import { CarContext } from "../../components/dashboard";

import { reducer } from "./reducer";
import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";
import apiConsumer from "../../services";
import { getServerError } from "../../helpers/getServerError";
import SelectVet from "../../components/selectVet";
import SearchPet from "../../components/searchPet";
import { getFormatedDate } from "../../helpers/getFormatedDate";

export default function ConsultationScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { addToCar } = React.useContext(CarContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.HANDLE_CHANGE, payload: { name, value } });
  };

  const closeForm = () => {
    dispatch({ type: actions.CLOSE_MODAL });
  };

  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "POST",
        url: "/appointments",
        data: state.body,
      });
      dispatch({ type: actions.SAVE_LIST_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_LIST_ERROR,
        payload: getServerError(error),
      });
    }
  };

  const onUpdate = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "PUT",
        url: `/appointments/${state.body.id}`,
        data: state.body,
      });
      dispatch({ type: actions.SAVE_LIST_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_LIST_ERROR,
        payload: getServerError(error),
      });
    }
  };

  const onDelete = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "DELETE",
        url: `/appointments/${state.body.id}`,
      });
      dispatch({ type: actions.SAVE_LIST_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_LIST_ERROR,
        payload: getServerError(error),
      });
    }
  };

  const buttonConf = {
    label: "Añadir Consulta",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const titles = [
    {
      label: "Fecha",
      key: "date",
      type: "date",
    },
    {
      label: "Descripción",
      key: "description",
    },
    {
      label: "Precio",
      key: "price",
      type: "money",
    },
    {
      label: "Tratamiento",
      key: "treatment",
    },

    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "consulta" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (appointments) => {
            dispatch({ type: actions.ON_EDIT, payload: appointments });
          },
        },
        {
          label: "delete",
          onClick: (appointments) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: appointments,
            });
          },
        },
      ],
    },
  ];

  const listFormatter = (item) => {
    return {
      ...item,
      date: getFormatedDate(item.date),
    };
  };
  return (
    <Container>
      <Content title="Consultas">
        <div className="linea"></div>
        <Table
          listFormatter={listFormatter}
          endpoint="/appointments"
          buttonConf={buttonConf}
          columns={titles}
          reload={state.reload}
        />

        <Modal
          onSave={state.isEdit ? onUpdate : onSave}
          title={state.isEdit ? "Editar Consulta" : `Añadir Consulta`}
          isOpen={state.showModal}
          onClose={closeForm}
          errorText={state.errorTextSaveList}
          isLoading={state.loadingSaveList}
          reload={state.reload}
        >
          <TextField
            onChange={handleChange}
            name="date"
            value={state.body.date}
            size="small"
            type="date"
            label="Fecha"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            onChange={handleChange}
            name="description"
            value={state.body.description}
            size="small"
            label="Descripción"
            multiline
            minRows={3}
          />
          <TextField
            onChange={handleChange}
            name="price"
            value={state.body.price}
            size="small"
            label="Precio"
          />
          <TextField
            onChange={handleChange}
            name="treatment"
            value={state.body.treatment}
            size="small"
            label="Tratamiento"
          />

          <SelectVet value={state.body.vetId} onChange={handleChange} />
          <SearchPet value={state.body.petId} onChange={handleChange} />
        </Modal>
        <DeleteDialog
          onSave={onDelete}
          title={`¿Seguro que desea eliminar esta consulta?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.loadingSaveList}
          errorText={state.errorTextSaveList}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
