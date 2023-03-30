import React from "react";
import Table from "../../../components/table";
import Modal, { DeleteDialog } from "../../../components/dialog";
import { TextField } from "@mui/material";
import { CarContext } from "../../../components/dashboard";
import { reducer } from "./reducer";
import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";

import SelectVet from "../../../components/selectVet";
import apiConsumer from "../../../services";

import { petContext } from "..";
import { getServerError } from "../../../helpers/getServerError";
import { getFormatedDate } from "../../../helpers/getFormatedDate";

export default function Vacunas() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { pet } = React.useContext(petContext);
  const { addToCar } = React.useContext(CarContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.HANDLE_CHANGE, payload: { name, value } });
  };

  const closeForm = () => {
    dispatch({ type: actions.CLOSE_MODAL });
  };
  const buttonConf = {
    label: "Añadir Vacuna",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };
  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "POST",
        url: "/vaccinations",
        data: {
          ...state.body,
          petId: pet.id,
        },
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
        url: `/vaccinations/${state.body.id}`,
        data: {
          ...state.body,
          petId: pet.id,
        },
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
        url: `/vaccinations/${state.body.id}`,
      });
      dispatch({ type: actions.SAVE_LIST_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.SAVE_LIST_ERROR,
        payload: getServerError(error),
      });
    }
  };

  const titles = [
    {
      label: "Nombre de la vacuna",
      key: "name",
    },
    {
      label: "Precio",
      key: "price",
    },
    {
      label: "Fecha de aplicación",
      key: "date",
    },
    {
      label: "Laboratorio",
      key: "laboratory",
    },
    {
      label: "Próxima Vacuna",
      key: "nextVaccine",
    },
    {
      label: "Fecha de próxima aplicación",
      key: "nextVaccineDate",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "parasitologia" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (item) => {
            dispatch({ type: actions.ON_EDIT, payload: item });
          },
        },
        {
          label: "delete",
          onClick: (item) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: item,
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
      nextVaccineDate: getFormatedDate(item.nextVaccineDate),
    };
  };
  return (
    <>
      <Table
        buttonConf={buttonConf}
        columns={titles}
        endpoint={`/vaccinations?petId=${pet.id}`}
        reload={state.reload}
        listFormatter={listFormatter}
      />
      <Modal
        onSave={state.isEdit ? onUpdate : onSave}
        title={state.isEdit ? "Editar Vacuna" : `Añadir Vacuna`}
        isOpen={state.showModal}
        onClose={closeForm}
        errorText={state.errorTextSaveList}
        isLoading={state.loadingSaveList}
      >
        <TextField
          onChange={handleChange}
          name="name"
          value={state.body.name}
          size="small"
          label="Nombre de la Vacuna"
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
          name="date"
          value={state.body.date}
          size="small"
          label="Fecha de Aplicación"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={handleChange}
          name="laboratory"
          value={state.body.laboratory}
          size="small"
          label="Laboratorio"
        />
        <TextField
          onChange={handleChange}
          name="nextVaccine"
          value={state.body.nextVaccine}
          size="small"
          label="Proxima Vacuna"
        />
        <TextField
          onChange={handleChange}
          name="nextVaccineDate"
          value={state.body.nextVaccineDate}
          size="small"
          label="Fecha de Proxima aplicación"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SelectVet value={state.body.vetId} onChange={handleChange} />
      </Modal>
      <DeleteDialog
        onSave={onDelete}
        title={`¿Seguro que desea eliminar esta Vacuna?`}
        isOpen={state.showDeleteModal}
        onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
        isLoading={state.loadingSaveList}
        errorText={state.errorTextSaveList}
      ></DeleteDialog>
    </>
  );
}
