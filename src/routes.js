import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const ConfigurationScreen = React.lazy(() => import("./views/configuration"));
const UsersScreen = React.lazy(() => import("./views/users"));
const EstheticScreen = React.lazy(()=>import("./views/esthetic"));
const StockScreen = React.lazy(()=> import("./views/stock"));

export const routes = [
  {
    element: <ConfigurationScreen />,
    label: "Configuración",
    path: "configuration",
    icon: <SettingsIcon />
  },
  {
    element: <UsersScreen />,
    label: "Usuarios",
    path: "users",
    icon: <PeopleIcon />
  },
  {element: <EstheticScreen />,
    label: "Estetica",
    path: "esthetic",
    icon: <ContentCutIcon/>
},
{
  element: <StockScreen/>,
  label: "Inventario",
  path: "stock",
  icon: <InventoryOutlinedIcon/>

}
];
