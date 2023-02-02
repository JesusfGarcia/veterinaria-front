import React from "react";
import Dashboard from "./components/dashboard";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
