import React from "react";
import Content from "../../components/content";

import styles from "./userinfo.module.scss";
import { useParams } from "react-router-dom";

import Cartilla from "../../components/cartilla";

export default function UserInfo() {
  const { id } = useParams();

  return (
    <Content title="Usuarios" button="añadir mascota">
      <div className={styles.container}>
        <Cartilla />
      </div>
    </Content>
  );
}
