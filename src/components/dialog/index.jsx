import * as React from "react";
import Button from "../button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styles from "./dialog.module.scss";
import { DialogActions, DialogContent } from "@mui/material";

export default function Form({
  isOpen,
  onClose,
  children,
  title = "",
  onSave,
}) {
  return (
    <Dialog maxWidth={false} onClose={onClose} open={isOpen}>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent className={styles.ejem}>{children}</DialogContent>
      <DialogActions>
        <Button color="danger" text="Cancelar" onClick={onClose} />
        <Button onClick={onSave} text="Guardar" />
      </DialogActions>
    </Dialog>
  );
}
