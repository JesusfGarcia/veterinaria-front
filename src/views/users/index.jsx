import React from "react";

import MichiJpg from "../../assets/images/michi.jpeg";
import Content from "../../components/content";
import Table from "../../components/table";
import Tabs from "../../components/tabs";

export default function UsersScreen() {
  return (
    <Content title="Perfil de Mascota">
      <div class="contenedor">
        <div class="content">
          <div class="linea"></div>
          <div class="info">
            <img alt="foto de michi" src={MichiJpg} />
            <div class="datos">
              <h5>Misifu</h5>
              <h6>Gato</h6>
              <h6>Felino</h6>
              <span>26/septiembre/2013</span>
              <span>3kg</span>
            </div>
          </div>
          <Tabs />
        </div>
      </div>
    </Content>
  );
}
