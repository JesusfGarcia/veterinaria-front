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

export default function VacciensScreen() {
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
        url: "/vaccination",
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
        url: `/vaccination/${state.body.id}`,
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
        url: `/vaccination/${state.body.id}`,
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
    label: "Añadir Visita",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const titles = [
    {
      label: "Fecha de aplicación",
      key: "date",
    },
    {
      label: "Nombre de la vacuna",
      key: "name",
    },
    {
      label: "Laboratorio",
      key: "laboratory",
    },

    {
      label: "Proxima vacuna",
      key: "nextVaccine",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "vacunas" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (vaccination) => {
            dispatch({ type: actions.ON_EDIT, payload: vaccination });
          },
        },
        {
          label: "delete",
          onClick: (vaccination) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: vaccination,
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
      <Content title="Vacunas">
        <div className="linea"></div>
        <Table
          listFormatter={listFormatter}
          endpoint="/vaccination"
          buttonConf={buttonConf}
          columns={titles}
        />
        <Modal
          onSave={state.isEdit ? onUpdate : onSave}
          title={state.isEdit ? "Editar Visita" : `Añadir Visita`}
          isOpen={state.showModal}
          onClose={closeForm}
          errorText={state.errorTextSaveList}
          isLoading={state.loadingSaveList}
        >
          <TextField
            onChange={handleChange}
            name="date"
            value={state.body.date}
            size="small"
            label="Fecha de aplicación"
          />
          <TextField
            onChange={handleChange}
            name="name"
            value={state.body.name}
            size="small"
            label="Nombre de la vacuna"
          />
          <TextField
            onChange={handleChange}
            name="lab"
            value={state.body.lab}
            size="small"
            label="Laboratorio"
          />

          <TextField
            onChange={handleChange}
            name="nextVaccine"
            value={state.body.nextVaccine}
            size="small"
            label="Proxima aplicación"
          />
        </Modal>
      </Content>
    </Container>
  );
}
