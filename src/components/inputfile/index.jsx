import React from "react";

import styles from "./file.module.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function InputFile({ value = "", setValue = () => {} }) {
  const [base64, setBase64] = React.useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64(reader.result);
      setValue(reader.result);
      console.log(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const valueisBase64 = React.useMemo(() => {
    return value?.includes("base64") || false;
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        onChange={handleFile}
        className={styles.inputFile}
        id="file"
        type="file"
      />
      {!value ? (
        <div className={styles.imgDefault}>
          <CameraAltIcon />
          Seleccione una imagen
        </div>
      ) : (
        <>
          {valueisBase64 ? (
            <img src={base64} className={styles.img} alt="imagen" />
          ) : (
            <img
              className={styles.img}
              alt="imagen"
              src={`${process.env.REACT_APP_URL}${value}`}
            />
          )}
        </>
      )}

      <label className={styles.inputLabel} htmlFor="file">
        <CameraAltIcon /> Agregar Imagen
      </label>
    </div>
  );
}
