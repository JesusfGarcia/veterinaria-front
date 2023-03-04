import React from "react";
import styles from "./cartilla.module.scss";

import { TextField } from "@mui/material";

export default function Cartilla() {
  return (
    <div className={styles.container}>
      <span>DATOS DE LA MASCOTA</span>
      <TextField size="small" label="Especie" />
      <TextField size="small" label="Nombre" />
      <TextField size="small" label="Raza" />
      <TextField size="small" label="Sexo" />
      <TextField size="small" label="Color" />
      <TextField size="small" label="Fecha de nacimiento" />
      <TextField size="small" label="Alergia a algún medicamento" />
    </div>
  );
}
