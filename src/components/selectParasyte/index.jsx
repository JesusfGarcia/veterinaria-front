import React from "react";

import styles from "./parasyteType.module.scss";

export default function SelectParasyte({ value, onChange }) {
  return (
    <div className={styles.labelC}>
      <span className={styles.label}>Tipo de Parásitos</span>
      <div className={styles.container}>
        <span
          className={value === "INTERNAL" && styles.on}
          onClick={() => onChange("INTERNAL")}
        >
          Internos
        </span>
        <span
          onClick={() => onChange("EXTERNAL")}
          className={value === "EXTERNAL" && styles.on}
        >
          Externos
        </span>
      </div>
    </div>
  );
}
