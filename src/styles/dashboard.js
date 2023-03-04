import styled from "styled-components";
import { theme } from "./theme";

export const DashboardContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  height: 100vh;
  grid-template-areas:
    "header  header"
    "sidebar content";
  grid-template-columns: ${(props) =>
    props.showSidebar ? "260px 1fr" : "50px 1fr"};
  grid-template-rows: 60px 1fr;
  transition: 0.5s ease all;
`;

export const Header = styled.header`
  grid-area: header;
  background-color: ${theme.primaryDark};
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  color: ${theme.background};
  gap: 20px;
`;

export const Sidebard = styled.aside`
  grid-area: sidebar;
  background-color: ${theme.primaryDark};
  display: flex;
  flex-direction: column;
`;

export const SidebarItem = styled.div`
  padding: 10px 10px;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 2px;
  background-color: ${(props) =>
    props.isSelected ? theme.primaryHover : "transparent"};
  color: ${theme.background};
  display: grid;
  grid-template-columns: 40px 1fr;
  overflow: hidden;

  :hover {
    background-color: ${theme.primaryHover};
    color: ${theme.background};
  }
`;

export const SidebarChild = styled.div`
  padding: ${(props) => (props.showSidebar ? "10px 40px" : "10px")};
  user-select: none;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 2px;
  background-color: ${(props) =>
    props.isSelected ? theme.primaryHover : theme.primaryLight};
  color: ${theme.background};
  display: grid;
  grid-template-columns: 40px 1fr;
  overflow: hidden;
  transition: 0.5s ease all;
  :hover {
    background-color: ${theme.primaryHover};
    color: ${theme.background};
  }
`;

export const Content = styled.section`
  grid-area: content;
  background-color: ${theme.background};
`;
