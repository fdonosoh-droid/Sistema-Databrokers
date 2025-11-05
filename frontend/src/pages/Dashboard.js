import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Panel General Databrokers</h2>
      <div className="row text-center">
        <div className="col-md-3">
          <Link to="/leads" className="btn btn-primary w-100 p-4">
            Leads
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/exchanges" className="btn btn-warning w-100 p-4">
            Canjes
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/metrics" className="btn btn-success w-100 p-4">
            Métricas
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/notifications" className="btn btn-info w-100 p-4">
            Notificaciones
          </Link>
        </div>
      </div>
    </div>
  );
}
