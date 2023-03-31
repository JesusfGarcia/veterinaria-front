import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";
import Modal, { DeleteDialog } from "../../components/dialog";
import { TextField } from "@mui/material";
import Container from "../../components/container";

import { reducer } from "./reducer";
import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";

import { CarContext } from "../../components/dashboard";
import apiConsumer from "../../services";
import { getServerError } from "../../helpers/getServerError";
import SelectVet from "../../components/selectVet";
import SearchPet from "../../components/searchPet";
import { getFormatedDate } from "../../helpers/getFormatedDate";
import InputFileStudies from "../../components/inputfilestudie";
export default function StudiesScreen() {
  const { addToCar } = React.useContext(CarContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

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
        url: "/diagnostics",
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
        url: `/diagnostics/${state.body.id}`,
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

  const buttonConf = {
    label: "Añadir Estudio",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };
  const handleFile = (base64) => {
    dispatch({
      type: actions.HANDLE_CHANGE,
      payload: { name: "file", value: base64 },
    });
  };
  const titles = [
    {
      label: "Fecha",
      key: "date",
      type: "date",
    },
    {
      label: "Precio",
      key: "price",
      type: "money",
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
      label: "Archivo",
      key: "file",
      type: "file",
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
          onClick: (diagnostics) => {
            dispatch({ type: actions.ON_EDIT, payload: diagnostics });
          },
        },
        {
          label: "delete",
          onClick: (diagnostics) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: diagnostics,
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
      <Content title="Estudios">
        <div className="linea"></div>
        <Table
          listFormatter={listFormatter}
          endpoint="/diagnostics"
          buttonConf={buttonConf}
          columns={titles}
          reload={state.reload}
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
          <SearchPet value={state.body.petId} onChange={handleChange} />
          <InputFileStudies value={state.body.file} setValue={handleFile} />
        </Modal>
        <DeleteDialog
          onSave={onDelete}
          title={`¿Seguro que desea eliminar este estudio?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.loadingSaveList}
          errorText={state.errorTextSaveList}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
