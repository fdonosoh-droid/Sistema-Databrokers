import React, { useEffect, useState } from "react";
import { getExchanges, createExchange } from "../api/exchanges";

export default function ExchangesPage() {
  const [exchanges, setExchanges] = useState([]);
  const [form, setForm] = useState({
    corredor_oferta: "",
    corredor_demandante: "",
    propiedad: "",
  });

  const load = async () => setExchanges(await getExchanges());
  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.corredor_oferta || !form.corredor_demandante || !form.propiedad)
      return alert("Completa todos los campos.");
    await createExchange(form);
    setForm({ corredor_oferta: "", corredor_demandante: "", propiedad: "" });
    load();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de Canjes</h2>
      <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              name="corredor_oferta"
              placeholder="Corredor Oferta"
              value={form.corredor_oferta}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              name="corredor_demandante"
              placeholder="Corredor Demandante"
              value={form.corredor_demandante}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              name="propiedad"
              placeholder="Propiedad"
              value={form.propiedad}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-warning w-100">+</button>
          </div>
        </div>
      </form>
      <ul className="list-group">
        {exchanges.length === 0 ? (
          <li className="list-group-item text-center">
            No hay canjes registrados.
          </li>
        ) : (
          exchanges.map((ex) => (
            <li key={ex.id} className="list-group-item">
              <strong>{ex.corredor_oferta}</strong> ↔{" "}
              <strong>{ex.corredor_demandante}</strong> — {ex.propiedad}{" "}
              <em>({ex.estado})</em>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
