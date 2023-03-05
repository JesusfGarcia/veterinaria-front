import React from "react";
import Content from "../../components/content";
import Tabs from "../../components/tabs";
import Exparasyte from "./exparasyte";
import Intparasyte from "./intparasyte";
import Container from "../../components/container";

export default function ParasyteScreen() {
  return (
    <Container>
      <Content title="Parasitos">
        <div className="linea"></div>
        <Tabs items={items} />
      </Content>
    </Container>
  );
}
const items = [
  { label: "Parasitos externos", component: <Exparasyte /> },
  {
    label: "Parasitos Internos",
    component: <Intparasyte />,
  },
];
