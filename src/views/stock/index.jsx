import React from "react";
import Content from "../../components/content";
import Table from "../../components/table";

console.log("hola mundo desde la pantalla de  el inventario");
const titles = [
  {
    label: "Nombre",
    key: "name",
  },

  {
    label: "Descripción",
    key: "description",
  },
  {
    label: "Precio de compra",
    key: "shopping_price",
  },
  {
    label: "Precio de venta",
    key: "selling_price",
  },

  {
    label: "Cantidad",
    key: "quantity",
  },
  {
    label: "Categoría",
    key: "category",
  },
  {
    label: "Proveedor",
    key: "provider",
  },
];
const data = [
  {
    name: "Nexgar",
    description: "trataiento para las garrapatas",
    shopping_price: "$100",
    selling_price: "$250",
    quantity: "20",
    category: "medicamento",
    provider: "bayer",
  },
  {
    name: "Nexgar",
    description: "trataiento para las garrapatas",
    shopping_price: "$100",
    selling_price: "$250",
    quantity: "20",
    category: "medicamento",
    provider: "bayer",
  },
  {
    name: "Nexgar",
    description: "trataiento para las garrapatas",
    shopping_price: "$100",
    selling_price: "$250",
    quantity: "20",
    category: "medicamento",
    provider: "bayer",
  },
];

const buttonConf = {
  label: "Añadir Producto",
};
export default function StockScreen() {
  return (
    <Content title="Inventario">
      <div className="linea"></div>
      <Table buttonConf={buttonConf} columns={titles} data={data} />
    </Content>
  );
}
