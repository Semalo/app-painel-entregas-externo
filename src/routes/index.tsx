import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Tickets } from "../pages/Tickets";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/panel" element={<Home />} />
    <Route path="/tickets" element={<Tickets />} />
  </Routes>
);
