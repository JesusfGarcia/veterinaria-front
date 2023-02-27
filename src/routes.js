import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ScienceIcon from '@mui/icons-material/Science';
import BugReportIcon from '@mui/icons-material/BugReport';

const ConfigurationScreen = React.lazy(() => import("./views/configuration"));
const UsersScreen = React.lazy(() => import("./views/user"));
const EstheticScreen = React.lazy(()=>import("./views/esthetic"));
const StockScreen = React.lazy(()=> import("./views/stock"));
const UserInfo = React.lazy(()=>import("./views/userInfo"));
const SurgeryScreen= React.lazy(()=>import("./views/surgery"));
const VacciensScreen=React.lazy(()=>import("./views/vaccines"));
const CosultationScreen=React.lazy(()=>import("./views/consultation"));
const StudiesScreen=React.lazy(()=>import("./views/studies"));
const ParasyteScreen=React.lazy(()=>import("./views/parasyte"));
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
  element:<UserInfo/>,
  path:"users/:id",
  },
  {element: <EstheticScreen />,
    label: "Estetica",
    path: "esthetic",
    icon: <ContentCutIcon/>,
    sidebar:true,
},

{
element:<SurgeryScreen/>,
label:"Cirugias",
path:"surgery",
icon:<BloodtypeIcon />,
sidebar:true,
},
{
  element:<VacciensScreen/>,
  label:"Vacunas",
  path:"vacciens",
  icon:<VaccinesIcon/>,
  sidebar:true,
  },
  {
    element:<CosultationScreen/>,
    label:"Consultas",
    path:"consultation",
    icon:<MonitorHeartIcon/>,
    sidebar:true,

  },
  {
    element:<StudiesScreen/>,
    label:"Estudios",
    path:"studies",
    icon:<ScienceIcon/>,
    sidebar:true,

  },
  {
    element:<ParasyteScreen/>,
    label:"Parasitos",
    path:"parasyte",
    icon:<BugReportIcon/>,
    sidebar:true,
    },

  {
    element: <StockScreen/>,
    label: "Inventario",
    path: "stock",
    icon: <InventoryOutlinedIcon/>,
    sidebar:true,
  
  },
];
