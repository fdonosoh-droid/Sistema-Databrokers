import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  return (
    <div
      className="bg-light border-end"
      style={{ width: "200px", minHeight: "100vh" }}
    >
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action">
          🏠 Dashboard
        </Link>
        <Link to="/leads" className="list-group-item list-group-item-action">
          👥 Leads
        </Link>
        <Link
          to="/exchanges"
          className="list-group-item list-group-item-action"
        >
          🔄 Canjes
        </Link>
        <Link to="/metrics" className="list-group-item list-group-item-action">
          📊 Métricas
        </Link>
        <Link
          to="/notifications"
          className="list-group-item list-group-item-action"
        >
          🔔 Notificaciones
        </Link>
      </div>
    </div>
  );
}
