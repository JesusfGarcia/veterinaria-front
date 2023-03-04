import * as React from "react";
import Button from "../button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Styles from "./dialog.module.scss";

export default function Form({ isOpen, onClose, children, title = "" , onSave}) {
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <div className={Styles.container}>
        <DialogTitle className={Styles.title}>{title}</DialogTitle>
        {children}
        <div className={Styles.footer}>
          <Button color="danger" text="Cancelar" onClick={onClose} />
          <Button onClick={onSave} text="Guardar" />
        </div>
      </div>
    </Dialog>
  );
}
