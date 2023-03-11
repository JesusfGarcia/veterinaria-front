import React from "react";
import Table from "../../../components/table";
import styles from "../sale.module.scss";
import Button from "../../../components/button";
import { CarContext } from "../../../components/dashboard";

export default function Sales() {
  const { products, setProducts } = React.useContext(CarContext);

  const titles = [
    {
      label: "producto",
      key: "name",
    },
    {
      label: "Cantidad",
      key: "quantity",
    },
    {
      label: "Precio",
      key: "price",
    },

    {
      label: "Eliminar",
      type: "actions",
      actions: [
        {
          label: "delete",
          onClick: () => console.log("hola mundo"),
        },
      ],
    },
  ];

  return (
    <div>
      <Table columns={titles} data={products} />
      <div className={styles.buttonRow}>
        <div className={styles.buttonContainer}>
          <Button color="danger" text="Cancelar">
            Cancelar
          </Button>
          <Button color="button" text="Pagar">
            Pagar
          </Button>
        </div>
        <div className={styles.priceContainer}>
          <span>
            Total= <b>$ 3,040.00</b>
          </span>
        </div>
      </div>{" "}
    </div>
  );
}
