import React from "react";

import "./styles.css"
export default function Table({ columns, data }) {
  return (
    <table className="ejemplo">
      <thead>
        <tr>
          {columns.map((title,indice) => (
            <th key={`column${indice}`}>{title.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row,idx) => (
          <tr key={idx}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
