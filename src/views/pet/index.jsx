import React, { useEffect } from "react";

import ContentCutIcon from "@mui/icons-material/ContentCut";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ScienceIcon from "@mui/icons-material/Science";
import BugReportIcon from "@mui/icons-material/BugReport";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./pet.module.scss";
import Cirugia from "./cirugia";
import Consults from "./consultas";
import Estetica from "./estetica";
import Estudios from "./estudios";
import Parasitos from "./parasitos";
import Vacunas from "./vacunas";
import Hospital from "./hospital";

import Container from "../../components/container";
import { useParams } from "react-router-dom";
import apiConsumer from "../../services";

import { initialState } from "./reducer/contants";
import { actions } from "./reducer/actions";
import { reducer } from "./reducer";
import Modal from "../../components/dialog";
import { TextField } from "@mui/material";
import { getServerError } from "../../helpers/getServerError";

export const petContext = React.createContext({
  pet: {
    id: 0,
    name: "",
    specie: "",
    race: "",
    sex: "",
    color: "",
    birthDate: "",
    allergies: "",
  },
});

export default function PetsScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { id } = useParams();

  React.useEffect(() => {
    const getPetList = async () => {
      try {
        dispatch({ type: actions.GET_USER_INFO });
        const { data } = await apiConsumer({
          url: `/clients/${id}`,
          method: "GET",
        });
        dispatch({ type: actions.GET_USER_INFO_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: actions.GET_USER_INFO_ERROR,
          payload: getServerError(error),
        });
      }
    };
    getPetList();
  }, [id, state.reload]);

  const savePosition = (idx) => {
    dispatch({ type: actions.CHANGE_SCREEN_POSITION, payload: idx });
    //vamos a guardar en local, cual es el valor actual de la pantalla
    sessionStorage.setItem("petScreen", idx);
  };

  useEffect(() => {
    const itemPosition = sessionStorage.getItem("petScreen");
    if (!itemPosition) {
      return;
    }
    dispatch({
      type: actions.CHANGE_SCREEN_POSITION,
      payload: parseInt(itemPosition),
    });
  }, []);

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: actions.HANDLE_INPUT_CHANGE,
      payload: {
        name,
        value,
      },
    });
  };

  const CreatePet = async () => {
    try {
      dispatch({ type: actions.SAVE_PET_INFO });
      await apiConsumer({
        data: {
          ...state.pet,
          ownerId: id,
        },
        method: "POST",
        url: "/pets",
      });
      dispatch({
        type: actions.SAVE_PET_INFO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actions.SAVE_PET_INFO_ERROR,
        payload: getServerError(error),
      });
    }
  };

  const petBody = React.useMemo(() => {
    return state.user.pets[state.petSelected];
  }, [state.petSelected]);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.left_header}>
            {state.petSelected !== null && (
              <>
                <div className={styles.pet}>{petBody.name[0]}</div>
                <div className={styles.col}>
                  <div>
                    <span className={styles.title}>{petBody.name} </span>
                    <span className={styles.caption}>{petBody.birthDate}</span>
                  </div>
                  <span className={styles.subTitle}>{petBody.race}</span>

                  <div>
                    <span className={styles.subTitle}>{petBody.specie} </span>
                    <span className={styles.caption}>{petBody.sex}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.pet_selector}>
            {state.user.pets.map((pet, idx) => {
              return (
                <div
                  onClick={() =>
                    dispatch({ type: actions.SELECT_PET, payload: idx })
                  }
                  className={
                    state.petSelected === idx ? styles.pet_selected : styles.pet
                  }
                >
                  {pet.name[0]}
                </div>
              );
            })}
            <button
              onClick={() => dispatch({ type: actions.OPEN_MODAL })}
              className={styles.add_pet}
            >
              +
            </button>
          </div>
        </div>
        {state.petSelected !== null && (
          <div className={styles.tabs}>
            {items.map((item, position) => (
              <TabItem
                isSelected={state.screenPosition === position}
                onClick={() => savePosition(position)}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
      {state.petSelected !== null && (
        <Container>
          <petContext.Provider value={{ pet: petBody }}>
            {items[state.screenPosition] !== undefined &&
              items[state.screenPosition].component}
          </petContext.Provider>
        </Container>
      )}
      <Modal
        isOpen={state.showModal}
        onClose={() => dispatch({ type: actions.CLOSE_MODAL })}
        isLoading={state.isLoadingSavePet}
        title="Agregar Mascota"
        errorText={state.errorTextSavePet}
        onSave={CreatePet}
      >
        <TextField
          name="name"
          value={state.pet.name}
          size="small"
          label="Nombre"
          onChange={handlePetChange}
        />
        <TextField
          name="specie"
          value={state.pet.specie}
          size="small"
          label="Especie"
          onChange={handlePetChange}
        />
        <TextField
          name="race"
          value={state.pet.race}
          size="small"
          label="Raza"
          onChange={handlePetChange}
        />
        <TextField
          name="sex"
          value={state.pet.sex}
          size="small"
          label="Sexo"
          onChange={handlePetChange}
        />
        <TextField
          name="color"
          value={state.pet.color}
          size="small"
          label="Color"
          onChange={handlePetChange}
        />
        <TextField
          name="birthDate"
          value={state.pet.birthDate}
          size="small"
          label="Fecha de nacimiento"
          type="date"
          onChange={handlePetChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="allergies"
          value={state.pet.allergies}
          size="small"
          label="Alergias"
          onChange={handlePetChange}
        />
      </Modal>
    </div>
  );
}

const items = [
  {
    label: "Consultas",
    component: <Consults />,
    icon: <MonitorHeartIcon />,
  },
  {
    label: "Estéticas",
    component: <Estetica />,
    icon: <ContentCutIcon />,
  },
  {
    label: "Estudios",
    component: <Estudios />,
    icon: <ScienceIcon />,
  },
  {
    label: "Cirugías",
    component: <Cirugia />,
    icon: <BloodtypeIcon />,
  },
  {
    label: "Control Parasitos",
    component: <Parasitos />,
    icon: <BugReportIcon />,
  },
  {
    label: "Vacunas",
    component: <Vacunas />,
    icon: <VaccinesIcon />,
  },
  {
    label: "Hospital",
    component: <Hospital />,
    icon: <LocalHospitalIcon />,
  },
];

const TabItem = ({ item, onClick, isSelected }) => {
  return (
    <div className={isSelected && styles.item_selected} onClick={onClick}>
      {item.icon}
      <span>{item.label}</span>
    </div>
  );
};
