import React from "react";
import Table from "../../../../components/table";
import { TextField } from "@mui/material";
import Modal, { DeleteDialog } from "../../../../components/dialog";
import { CarContext } from "../../../../components/dashboard";
import { reducer } from "./reducer";
import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";

import apiConsumer from "../../../../services";

import SelectVet from "../../../../components/selectVet";
import { getServerError } from "../../../../helpers/getServerError";
import { petContext } from "../..";

export default function ParasitosExternos() {
  const { addToCar } = React.useContext(CarContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { pet } = React.useContext(petContext);
  /*   React.useEffect(() => {
    const getList = async () => { 
      try {
        dispatch({ type: actions.GET_LIST });
        const { data } = await apiConsumer({
          method: "GET",
          url: `/parasitologies?petId=${pet.id}&advanced=${state.filterText}`,
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
  }, [state.reload, pet.id, state.filterText]); */

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.HANDLE_CHANGE, payload: { name, value } });
  };

  const closeForm = () => {
    dispatch({ type: actions.CLOSE_MODAL });
  };
  const buttonConf = {
    label: "Añadir Aplicacion",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };
  const onSave = async () => {
    try {
      dispatch({ type: actions.SAVE_LIST });
      await apiConsumer({
        method: "POST",
        url: "/parasitologies",
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
        url: `/parasitologies/${state.body.id}`,
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
        url: `/parasitologies/${state.body.id}`,
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
      label: "Poducto",
      key: "type",
    },
    {
      label: "Fecha de aplicación",
      key: "dateApplication",
    },
    {
      label: "Peso",
      key: "weight",
    },
    {
      label: "Proxima Aplicación",
      key: "nextApplication",
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
        isLoading={state.loadingGetList}
        filter={state.filterText}
        setFilter={(text) =>
          dispatch({ type: actions.HANDLE_FILTER_TEXT, payload: text })
        }
        buttonConf={buttonConf}
        columns={titles}
        data={state.list}
        filterByDate
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
          name="type"
          value={state.body.type}
          size="small"
          label="Producto"
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
          name="dateApplication"
          value={state.body.dateApplication}
          size="small"
          label="Fecha"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={handleChange}
          name="weight"
          value={state.body.weight}
          size="small"
          label="Peso"
        />
        <TextField
          onChange={handleChange}
          name=" nextApplication"
          value={state.body.nextApplication}
          size="small"
          label="Proxima Fecha de aplicación"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
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
