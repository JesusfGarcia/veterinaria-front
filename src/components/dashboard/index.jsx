import React, { Suspense } from "react";

import {
  Content,
  DashboardContainer,
  Header,
  Sidebard,
  SidebarItem,
} from "../../styles/dashboard";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import MenuIcon from "@mui/icons-material/Menu";
export default function Dashboard() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const itemSelected = React.useMemo(() => {
    const arrayLocation = location.pathname.split("/");
    return arrayLocation[2];
  }, [location]);

  return (
    <DashboardContainer showSidebar={showSidebar}>
      <Header>
        <MenuIcon onClick={() => setShowSidebar(!showSidebar)} />
        <h2>SAN JOSÉ</h2>
      </Header>
      <Sidebard>
        {routes.filter(item => item.sidebar).map(({ label, path, icon }) => (
          <SidebarItem
            isSelected={itemSelected === path}
            key={label}
            onClick={() => navigate(`/admin/${path}`)}
          >
            {icon}
            {label}
          </SidebarItem>
        ))}
      </Sidebard>
      <Content>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {routes.map(({ element, path }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>

        {/*   <label>Header</label>
        <input onChange={(e) => setHeaderColor(e.target.value)} type="color" />
        <label>Sidebar</label>
        <input onChange={(e) => setSidebarColor(e.target.value)} type="color" /> */}
      </Content>
    </DashboardContainer>
  );
}
