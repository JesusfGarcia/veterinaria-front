import React from "react";
import Button from "../button";
import SearchInput from "../searchInput";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import styles from "./table.module.scss";

export default function Table({ columns, data, buttonConf }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <SearchInput />
        {buttonConf && (
          <Button onClick={buttonConf.onClick} text={buttonConf.label} />
        )}
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
              {columns.map((column, id) => (
                <Td key={`row-${id}`} column={column} item={row} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const Td = ({ item, column }) => {
  const { key, type } = column;
  if (type === "actions") {
    return (
      <td>
        <div>
          {column.actions.map((action) => {
            if (action.label === "see") {
              return (
                <RemoveRedEyeIcon onClick={() => action.onClick(item.id)} />
              );
            }
          })}
        </div>
      </td>
    );
  }
  return (
    <td>
      <div>{item[key]}</div>
    </td>
  );
};
