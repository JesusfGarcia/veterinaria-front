import React from "react";
import Dashboard from "./components/dashboard";
import Login from "./views/login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/global.scss";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
