import { Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button";

import styles from "./login.module.scss";

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h3>Inicio de Sesión</h3>
        <TextField label="Correo electrónico" />
        <TextField label="Contraseña" type="password" />
        <Button onClick={()=>navigate("/admin/users")} text="Ingresar" color="button" />
      </Card>
    </div>
  );
}
