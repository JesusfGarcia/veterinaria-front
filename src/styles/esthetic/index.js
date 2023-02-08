import styled from "styled-components";
import { theme } from "../theme";

export const PacketsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 35px;
  flex-wrap: wrap;
`;

export const Packet = styled.div`
  height: 300px;
  width: 250px;
  background-color: red;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.24);
`;

export const PacketTitle = styled.div`
  background-color: ${theme.primary};
  color: ${theme.textLight};
  padding: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const PacketDescription = styled.span`
  background-color: ${theme.background};
  padding: 10px;
  text-align: justify;
  flex: 1;
`;

export const PacketFooter = styled.div`
  background-color: ${theme.primary};
  color: ${theme.textLight};
  padding: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
`;
