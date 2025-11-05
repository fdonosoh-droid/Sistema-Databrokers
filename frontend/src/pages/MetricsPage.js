import React, { useEffect, useState } from "react";
import { getMetrics, createMetric } from "../api/metrics";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState([]);
  const [form, setForm] = useState({ leads: 0, visitas: 0, cierres: 0 });

  const load = async () => setMetrics(await getMetrics());
  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: Number(e.target.value) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMetric(form);
    setForm({ leads: 0, visitas: 0, cierres: 0 });
    load();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Métricas de Negocio</h2>
      <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              min="0"
              name="leads"
              placeholder="Leads"
              value={form.leads}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              min="0"
              name="visitas"
              placeholder="Visitas"
              value={form.visitas}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              min="0"
              name="cierres"
              placeholder="Cierres"
              value={form.cierres}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100">Guardar</button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Leads</th>
            <th>Visitas</th>
            <th>Cierres</th>
          </tr>
        </thead>
        <tbody>
          {metrics.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Sin datos.
              </td>
            </tr>
          ) : (
            metrics.map((m) => (
              <tr key={m.id}>
                <td>{m.fecha}</td>
                <td>{m.leads}</td>
                <td>{m.visitas}</td>
                <td>{m.cierres}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
