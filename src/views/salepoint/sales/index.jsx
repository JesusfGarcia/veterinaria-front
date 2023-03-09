import React from "react";
import Table from "../../../components/table";
import styles from "../sale.module.scss";
import Button from "../../../components/button";
const titles = [
    {
      label: "producto",
      key: "name",
    },
  
    {
      label: "Numero de compra",
      key: "orderId",
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
  const data = [
    {
      name: "nexgar 15-30",
      orderId: "862920",
      quantity: "2",
      price: "380",
    },
    {
      name: "nexgar 15-30",
      orderId: "862920",
      quantity: "2",
      price: "380",
    },
    {
      name: "nexgar 15-30",
      orderId: "862920",
      quantity: "2",
      price: "380",
    },
    {
      name: "nexgar 15-30",
      orderId: "862920",
      quantity: "2",
      price: "380",
    },
  ];
  
export default function Sales() {
  return (
    <div>
      <Table columns={titles} data={data} />
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
