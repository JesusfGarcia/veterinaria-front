import React from "react";
import Consults from "../../views/users/consultas";

import styles from "./tabs.module.scss";

const items = [
  {
    label: "Consultas",
    component: <Consults />,
  },
  {
    label: "Estéticas",
    component: <div>Estéticas</div>,
  },
  {
    label: "Estudios",
    component: <div>Estudios</div>,
  },
  {
    label: "Cirugías",
    component: <div>Cirugías</div>,
  },
  {
    label: "Control Parasitos",
    component: <div>Control Parásitos</div>,
  },
  {
    label: "Vacunas",
    component: <div>Vacunas</div>,
  },
];

export default function Tabs() {
  const [itemSelected, setItemSelected] = React.useState(0);
  return (
    <div className={styles.content}>
      <div className={styles.tab_container}>
        {items.map((item, idx) => (
          <span
            className={idx === itemSelected && styles.selected}
          onClick={() => setItemSelected(idx)} key={`tabs-${idx}`}>{item.label}</span>
        ))}
      </div>
      {items[itemSelected].component}
    </div>
  );
}
