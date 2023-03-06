import React, { Suspense } from "react";
import Table from "../../components/table";
import {
  Content,
  DashboardContainer,
  Floating,
  Header,
  SidebarChild,
  Sidebard,
  SidebarItem,
} from "../../styles/dashboard";

import LogoutIcon from "@mui/icons-material/Logout";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Dialog, Slide } from "@mui/material";

import { routes } from "../../routes";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./dashboard.module.scss";
import Button from "../button";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarClick = (path) => {
    if (path === "veterinary") {
      return navigate(`/admin/veterinary/esthetic`);
    }
    navigate(`/admin/${path}`);
  };

  return (
    <DashboardContainer showSidebar={showSidebar}>
      <Header>
        <MenuIcon onClick={() => setShowSidebar(!showSidebar)} />
        <h2>SAN JOSÉ</h2>
      </Header>
      <Sidebard>
        {routes
          .filter((item) => item.sidebar)
          .map(({ label, icon, type, childrens, path }) => (
            <SidebarItemRender
              showSidebar={showSidebar}
              type={type}
              icon={icon}
              label={label}
              childrens={childrens}
              onClick={handleSidebarClick}
              pathname={location.pathname}
              path={path}
            />
          ))}
      </Sidebard>
      <Content>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {routes.map(({ element, path, childrens }) => (
              <>
                <Route key={path} path={path} element={element} />
                {childrens &&
                  childrens.map((child) => (
                    <Route
                      key={child.path}
                      path={child.path}
                      element={child.element}
                    />
                  ))}
              </>
            ))}
          </Routes>
        </Suspense>
      </Content>
      <Floating onClick={() => setShowModal(true)}>
        <LocalGroceryStoreIcon />
      </Floating>
      <Dialog
        TransitionComponent={Transition}
        fullScreen
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className={styles.modal_body}>
          <div className={styles.modal_navbar}>
            <div className={styles.tabs}>
              <span className={styles.select_tab}>
                <PointOfSaleIcon />
                Punto de Venta
              </span>
              <span>
                <LowPriorityIcon />
                Movimientos
              </span>
              <span>
                <ManageSearchIcon />
                Historial
              </span>
            </div>
            <LogoutIcon
              className={styles.icon}
              onClick={() => setShowModal(false)}
            />
          </div>
          <div className={styles.bodyContainer}>
            <Table columns={titles} data={data} />
            <div className={styles.buttonRow}>
              <div className={styles.buttonContainer}>
                <Button color="danger" text="Cancelar">
                  Cancelar
                </Button>
                <Button color="button" text="Pagar">
                  Pagar
                </Button>
              </div>
              <div className={styles.priceContainer}>
                <span>
                  Total= <b>$ 3,040.00</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </DashboardContainer>
  );
}

const SidebarItemRender = ({
  icon,
  label,
  childrens,
  onClick,
  pathname,
  path,
  showSidebar,
}) => {
  return (
    <div>
      <SidebarItem
        isSelected={pathname.includes(path)}
        onClick={() => onClick(path)}
      >
        {icon}
        {label}
      </SidebarItem>
      {childrens !== undefined &&
        pathname.includes(path) &&
        childrens.map((child) => {
          return (
            <SidebarChild
              showSidebar={showSidebar}
              isSelected={pathname.includes(child.path)}
              onClick={() => onClick(child.path)}
            >
              {child.icon} {child.label}
            </SidebarChild>
          );
        })}
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const titles = [
  {
    label: "producto",
    key: "name",
  },

  {
    label: "Numero de compra",
    key: "orderId",
  },

  {
    label: "Cantidad",
    key: "quantity",
  },
  {
    label: "Precio",
    key: "price",
  },

  {
    label: "Eliminar",
    type: "actions",
    actions: [
      {
        label: "delete",
        onClick: () => console.log("hola mundo"),
      },
    ],
  },
];
const data = [
  {
    name: "nexgar 15-30",
    orderId: "862920",
    quantity: "2",
    price: "380",
  },
  {
    name: "nexgar 15-30",
    orderId: "862920",
    quantity: "2",
    price: "380",
  },
  {
    name: "nexgar 15-30",
    orderId: "862920",
    quantity: "2",
    price: "380",
  },
  {
    name: "nexgar 15-30",
    orderId: "862920",
    quantity: "2",
    price: "380",
  },
];
