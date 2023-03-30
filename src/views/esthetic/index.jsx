import React from "react";

import Content from "../../components/content";
import Table from "../../components/table";
import Modal, { DeleteDialog } from "../../components/dialog";
import { MenuItem, Select, TextField } from "@mui/material";
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

export default function EstheticScreen() {
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
        url: "/groomings",
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
        url: `/groomings/${state.body.id}`,
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
        url: `/groomings/${state.body.id}`,
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
      label: "Observaciones",
      key: "observations",
    },
    {
      label: "Costo",
      key: "price",
    },
    {
      label: "Tipo",
      key: "serviceType",
    },
    {
      label: "Fecha",
      key: "date",
    },
    {
      label: "Cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "estetica" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (grooming) => {
            dispatch({ type: actions.ON_EDIT, payload: grooming });
          },
        },
        {
          label: "delete",
          onClick: (grooming) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: grooming,
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
      <Content title="Estetica">
        <div className="linea"></div>
        <Table
          listFormatter={listFormatter}
          endpoint="/groomings"
          buttonConf={buttonConf}
          columns={titles}
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
          <Select
            value={state.body.serviceType}
            onChange={handleChange}
            name="serviceType"
          >
            <MenuItem value="tipo de servicio">Tipo de Servicio</MenuItem>
            <MenuItem value="baño">baño</MenuItem>
            <MenuItem value="corte y baño">corte y baño</MenuItem>
          </Select>
          <TextField
            onChange={handleChange}
            name="price"
            value={state.body.price}
            size="small"
            label="Costo"
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
          <TextField
            onChange={handleChange}
            name="observations"
            value={state.body.observations}
            size="small"
            label="Descripción"
            multiline
            minRows={3}
          />
          <SelectVet value={state.body.vetId} onChange={handleChange} />
          <SearchPet value={state.body.petId} onChange={handleChange} />
        </Modal>
        <DeleteDialog
          onSave={onDelete}
          title={`¿Seguro que desea eliminar esta visita?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.loadingSaveList}
          errorText={state.errorTextSaveList}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
