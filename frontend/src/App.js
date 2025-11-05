import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import ExchangesPage from "./pages/ExchangesPage";
import MetricsPage from "./pages/MetricsPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/exchanges" element={<ExchangesPage />} />
        <Route path="/metrics" element={<MetricsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
