import React from "react";

import styles from "./tabs.module.scss";

export default function Tabs({ items }) {
  const [itemSelected, setItemSelected] = React.useState(0);

  return (
    <div className={styles.content}>
      <div className={styles.tab_container}>
        {items.map((item, idx) => (
          <span
            className={idx === itemSelected && styles.selected}
            onClick={() => setItemSelected(idx)}
            key={`tabs-${idx}`}
          >
            {item.label}
          </span>
        ))}
      </div>
      {items[itemSelected].component} 
    </div>
  );
}
