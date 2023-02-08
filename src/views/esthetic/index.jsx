import React from "react";

console.log("hola mundo desde la pantalla de estetica");
export default function EstheticScreen() {
  return (
    
      <div className="conten">
        <h1>PAQUETES DE ESTETICA</h1>
        <hr />
        <div className="paquetes">
          <div className="paquete1">
            <div className="titulo">Baño + corte</div>
            <div className="centro">perro chico</div>
            <div className="borde">$250</div>
          </div>

          <div class="paquete1">
            <div className="titulo">Baño + corte</div>
            <div className="centro">perro mediano</div>
            <div className="borde">$280</div>
          </div>

          <div className="paquete1">
            <div className="titulo">Baño + corte</div>
            <div className="centro">perro mediano</div>
            <div className="borde">$280</div>
          </div>

          <div className="add">+</div>
        </div>
      </div>
  
  );
}
