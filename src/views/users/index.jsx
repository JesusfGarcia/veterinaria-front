import React from "react";

console.log("hola mundo desde la pantalla de usuario");

export default function UsersScreen() {

 
  return <div>
    

  <body>
    <div class="contenedor">
      <div class="header">
      <span>18440461</span>
      </div>
    
      <div class="content">
        <img class="fondo" alt="imagen de fondo" src="./sanjose-removebg-preview.png" />
        <h1>Perfil de Mascota</h1>
        <div class="linea"></div>
        <div class="info">
          <img alt="foto de michi" src="./michi.jpeg" />
          <div class="datos">
            <h5>Misifu</h5>
            <h6>Gato</h6>
            <h6>Felino</h6>
            <span>26/septiembre/2013</span>
            <span>3kg</span>
          </div>
          
        </div>
        
        <div onkeydown="buscar(event)" class="input">
          <input type="text" />
          <img alt="lupa icon" src="./lupa.png" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Tratamiento</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Perrito enfermito</td>
              <td>$200.00</td>
              <td>una sobadita de panza</td>
              <td>19/01/2022</td>
            </tr>
            <tr>
              <td>Perrito enfermito</td>
              <td>$200.00</td>
              <td>una sobadita de panza</td>
              <td>19/01/2022</td>
            </tr>
            <tr>
              <td>Perrito enfermito</td>
              <td>$200.00</td>
              <td>una sobadita de panza</td>
              <td>19/01/2022</td>
            </tr>
            <tr>
              <td>Perrito enfermito</td>
              <td>$200.00</td>
              <td>una sobadita de panza</td>
              <td>19/01/2022</td>
            </tr>
            <tr>
              <td>Perrito enfermito</td>
              <td>$200.00</td>
              <td>una sobadita de panza</td>
              <td>19/01/2022</td>
            </tr>
            <tr>
              <td>Perrito enfermito</td>
              <td>$200.00</td>
              <td>una sobadita de panza</td>
              <td>19/01/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
     
    </div>
  </body>

</div>;
 
}


