import React from "react";
import Button from "../button";
import SearchInput from "../searchInput";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { IconButton } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";

import styles from "./table.module.scss";

import { actions } from "./reducer/actions";
import { initialState } from "./reducer/constants";
import { reducer } from "./reducer";
import apiConsumer from "../../services";
import { getServerError } from "../../helpers/getServerError";
import { Pagination } from "@mui/material";
import { getFormatedDateTable } from "../../helpers/getFormatedDate";

import doguito from "../../assets/images/doguito.png";
import gatito from "../../assets/images/gatito.png";
import DaySelect from "../dateSelect";

export default function Table({
  columns,
  buttonConf,
  endpoint,
  listFormatter,
  reload,
  filterByDate = false,
  filterByParasyte = false,
}) {
  const [state = initialState, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  React.useEffect(() => {
    const getList = async () => {
      try {
        dispatch({ type: actions.GET_LIST });

        const { data } = await apiConsumer({
          method: "GET",
          url: getEndpoint(),
        });
        if (listFormatter) {
          dispatch({
            type: actions.GET_LIST_SUCCESS,
            payload: {
              ...data,
              rows: data.rows.map(listFormatter),
            },
          });
        } else {
          dispatch({ type: actions.GET_LIST_SUCCESS, payload: data });
        }
      } catch (error) {
        dispatch({
          type: actions.GET_LIST_ERROR,
          payload: getServerError(error),
        });
      }
    };
    const delay = setTimeout(() => {
      getList();
    }, 300);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.filterText,
    state.reload,
    state.page,
    state.pageSize,
    state.year,
    state.month,
    state.day,
    state.type,
    endpoint,
    reload,
  ]);

  const getEndpoint = () => {
    const signquerie = endpoint.includes("?") ? "&" : "?";
    let newEndpoint = `${endpoint}${signquerie}page=${state.page}&pageSize=${state.pageSize}`;

    if (state.filterText) {
      newEndpoint = `${newEndpoint}&advanced=${state.filterText}`;
    }

    if (state.type) {
      newEndpoint = `${newEndpoint}&type=${state.type}`;
    }

    if (!filterByDate) {
      return newEndpoint;
    }

    if (state.day && state.month && state.year) {
      return `${newEndpoint}&date=${state.year}-${state.month}-${state.day}`;
    }

    newEndpoint = `${newEndpoint}&month=${state.month}&year=${state.year}`;

    return newEndpoint;
  };

  const handleMonth = (e) => {
    const { value } = e.target;
    const [year, month] = value.split("-");

    dispatch({
      type: actions.CHANGE_MONTH,
      payload: {
        year,
        month,
      },
    });
  };

  const handleDay = (e) => {
    const { value } = e.target;

    dispatch({ type: actions.CHANGE_DAY, payload: value });
  };

  const handleType = (value) => {
    dispatch({ type: actions.CHANGE_TYPE, payload: value });
  };
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.center}>
          <div className={styles.gatito_container}>
            <img
              src={gatito}
              alt="gatito lindo"
              width={100}
              className={styles.gatito}
            />

            <SearchInput
              value={state.filterText}
              onChange={(value) =>
                dispatch({
                  type: actions.HANDLE_FILTER_TEXT,
                  payload: value,
                })
              }
            />
          </div>
          {filterByDate && (
            <>
              <input
                className={styles.filtro}
                type="month"
                onChange={handleMonth}
              />
              <DaySelect value={state.day} handleDay={handleDay} />
            </>
          )}
          {filterByParasyte && (
            <select
              className={styles.filterType}
              onChange={(e) => handleType(e.target.value)}
              value={state.type}
            >
              <option value="">Todos los Parásitos</option>
              <option value="INTERNAL">Internos</option>
              <option value="EXTERNAL">Externos</option>
            </select>
          )}
        </div>

        {buttonConf && (
          <div className={styles.doguito_container}>
            <img
              src={doguito}
              alt="doguito guapo"
              width={100}
              className={styles.doguito}
            />

            <Button onClick={buttonConf.onClick} text={buttonConf.label} />
          </div>
        )}
      </div>
      {state.loadingGetList ? (
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
          {state.list.length ? (
            <table className={styles.table_container}>
              <thead>
                <tr>
                  {columns.map((title, indice) => (
                    <th key={`column${indice}`}>{title.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.list.map((row, idx) => (
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pagination
          page={state.page}
          onChange={(e, value) =>
            dispatch({ type: actions.CHANGE_PAGE, payload: value })
          }
          count={state.count}
          color="primary"
        />
      </div>
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
                  onClick={() => action.onClick(item)}
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
                  onClick={() => action.onClick(item)}
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

  if (type === "money") {
    return (
      <td>
        <div className={styles.money}>
          {item[key].toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </div>
      </td>
    );
  }

  if (type === "date") {
    return (
      <td>
        <div>{getFormatedDateTable(item[key])}</div>
      </td>
    );
  }

  if (type === "file") {
    if (item[key]) {
      return (
        <td>
          <IconButton>
            <a
              className={styles.link}
              href={`${process.env.REACT_APP_URL}${item[key]}`}
              target="_blank"
              rel="noreferrer"
            >
              <FileOpenIcon />
            </a>
          </IconButton>
        </td>
      );
    }
    return <td>sin archivo</td>;
  }

  return (
    <td>
      <div>{item[key]}</div>
    </td>
  );
};
