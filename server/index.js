import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// CORS DOIT ÊTRE ICI
app.use(cors({
  origin: (origin, cb) => {
    // autorise aussi Postman / serveur-to-serveur (origin undefined)
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) return cb(null, true);

    return cb(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API Express + MySQL !");
});

// USERS
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Utilisateur ajouté avec succès !" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur le port ${PORT}`));
