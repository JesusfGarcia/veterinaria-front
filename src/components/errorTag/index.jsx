import React from "react";
import styles from "./errorTag.module.scss";

export default function ErrorTag({ text }) {
  if (text === "") {
    return null;
  }

  return <span className={styles.tag}>{text}</span>;
}
