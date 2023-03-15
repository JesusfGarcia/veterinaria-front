import React from "react";
import styles from "./button.module.scss";

export default function Button({
  text,
  onClick,
  color = "button",
  disabled = false,
}) {
  return (
    <button disabled={disabled} onClick={onClick} className={styles[color]}>
      {text}
    </button>
  );
}
