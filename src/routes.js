import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ScienceIcon from "@mui/icons-material/Science";
import BugReportIcon from "@mui/icons-material/BugReport";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const ConfigurationScreen = React.lazy(() => import("./views/configuration"));
const UsersScreen = React.lazy(() => import("./views/user"));
const EstheticScreen = React.lazy(() => import("./views/esthetic"));
const StockScreen = React.lazy(() => import("./views/stock"));
const SurgeryScreen = React.lazy(() => import("./views/surgery"));
const VacciensScreen = React.lazy(() => import("./views/vaccines"));
const CosultationScreen = React.lazy(() => import("./views/consultation"));
const StudiesScreen = React.lazy(() => import("./views/studies"));
const ParasyteScreen = React.lazy(() => import("./views/parasyte"));
const HospitalScreen = React.lazy(() => import("./views/hospital"));
const PetScreen = React.lazy(() => import("./views/pet"));
const ProductsScreen = React.lazy(() => import("./views/products"));

export const routes = [
  {
    element: <ConfigurationScreen />,
    label: "Configuración",
    path: "configuration",
    icon: <SettingsIcon />,
    sidebar: true,
  },
  {
    element: <UsersScreen />,
    label: "Usuarios",
    path: "users",
    icon: <PeopleIcon />,
    sidebar: true,
  },
  {
    element: <PetScreen />,
    path: "users/:id",
  },
  {
    label: "Veterinaria",
    icon: <PetsIcon />,
    sidebar: true,
    type: "container",
    path: "veterinary",
    childrens: [
      {
        element: <EstheticScreen />,
        label: "Estetica",
        path: "veterinary/esthetic",
        icon: <ContentCutIcon />,
        sidebar: true,
      },
      {
        element: <SurgeryScreen />,
        label: "Cirugias",
        path: "veterinary/surgery",
        icon: <BloodtypeIcon />,
        sidebar: true,
      },
      {
        element: <VacciensScreen />,
        label: "Vacunas",
        path: "veterinary/vacciens",
        icon: <VaccinesIcon />,
        sidebar: true,
      },
      {
        element: <CosultationScreen />,
        label: "Consultas",
        path: "veterinary/consultation",
        icon: <MonitorHeartIcon />,
        sidebar: true,
      },
      {
        element: <StudiesScreen />,
        label: "Laboratorio",
        path: "veterinary/studies",
        icon: <ScienceIcon />,
        sidebar: true,
      },
      {
        element: <ParasyteScreen />,
        label: "Parasitos",
        path: "veterinary/parasyte",
        icon: <BugReportIcon />,
        sidebar: true,
      },
      {
        element: <HospitalScreen />,
        label: "Hospital",
        path: "veterinary/hospital",
        icon: <LocalHospitalIcon />,
        sidebar: true,
      },
    ],
  },
  {
    element: <StockScreen />,
    label: "Inventario",
    path: "stock",
    icon: <InventoryOutlinedIcon />,
    sidebar: true,
  },
  {
    element: <ProductsScreen />,
    label: "Productos",
    path: "products",
    icon: <LocalOfferIcon />,
    sidebar: true,
  },
];
