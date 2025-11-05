import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Databrokers
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/leads">
              Leads
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/exchanges">
              Canjes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/metrics">
              Métricas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notifications">
              Notificaciones
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
