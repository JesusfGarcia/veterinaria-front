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
import TextEditor from "../../../components/textEditor";
export default function Hospital() {
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

  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      const body = { ...state.body };
      if (!body.departureDate) {
        delete body.departureDate;
      }
      await apiConsumer({
        method: "POST",
        url: "/hospitals",
        data: {
          ...body,
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
        url: `/hospitals/${state.body.id}`,
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
        url: `/hospitals/${state.body.id}`,
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
    label: "Ingresar paciente",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const titles = [
    {
      label: "Fecha de ingreso",
      key: "admissionDate",
      type: "date",
    },
    {
      label: "Observaciones",
      key: "observations",
    },

    {
      label: "Precio",
      key: "price",
      type: "money",
    },
    {
      label: "Fecha de de alta",
      key: "departureDate",
      type: "date",
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
          onClick: (item) => {
            dispatch({ type: actions.ON_EDIT, payload: item.id });
          },
        },
        {
          label: "delete",
          onClick: (item) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: item.id,
            });
          },
        },
      ],
    },
  ];

  const listFormatter = (item) => {
    return {
      ...item,
      admissionDate: getFormatedDate(item.admissionDate),
      departureDate: getFormatedDate(item.departureDate),
    };
  };
  const setEditorValue = (value) => {
    dispatch({
      type: actions.HANDLE_CHANGE,
      payload: { name: "treatment", value },
    });
  };
  return (
    <>
      <Table
        endpoint={`/hospitals?petId=${pet.id}`}
        buttonConf={buttonConf}
        columns={titles}
        reload={state.reload}
        listFormatter={listFormatter}
        filterByDate
      />
      <Modal
        onSave={state.isEdit ? onUpdate : onSave}
        title={
          state.isEdit ? "Editar Hospitalización" : `Añadir Hospitalización`
        }
        isOpen={state.showModal}
        onClose={closeForm}
        errorText={state.errorTextSaveList}
        isLoading={state.loadingSaveList}
      >
        <TextField
          onChange={handleChange}
          name="observations"
          value={state.body.observations}
          size="small"
          label="Observaciones"
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
          name="admissionDate"
          value={state.body.admissionDate}
          size="small"
          type="date"
          label="Fecha De ingreso"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={handleChange}
          name="departureDate"
          value={state.body.departureDate}
          size="small"
          type="date"
          label="Fecha de salida"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SelectVet value={state.body.vetId} onChange={handleChange} />
        <TextEditor
          value={state.body.treatment}
          text="Ir a Tratamiento"
          setValue={setEditorValue}
        />
      </Modal>
      <DeleteDialog
        onSave={onDelete}
        title={`¿Seguro que desea eliminar esta hospitalización?`}
        isOpen={state.showDeleteModal}
        onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
        isLoading={state.loadingSaveList}
        errorText={state.errorTextSaveList}
      ></DeleteDialog>
    </>
  );
}
