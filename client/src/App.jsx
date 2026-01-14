import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {API_BASE_URL} from "./config/api.js";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/users`, form);
    setForm({ name: "", email: "" });
    const res = await axios.get(`${API_BASE_URL}/users`);
    setUsers(res.data);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Application React + Express + MySQL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Ajouter</button>
      </form>

      <h2>Liste des utilisateurs :</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
