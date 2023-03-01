import React from "react";

import ContentCutIcon from "@mui/icons-material/ContentCut";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ScienceIcon from "@mui/icons-material/Science";
import BugReportIcon from "@mui/icons-material/BugReport";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./pet.module.scss";
import Cirugia from "./cirugia";
import Consults from "./consultas";
import Estetica from "./estetica";
import Estudios from "./estudios";
import Parasitos from "./parasitos";
import Vacunas from "./vacunas";

import MichiJpg from "../../assets/images/michi.jpeg";
import Content from "../../components/content";
import Tabs from "../../components/tabs";

export default function PetsScreen() {
  return (
    /* <Content title="Perfil de Mascota">
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
          <Tabs items={items}/>
        </div>
      </div>
    </Content>*/
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.info}>
          <img className={styles.img} alt="foto de michi" src={MichiJpg} />
          <div className={styles.col}>
            <div>
              <span className={styles.title}>Misifu</span>{" "}
              <span className={styles.caption}>26/septiembre/2013</span>
            </div>
            <span className={styles.subTitle}>Domestico mexicano</span>

            <div>
              <span className={styles.subTitle}>Felino </span>
              <span className={styles.caption}>3kg</span>
            </div>
          </div>
        </div>
        <div className={styles.tabs}>
        {
          items.map(item => <TabItem item={item}/>)
        }
        </div>
      </div>
      {items[0].component}
    </div>
  );
}

const items = [
  {
    label: "Consultas",
    component: <Consults />,
    icon: <MonitorHeartIcon />,
  },
  {
    label: "Estéticas",
    component: <Estetica />,
    icon: <ContentCutIcon />,
  },
  {
    label: "Estudios",
    component: <Estudios />,
    icon: <ScienceIcon />,
  },
  {
    label: "Cirugías",
    component: <Cirugia />,
    icon: <BloodtypeIcon />,
  },
  {
    label: "Control Parasitos",
    component: <Parasitos />,
    icon: <BugReportIcon />,
  },
  {
    label: "Vacunas",
    component: <Vacunas />,
    icon: <VaccinesIcon />,
  },
  {
    label: "Hospital",
    component: <div>hola mundo</div>,
    icon: <LocalHospitalIcon />,
  },
];
const TabItem = ({ item }) => {
  return (
    <div>
      {item.icon}
      <span>{item.label}</span>
    </div>
  );
};
