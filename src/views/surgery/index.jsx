import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal, { DeleteDialog } from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

import { CarContext } from "../../components/dashboard";
import { actions } from "./reducer/actions";

import { reducer } from "./reducer";

import { initialState } from "./reducer/constants";

import apiConsumer from "../../services";
import { getServerError } from "../../helpers/getServerError";

import SelectVet from "../../components/selectVet";
import SearchPet from "../../components/searchPet";
import { getFormatedDate } from "../../helpers/getFormatedDate";

export default function SurgeryScreen() {
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
        url: "/surgeries",
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
        url: `/surgeries/${state.body.id}`,
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
        url: `/surgeries/${state.body.id}`,
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
    label: "Añadir Cirugía",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };

  const title = [
    {
      label: "Fecha",
      key: "date",
      type: "date",
    },
    {
      label: "Categoría",
      key: "category",
    },
    {
      label: "Precio",
      key: "price",
      type: "money",
    },
    {
      label: "Observaciones",
      key: "description",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "cirugias" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (surgery) =>
            dispatch({ type: actions.ON_EDIT, payload: surgery }),
        },
        {
          label: "delete",
          onClick: (surgery) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: surgery,
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
      <Content title="Cirugías">
        <div className="linea"></div>
        <Table
          buttonConf={buttonConf}
          columns={title}
          endpoint="/surgeries"
          listFormatter={listFormatter}
          reload={state.reload}
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
            type="date"
            label="Fecha"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            onChange={handleChange}
            name="category"
            value={state.body.category}
            size="small"
            label="Tipo de Cirugia"
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
            name="description"
            value={state.body.description}
            size="small"
            label="Observaciones"
            multiline
            minRows={3}
          />
          <SelectVet value={state.body.vetId} onChange={handleChange} />
          <SearchPet value={state.body.petId} onChange={handleChange} />
        </Modal>
        <DeleteDialog
          onSave={onDelete}
          title={`¿Seguro que desea eliminar esta Cirugia?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.loadingSaveList}
          errorText={state.errorTextSaveList}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
