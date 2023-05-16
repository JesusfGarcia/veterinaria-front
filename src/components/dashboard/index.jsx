import React, { Suspense } from "react";

import {
  Content,
  DashboardContainer,
  Header,
  SidebarChild,
  Sidebard,
  SidebarItem,
} from "../../styles/dashboard";

import SalePoint from "../../views/salepoint";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Dialog, Slide } from "@mui/material";

import { routes } from "../../routes";
import MenuIcon from "@mui/icons-material/Menu";

import { authContext } from "../../App";

import styles from "./dashboard.module.scss";

export const CarContext = React.createContext({
  products: [],
  addToCar: () => {},
  deleteFromCar: () => {},
});

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = React.useContext(authContext);

  const [products, setProducts] = React.useState([]);

  const handleSidebarClick = (path) => {
    if (path === "veterinary") {
      return navigate(`/admin/veterinary/esthetic`);
    }
    setShowSidebar(false);
    navigate(`/admin/${path}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToCar = ({ item, origin }) => {
    setProducts([
      ...products,
      {
        ...item,
        type: getProductType(origin),
      },
    ]);
  };

  const deleteFromCar = (idx) => {
    const productsCopy = [...products];
    productsCopy.splice(idx, 1);
    setProducts(productsCopy);
  };

  const getProductType = (origin) => {
    const dictionary = {
      estetica: "groomings",
      cirugias: "surgeries",
      estudios: "diagnostics",
      vacunas: "vaccinations",
      consultas: "cappointments",
      parasitologia: "parasitologies",
      hospital: "hospitals",
    };

    return dictionary[origin];
  };

  if (true) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left_side}>
            <MenuIcon onClick={() => setShowSidebar(!showSidebar)} />
            <h2>SAN JOSÉ</h2>
          </div>
          <ExitToAppIcon onClick={handleLogout} />
        </div>
        <div className={showSidebar ? styles.sidebar_selected : styles.sidebar}>
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
                key={`sidebar${path}`}
              />
            ))}
        </div>
        <div className={styles.content}>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              {routes.map(({ element, path, childrens }) => (
                <React.Fragment key={path}>
                  <Route key={path} path={path} element={element} />
                  {childrens &&
                    childrens.map((child) => (
                      <Route
                        key={child.path}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                </React.Fragment>
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <CarContext.Provider value={{ products, addToCar, deleteFromCar }}>
      <DashboardContainer showSidebar={showSidebar}>
        <Header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MenuIcon onClick={() => setShowSidebar(!showSidebar)} />
            <h2>SAN JOSÉ</h2>
          </div>

          <ExitToAppIcon onClick={handleLogout} />
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
                key={`sidebar${path}`}
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
        {/*      <Floating onClick={() => setShowModal(true)}>
          {products.length > 0 && (
            <CantIndicator>{products.length}</CantIndicator>
          )}
          <LocalGroceryStoreIcon />
        </Floating> */}
        <Dialog
          TransitionComponent={Transition}
          fullScreen
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <SalePoint closeModal={closeModal} />
        </Dialog>
      </DashboardContainer>
    </CarContext.Provider>
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
      <div
        className={pathname.includes(path) ? styles.item_selected : styles.item}
        onClick={() => onClick(path)}
      >
        {icon}
        {label}
      </div>
      {childrens !== undefined &&
        pathname.includes(path) &&
        childrens.map((child) => {
          return (
            <div
              className={
                pathname.includes(child.path)
                  ? styles.child_selected
                  : styles.child
              }
              key={`sidebarchild-${child.path}`}
              showSidebar={showSidebar}
              isSelected={pathname.includes(child.path)}
              onClick={() => onClick(child.path)}
            >
              {child.icon} {child.label}
            </div>
          );
        })}
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
