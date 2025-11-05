import React, { useEffect, useState } from "react";
import { getNotifications, createNotification } from "../api/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ titulo: "", mensaje: "" });

  const load = async () => setNotifications(await getNotifications());
  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.mensaje)
      return alert("Completa título y mensaje.");
    await createNotification(form);
    setForm({ titulo: "", mensaje: "" });
    load();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Notificaciones</h2>
      <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
        <input
          className="form-control mb-2"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="mensaje"
          placeholder="Mensaje"
          rows="3"
          value={form.mensaje}
          onChange={handleChange}
        />
        <button className="btn btn-info">Enviar</button>
      </form>

      <ul className="list-group">
        {notifications.length === 0 ? (
          <li className="list-group-item text-center">
            No hay notificaciones.
          </li>
        ) : (
          notifications.map((n) => (
            <li key={n.id} className="list-group-item">
              <strong>{n.titulo}</strong> — {n.mensaje}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
