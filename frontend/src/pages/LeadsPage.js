import React, { useEffect, useState } from "react";
import { getLeads, createLead } from "../api/leads";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });
  const [loading, setLoading] = useState(false);

  // Cargar leads al iniciar
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error("Error al obtener leads:", err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo)
      return alert("Nombre y correo son obligatorios.");
    try {
      await createLead(form);
      setForm({ nombre: "", correo: "", telefono: "" });
      loadLeads();
    } catch (err) {
      console.error("Error al crear lead:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Gestión de Leads</h2>

      <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              +
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <p className="text-center">Cargando leads...</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha creación</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay leads registrados.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.nombre}</td>
                  <td>{lead.correo}</td>
                  <td>{lead.telefono || "-"}</td>
                  <td>{new Date(lead.fecha_creacion).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
