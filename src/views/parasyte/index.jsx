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
import SelectParasyte from "../../components/selectParasyte";

export default function ParasyteScreen() {
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
        url: "/parasitologies",
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
        url: `/parasitologies/${state.body.id}`,
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

  const buttonConf = {
    label: "Añadir Registro",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };
  const titles = [
    {
      label: "Fecha de aplicación",
      key: "dateApplication",
      type: "date",
    },
    {
      label: "Mascota",
      key: "petName",
    },
    {
      label: "Tipo de parasito",
      key: "spanishType",
    },

    {
      label: "Producto",
      key: "product",
    },
    {
      label: "Precio",
      key: "price",
      type: "money",
    },
    {
      label: "Peso",
      key: "weight",
    },
    {
      label: "Proxima aplicación",
      key: "nextApplication",
      type: "date",
    },
    {
      label: "cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "parasitos" });
      },
    },
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (parasyte) => {
            dispatch({ type: actions.ON_EDIT, payload: parasyte });
          },
        },
        {
          label: "delete",
          onClick: (parasyte) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: parasyte,
            });
          },
        },
      ],
    },
  ];

  const listFormatter = (item) => {
    return {
      ...item,
      spanishType: item.type === "INTERNAL" ? "Interno" : "Externo",
      nextApplication: getFormatedDate(item.nextApplication),
      dateApplication: getFormatedDate(item.dateApplication),
      petName: `${item.pet.name} ${item.pet.lastName}`,
    };
  };

  const changeParasyteType = (value) => {
    dispatch({
      type: actions.HANDLE_CHANGE,
      payload: {
        name: "type",
        value,
      },
    });
  };

  return (
    <Container>
      <Content title="Parasitos">
        <div className="linea"></div>
        <Table
          listFormatter={listFormatter}
          endpoint="/parasitologies"
          buttonConf={buttonConf}
          columns={titles}
          reload={state.reload}
          filterByDate
          filterByParasyte
        />
        <Modal
          onSave={state.isEdit ? onUpdate : onSave}
          title={state.isEdit ? "Editar Registro" : `Añadir Registro`}
          isOpen={state.showModal}
          onClose={closeForm}
          errorText={state.errorTextSaveList}
          isLoading={state.loadingSaveList}
          reload={state.reload}
        >
          <SelectParasyte
            value={state.body.type}
            onChange={changeParasyteType}
          />
          <TextField
            onChange={handleChange}
            name="product"
            value={state.body.product}
            size="small"
            label="Producto"
          />
          <TextField
            onChange={handleChange}
            name="dateApplication"
            value={state.body.dateApplication}
            size="samll"
            label="Fecha de aplicación"
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
            name="nextApplication"
            value={state.body.nextApplication}
            size="small"
            label="Proxima aplicación"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            onChange={handleChange}
            name="price"
            value={state.body.price}
            size="small"
            label="precio"
          />
          <SelectVet value={state.body.vetId} onChange={handleChange} />
          <SearchPet value={state.body.petId} onChange={handleChange} />
        </Modal>
        <DeleteDialog
          onSave={onDelete}
          title={`¿Seguro que desea eliminar este registro?`}
          isOpen={state.showDeleteModal}
          onClose={() => dispatch({ type: actions.CLOSE_DELETE_MODAL })}
          isLoading={state.loadingSaveList}
          errorText={state.errorTextSaveList}
        ></DeleteDialog>
      </Content>
    </Container>
  );
}
