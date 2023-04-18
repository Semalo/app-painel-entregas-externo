import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./index.css";
import { AuthProvider } from "./Shared/AuthContext";

const App = () => (
  <Router>
    <AuthProvider >
      <AppRoutes />
    </AuthProvider>
  </Router>
);

export default App;
