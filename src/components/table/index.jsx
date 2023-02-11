import React from "react";
import Button from "../button";
import SearchInput from "../searchInput";

import styles from "./table.module.scss";

export default function Table({ columns, data, buttonConf }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
      <SearchInput />
      {buttonConf && <Button text={buttonConf.label} />}
      
      </div>
   
      <table className={styles.table_container}>
        <thead>
          <tr>
            {columns.map((title, indice) => (
              <th key={`column${indice}`}>{title.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((column) => (
                <td key={column.key}>
                  <div>{row[column.key]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
