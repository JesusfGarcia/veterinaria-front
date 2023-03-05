import React, { useState, useEffect } from "react";

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
import Hospital from "./hospital";

import MichiJpg from "../../assets/images/michi.jpeg";
import Container from "../../components/container";

export default function PetsScreen() {
  const [screenPosition, setscreenPosition] = useState(0);

  const savePosition = (idx) => {
    setscreenPosition(idx);
    //vamos a guardar en local, cual es el valor actual de la pantalla
    sessionStorage.setItem("petScreen", idx);
  };

  useEffect(() => {
    const itemPosition = sessionStorage.getItem("petScreen");
    if (!itemPosition) {
      return;
    }
    setscreenPosition(parseInt(itemPosition));
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.info}>
          <img className={styles.img} alt="foto de michi" src={MichiJpg} />
          <div className={styles.col}>
            <div>
              <span className={styles.title}>Misifu</span>
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
          {items.map((item, position) => (
            <TabItem
              isSelected={screenPosition === position}
              onClick={() => savePosition(position)}
              item={item}
            />
          ))}
        </div>
      </div>
      <Container>
        {items[screenPosition] !== undefined && items[screenPosition].component}
      </Container>
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
    component: <Hospital />,
    icon: <LocalHospitalIcon />,
  },
];

const TabItem = ({ item, onClick, isSelected }) => {
  return (
    <div className={isSelected && styles.item_selected} onClick={onClick}>
      {item.icon}
      <span>{item.label}</span>
    </div>
  );
};
