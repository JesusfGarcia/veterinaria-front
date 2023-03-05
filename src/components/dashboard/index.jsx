import React, { Suspense } from "react";

import {
  Content,
  DashboardContainer,
  Floating,
  Header,
  SidebarChild,
  Sidebard,
  SidebarItem,
} from "../../styles/dashboard";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import MenuIcon from "@mui/icons-material/Menu";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = React.useState(false);

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
      <Floating>
        <LocalGroceryStoreIcon />
      </Floating>
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
