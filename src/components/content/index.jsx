import React from "react";

export default function Content({ title, children, button }) {
  return (
    <div className="conten">
      <div className="rowheader">
        <h2> {title}</h2>
      </div>
      {children}
    </div>
  );
}
