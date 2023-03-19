import React from "react";
import styles from "./successTag.module.scss";

export default function SuccessTag({ text }) {
  if (text === "") {
    return null;
  }

  return <span className={styles.tag}>{text}</span>;
}
