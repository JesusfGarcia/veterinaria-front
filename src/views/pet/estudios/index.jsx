import { TextField } from "@mui/material";
import React from "react";
import Table from "../../../components/table";
import Modal, { DeleteDialog } from "../../../components/dialog";
import {  CarContext } from "../../../components/dashboard";

import { reducer } from "./reducer";
import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";

import { petContext } from "..";
import apiConsumer from "../../../services";
import { getServerError } from "../../../helpers/getServerError";

import SelectVet from "../../../components/selectVet";

export default function Estudios() {
  const { addToCar } = React.useContext(CarContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { pet } = React.useContext(petContext);

  React.useEffect(() => {
    const getList = async () => {
      try {
        dispatch({ type: actions.GET_LIST });
        const { data } = await apiConsumer({
          method: "GET",
          url: `/diagnostics?petId=${pet.id}&advanced=${state.filterText}`,
        });

        dispatch({ type: actions.GET_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: actions.GET_LIST_ERROR,
          payload: getServerError(error),
        });
      }
    };
    const delay = setTimeout(() => {
      getList();
    }, 500);

    return () => clearTimeout(delay);
  }, [state.reload, pet.id, state.filterText]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.HANDLE_CHANGE, payload: { name, value } });
  };

  const closeForm = () => {
    dispatch({ type: actions.CLOSE_MODAL });
  };

  const buttonConf = {
    label: "Añadir Estudio",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };
  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "POST",
        url: "/diagnostics",
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
        url: `/diagnostics/${state.body.id}`,
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
        url: `/diagnostics/${state.body.id}`,
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
      label: "Fecha",
      key: "date",
    },
    {
      label: "Precio",
      key: "price",
    },
    {
      label: "Tipo de estudio",
      key: "studyType",
    },
    {
      label: "Observaciones",
      key: "observations",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "estudios" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (id) => {
            const editdiagnostics = state.list.find(
              (diagnostics) => diagnostics.id === id
            );
            dispatch({ type: actions.ON_EDIT, payload: editdiagnostics });
          },
        },
        {
          label: "delete",
          onClick: (id) => {
            const deletediagnostics = state.list.find(
              (diagnostics) => diagnostics.id === id
            );
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: deletediagnostics,
            });
          },
        },
      ],
    },
  ];
  return (
    <>
      <Table
        filter={state.filterText}
        setFilter={(text) =>
          dispatch({ type: actions.HANDLE_FILTER_TEXT, payload: text })
        }
        buttonConf={buttonConf}
        columns={titles}
        data={state.list}
      />
      <Modal
        onSave={state.isEdit ? onUpdate : onSave}
        title={state.isEdit ? "Editar Estudios" : `Añadir Estudios`}
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
          type="date"
          label="Fecha"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={handleChange}
          name="studyType"
          value={state.body.studyType}
          size="small"
          label="Tipo de estudio"
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
          name="observations"
          value={state.body.observations}
          size="small"
          label="Observaciones"
          multiline
          minRows={3}
        />
        <SelectVet value={state.body.vetId} onChange={handleChange} />
      </Modal>
      <DeleteDialog
        onSave={onDelete}
        title={`¿Seguro que desea eliminar este estudio?`}
        isOpen={state.showDeleteModal}
        onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
        isLoading={state.loadingSaveList}
        errorText={state.errorTextSaveList}
      ></DeleteDialog>
    </>
  );
}
