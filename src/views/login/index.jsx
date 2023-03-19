import { Card, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button";

import styles from "./login.module.scss";

import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";
import { reducer } from "./reducer";
import apiConsumer from "../../services";
import ErrorTag from "../../components/errorTag";

import { authContext } from "../../App";
import Modal from "../../components/dialog";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(authContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({ type: actions.HANDLE_USER_CHANGES, payload: { value, name } });
  };

  const tryLogin = async () => {
    try {
      dispatch({ type: actions.LOGIN });
      const { data } = await apiConsumer({
        url: "/login",
        data: state.user,
        method: "POST",
      });
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: data.token,
      });
      localStorage.setItem("email", state.user.email);
      localStorage.setItem("password", state.user.password);
      localStorage.setItem("token", data.token);
      handleLogin(data.payload);
    } catch (error) {
      dispatch({
        type: actions.LOGIN_ERROR,
        payload: error.response?.data?.errors || "Error en el servidor",
      });
    }
  };

  const forgotPassword = async () => {
    try {
      dispatch({ type: actions.FORGOT_PASSWORD });
      await apiConsumer({
        url: "/login/resetPassword",
        method: "POST",
        data: state.forgot,
      });
      dispatch({ type: actions.FORGOT_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({
        type: actions.FORGOT_PASSWORD_ERROR,
        payload: error.response?.data?.errors || "Error en el servidor",
      });
    }
  };

  React.useEffect(() => {
    if (state.isSuccess) {
      navigate("/admin/users");
    }
  }, [state.isSuccess]);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h3>Inicio de Sesión</h3>
        <TextField
          name="email"
          onChange={handleChange}
          value={state.user.email}
          label="Correo electrónico"
          defaultValue={state.user.email}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="password"
          value={state.user.password}
          label="Contraseña"
          type="password"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span
          onClick={() => dispatch({ type: actions.OPEN_MODAL })}
          className={styles.link}
        >
          ¿olvidaste tu contraseña?
        </span>
        <ErrorTag text={state.errorText} />
        <Button
          disabled={state.isLoading}
          onClick={tryLogin}
          text={state.isLoading ? "Cargando..." : "Entrar"}
          color="button"
        />
      </Card>
      <Modal
        isOpen={state.showModal}
        onClose={() => dispatch({ type: actions.CLOSE_MODAL })}
        title="Ingrese su correo para restablecer contraseña "
        onSave={forgotPassword}
        isLoading={state.isLoadingForgot}
        errorText={state.errorTextForgot}
        successText={
          state.isSuccessForgot
            ? "Se ha enviado un correo con las instrucciones"
            : ""
        }
      >
        <TextField
          value={state.forgot.email}
          onChange={(e) =>
            dispatch({
              type: actions.HANDLE_FORGOT_EMAIL,
              payload: e.target.value,
            })
          }
          label="correo electrónico"
        />
      </Modal>
    </div>
  );
}
