import React, { useContext } from "react";

import styles from "./sale.module.scss";

import LogoutIcon from "@mui/icons-material/Logout";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import Sales1 from "./sales1";
import Sales from "./sales";
import Sales2 from "./sales2";

export default function SalePoint({ closeModal }) {
  const [screen, setScreen] = React.useState(0);

  return (
    <div className={styles.modal_body}>
      <div className={styles.modal_navbar}>
        <div className={styles.tabs}>
          <span
            onClick={() => setScreen(0)}
            className={screen === 0 && styles.select_tab}
          >
            <PointOfSaleIcon />
            Punto de Venta
          </span>
          <span
            onClick={() => setScreen(1)}
            className={screen === 1 && styles.select_tab}
          >
            <LowPriorityIcon />
            Movimientos
          </span>
          <span
            onClick={() => setScreen(2)}
            className={screen === 2 && styles.select_tab}
          >
            <ManageSearchIcon />
            Historial
          </span>
        </div>
        <LogoutIcon className={styles.icon} onClick={closeModal} />
      </div>
      <div className={styles.bodyContainer}>
        {screen === 0 && <Sales />}
        {screen === 1 && <Sales1 />}
        {screen === 2 && <Sales2 />}
      </div>
    </div>
  );
}
