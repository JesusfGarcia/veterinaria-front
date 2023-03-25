import React from "react";
import styles from "./search.module.scss";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ value, onChange }) {
  return (
    <div className={styles.input_container}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar elemento"
        type="text"
      />
      <SearchIcon />
    </div>
  );
}
