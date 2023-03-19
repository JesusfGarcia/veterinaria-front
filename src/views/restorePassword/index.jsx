import { Card, TextField } from "@mui/material";
import React from "react";

import Button from "../../components/button";

import styles from "./restore.module.scss";

import ErrorTag from "../../components/errorTag";
import { useNavigate, useParams } from "react-router-dom";
import apiConsumer from "../../services";
import SuccessTag from "../../components/successTag";

export default function Login() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = React.useState("");
  const [textError, setTextError] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const resetPassword = async () => {
    try {
      setTextError("");
      setIsLoading(true);
      await apiConsumer({
        method: "PUT",
        url: `/login/resetPassword/${token}`,
        data: {
          password: newPassword,
        },
      });
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setTextError(error.response?.data?.errors || "Error en el servidor");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h3>Reestablecer Contraseña</h3>
        <TextField
          name="password"
          label="Nueva Contraseña"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ErrorTag text={textError} />
        <SuccessTag
          text={
            isSuccess ? "Se ha reestablecido correctamente la contraseña" : ""
          }
        />
        {isSuccess && (
          <span onClick={() => navigate("/")} className={styles.link}>
            Regresar a inicio de sesión
          </span>
        )}
        <Button
          onClick={resetPassword}
          color="button"
          text={isLoading ? "Cargando..." : "Reestablecer contraseña"}
          disabled={isLoading}
        />
      </Card>
    </div>
  );
}
