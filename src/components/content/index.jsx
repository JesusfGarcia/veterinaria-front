import React from "react";
import { AddButton } from "../../styles/header";
import { Hr } from "../../styles/hr";

export default function Content({ title, children, button }) {
  return (
    <div className="conten">
      <div className="rowheader">
        <h2> {title}</h2>
        {button && <AddButton>{button}</AddButton>}
      </div>
      {children}
    </div>
  );
}
