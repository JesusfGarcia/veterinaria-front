import * as React from "react";
import Button from "../button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styles from "./dialog.module.scss";
import { DialogActions, DialogContent } from "@mui/material";
import ErrorTag from "../errorTag";
import SuccessTag from "../successTag";

export default function Form({
  isOpen,
  onClose,
  children,
  title = "",
  onSave,
  isLoading = false,
  errorText = "",
  successText = "",
}) {
  return (
    <Dialog maxWidth={false} onClose={onClose} open={isOpen}>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent className={styles.ejem}>
        <div className={styles.formContainer}>
          {children} <ErrorTag text={errorText} />
          <SuccessTag text={successText} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="danger" text="Cancelar" onClick={onClose} />
        <Button
          disabled={isLoading}
          onClick={onSave}
          text={isLoading ? "Cargando..." : "Guardar"}
        />
      </DialogActions>
    </Dialog>
  );
}

export function DeleteDialog({
  isOpen,
  onClose,
  children,
  title = "",
  onSave,
  isLoading = false,
  errorText = "",
}) {
  return (
    <Dialog maxWidth={false} onClose={onClose} open={isOpen}>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <div className={styles.formContainer}>
          {children} <ErrorTag text={errorText} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="danger" text="Cancelar" onClick={onClose} />
        <Button
          disabled={isLoading}
          onClick={onSave}
          text={isLoading ? "Cargando..." : "Eliminar"}
        />
      </DialogActions>
    </Dialog>
  );
}
