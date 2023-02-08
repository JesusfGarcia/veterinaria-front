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
    props.showSidebar ? "260px 1fr" : "65px 1fr"};
  grid-template-rows: 60px 1fr;
`;

export const Header = styled.header`
  grid-area: header;
  background-color: ${(props) =>
    props.clientColor ? props.clientColor : theme.primary};
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
  background-color: ${(props) =>
    props.clientColor ? props.clientColor : theme.primaryLight};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SidebarItem = styled.div`
  padding: 10px 10px;
  user-select: none;
  cursor: pointer;
  border-bottom: 2px solid ${theme.primaryDark};
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  background-color: ${(props) =>
    props.isSelected ? theme.primaryDark : "transparent"};
  color: ${(props) => (props.isSelected ? theme.background : "#000")};
  display: grid;
  grid-template-columns: 40px 1fr;
  overflow: hidden;

  :hover {
    background-color: ${theme.primaryDark};
    color: ${theme.background};
  }
`;

export const Content = styled.section`
  grid-area: content;
  background-color: ${theme.background};
  padding: 20px;
`;
