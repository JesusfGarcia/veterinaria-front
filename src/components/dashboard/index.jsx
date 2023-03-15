import React, { Suspense } from "react";

import {
  CantIndicator,
  Content,
  DashboardContainer,
  Floating,
  Header,
  SidebarChild,
  Sidebard,
  SidebarItem,
} from "../../styles/dashboard";

import SalePoint from "../../views/salepoint";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Dialog, Slide } from "@mui/material";

import { routes } from "../../routes";
import MenuIcon from "@mui/icons-material/Menu";

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

  const [products, setProducts] = React.useState([]);

  const handleSidebarClick = (path) => {
    if (path === "veterinary") {
      return navigate(`/admin/veterinary/esthetic`);
    }
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

  return (
    <CarContext.Provider value={{ products, addToCar, deleteFromCar }}>
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
          {products.length > 0 && (
            <CantIndicator>{products.length}</CantIndicator>
          )}
          <LocalGroceryStoreIcon />
        </Floating>
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
