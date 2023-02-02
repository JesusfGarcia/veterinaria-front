import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

const ConfigurationScreen = React.lazy(() => import("./views/configuration"));
const UsersScreen = React.lazy(() => import("./views/users"));

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
];
