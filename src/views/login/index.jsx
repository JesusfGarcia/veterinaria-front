import { Card, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button";

import styles from "./login.module.scss";

import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";
import { reducer } from "./reducer";
import apiConsumer from "../../services";
import ErrorTag from "../../components/errorTag";

export default function Login() {
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({ type: actions.HANDLE_USER_CHANGES, payload: { value, name } });
  };

  const tryLogin = async () => {
    try {
      dispatch({ type: actions.LOGIN });
      const response = await apiConsumer({
        url: "/login",
        data: state.user,
        method: "POST",
      });
      dispatch({ type: actions.LOGIN_SUCCESS, payload: response.data.token });
    } catch (error) {
      dispatch({
        type: actions.LOGIN_ERROR,
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
        />
        <TextField
          name="password"
          value={state.user.password}
          label="Contraseña"
          type="password"
          onChange={handleChange}
        />
        <ErrorTag text={state.errorText} />
        <Button
          disabled={state.isLoading}
          onClick={tryLogin}
          text={state.isLoading ? "Cargando..." : "Entrar"}
          color="button"
        />
      </Card>
    </div>
  );
}
