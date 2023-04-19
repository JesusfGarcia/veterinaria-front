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
import { useNavigate } from "react-router-dom";

import styles from "./hospital.module.scss";
import TextEditor, { TableTextEditor } from "../../components/textEditor";
export default function HospitalScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { addToCar } = React.useContext(CarContext);
  const navigate = useNavigate();
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
        data: body,
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
    label: "Añadir Visita",
    onClick: () => dispatch({ type: actions.OPEN_MODAL }),
  };
  const titles = [
    {
      label: "Fecha de ingreso",
      key: "admissionDate",
      type: "date",
    },
    {
      label: "Mascota",
      key: "petName",
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
      label: "Fecha de alta",
      key: "departureDate",
      type: "date",
    },
    /*   {
      label: "cobro",
      key: "isPayed",
      onClick: (product) => {
        addToCar({ item: product, origin: "consultas" });
      },
    }, */
    {
      label: "Acciones",
      key: "actions",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: (hospitals) => {
            dispatch({ type: actions.ON_EDIT, payload: hospitals });
          },
        },
        {
          label: "textEditor",
          onClick: (appointments) => {
            dispatch({ type: actions.OPEN_TEXT_EDITOR, payload: appointments });
          },
        },
        {
          label: "delete",
          onClick: (hospitals) => {
            dispatch({
              type: actions.OPEN_DELETE_MODAL,
              payload: hospitals,
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
      petName: `${item.pet.name} ${item.pet.lastName}`,
    };
  };
  const setEditorValue = (value) => {
    dispatch({
      type: actions.HANDLE_CHANGE,
      payload: { name: "treatment", value },
    });
  };

  const saveTreatment = async () => {
    try {
      await apiConsumer({
        method: "PUT",
        url: `/hospitals/${state.body.id}`,
        data: state.body,
      });
      dispatch({ type: actions.CLOSE_TEXT_EDITOR });
    } catch (error) {
      dispatch({
        type: actions.SAVE_LIST_ERROR,
        payload: getServerError(error),
      });
    }
  };
  return (
    <Container>
      <Content title="Hospital">
        <div className="linea"></div>
        <Table
          listFormatter={listFormatter}
          endpoint="/hospitals"
          buttonConf={buttonConf}
          columns={titles}
          reload={state.reload}
          filterByDate
        />
        <Modal
          onSave={state.isEdit ? onUpdate : onSave}
          title={state.isEdit ? "Editar Visita" : `Añadir Visita`}
          isOpen={state.showModal}
          onClose={closeForm}
          errorText={state.errorTextSaveList}
          isLoading={state.loadingSaveList}
          reload={state.reload}
        >
          <TextField
            onChange={handleChange}
            name="admissionDate"
            value={state.body.admissionDate}
            size="samll"
            label="Fecha de ingreso"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
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

          <TextField
            onChange={handleChange}
            name="departureDate"
            value={state.body.departureDate}
            size="small"
            label="Fecha de Alta"
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

          <div className={styles.row}>
            <TextEditor
              value={state.body.treatment}
              text="Ir a Tratamiento"
              setValue={setEditorValue}
            />
            {state.body.pet && (
              <span
                className={styles.link}
                onClick={() => {
                  navigate(
                    `/admin/users/${state.body.pet.owner.id}?pet=${state.body.pet.id}&module=studies`
                  );
                }}
              >
                ver/agregar estudios
              </span>
            )}
          </div>
        </Modal>
        <TableTextEditor
          setValue={setEditorValue}
          value={state.body.treatment}
          showModal={state.showTextEditor}
          onClose={saveTreatment}
        />
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
