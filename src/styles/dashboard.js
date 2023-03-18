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

  position: relative;
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
  justify-content: space-between;
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

export const CantIndicator = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${theme.red};
  width: 25px;
  height: 25px;
  border-radius: 25px;
  color: ${theme.textLight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Floating = styled.button`
  position: absolute;
  right: 40px;
  bottom: 40px;
  background-color: ${theme.primaryHover};
  color: ${theme.textLight};
  border: 0px;
  width: 70px;
  height: 70px;
  border-radius: 70px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.31);
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.31);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
