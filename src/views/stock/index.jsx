import React from "react";
import Content from "../../components/content";

import SearchIcon from "@mui/icons-material/Search";

console.log("hola mundo desde la pantalla de  el inventario");
export default function StockScreen() {
  return (
    <Content title="Inventario">
      <div className="linea"></div>
      <div onkeydown="buscar(event)" class="input">
        <input placeholder="Buscar Producto" type="text" />
        <SearchIcon />
      </div>
    </Content>
  );
}
