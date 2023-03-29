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

export default function Consults() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { addToCar } = React.useContext(CarContext);
  const { pet } = React.useContext(petContext);

  React.useEffect(() => {
    const getList = async () => {
      try {
        dispatch({ type: actions.GET_LIST });
        const { data } = await apiConsumer({
          method: "GET",
          url: `/appointments?petId=${pet.id}&advanced=${state.filterText}`,
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

  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "POST",
        url: "/appointments",
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
        url: `/appointments/${state.body.id}`,
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
      label: "Descripción",
      key: "description",
    },
    {
      label: "Costo",
      key: "price",
    },
    {
      label: "Tratamiento",
      key: "treatment",
    },
    {
      label: "Fecha",
      key: "date",
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
          onClick: (id) => {
            const editAppointment = state.list.find(
              (appointment) => appointment.id === id
            );
            dispatch({ type: actions.ON_EDIT, payload: editAppointment });
          },
        },
        {
          label: "delete",
          onClick: (id) => {
            const deleteAppointment = state.list.find(
              (appointment) => appointment.id === id
            );
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: deleteAppointment,
            });
          },
        },
      ],
    },
  ];
  return (
    <>
      <Table
        isLoading={state.loadingGetList}
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
        title={state.isEdit ? "Editar Consulta" : `Añadir Consulta`}
        isOpen={state.showModal}
        onClose={closeForm}
        errorText={state.errorTextSaveList}
        isLoading={state.loadingSaveList}
      >
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
          label="Costo"
        />
        <TextField
          onChange={handleChange}
          name="treatment"
          value={state.body.treatment}
          size="small"
          label="Tratamiento"
        />
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
        <SelectVet value={state.body.vetId} onChange={handleChange} />
      </Modal>
      <DeleteDialog
        onSave={onDelete}
        title={`¿Seguro que desea eliminar esta consulta?`}
        isOpen={state.showDeleteModal}
        onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
        isLoading={state.loadingSaveList}
        errorText={state.errorTextSaveList}
      ></DeleteDialog>
    </>
  );
}
