import React from "react";
import styles from "./button.module.scss";

export default function Button({ text, onClick, color = "button" }) {
  return (
    <button onClick={onClick} className={styles[color]}>
      {text}
    </button>
  );
}
