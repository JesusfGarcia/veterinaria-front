import React from "react";

import styles from "./inputstudie.module.scss";

import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function InputFileStudies({ value = "", setValue = () => {} }) {
  const [base64, setBase64] = React.useState("");
  const [name, setName] = React.useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64(reader.result);
      setValue(reader.result);
      setName(file.name);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <input
        onChange={handleFile}
        className={styles.inputFile}
        id="file"
        type="file"
      />
      {!value ? (
        <div className={styles.row}>
          <label htmlFor="file" className={styles.inputLabel}>
            <FileUploadIcon />
            Subir Archivo
          </label>
          <span>{name}</span>
        </div>
      ) : (
        <div className={styles.row}>
          <label htmlFor="file" className={styles.inputLabel}>
            <FileUploadIcon />
            Cambiar Archivo
          </label>
          <span>{name}</span>
        </div>
      )}
    </div>
  );
}
