import React from "react";
import Button from "../button";
import SearchInput from "../searchInput";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import styles from "./table.module.scss";
import { theme } from "../../styles/theme";

/* const columnsExample = [
  {
    label: "ver",
    key: "actions",
    type: "actions",
    actions: [
      {
        label: "see",
        onClick: (id) => navigate(`${id}`),
      },
    ],
  },
]; */

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
                <Td key={`row-${id}`} column={column} item={row} idx={idx} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const Td = ({ item, column, idx }) => {
  const { key, type } = column;
  if (type === "actions") {
    return (
      <td>
        <div style={{ display: "flex", gap: 5 }}>
          {column.actions.map((action) => {
            if (action.label === "see") {
              return (
                <RemoveRedEyeIcon
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => action.onClick(item.id)}
                />
              );
            }
            if (action.label === "deletefromcar") {
              return (
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  color="error"
                  onClick={() => action.onClick(idx)}
                />
              );
            }
            if (action.label === "delete") {
              return (
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  color="error"
                  onClick={() => action.onClick(item.id)}
                />
              );
            }
            return null;
          })}
        </div>
      </td>
    );
  }

  if (key === "isPayed") {
    return (
      <div>
        {item[key] ? (
          <span className={styles.payed}>
            <CheckCircleOutlineIcon /> Pagado
          </span>
        ) : (
          <span
            onClick={() => column.onClick(item)}
            className={styles.addToCar}
          >
            <AddShoppingCartIcon /> Agregar
          </span>
        )}
      </div>
    );
  }
  return (
    <td>
      <div>{item[key]}</div>
    </td>
  );
};
