import React from "react";
import Button from "../button";
import SearchInput from "../searchInput";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import styles from "./table.module.scss";
import { Skeleton } from "@mui/material";

export default function Table({
  columns,
  data = [],
  buttonConf,
  filter,
  setFilter,
  isLoading,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <SearchInput value={filter} onChange={setFilter} />
        {buttonConf && (
          <Button onClick={buttonConf.onClick} text={buttonConf.label} />
        )}
      </div>
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.ldsroller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className={styles.title}>Cargando...</span>
        </div>
      ) : (
        <>
          {data.length ? (
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
                      <Td
                        key={`row-${id}`}
                        column={column}
                        item={row}
                        idx={idx}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.tableText}>
              No hay registros en esta tabla
            </div>
          )}
        </>
      )}
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
