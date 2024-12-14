import express, { json } from "express";
const sqlite3 = require("sqlite3").verbose();
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./users.db");

const SECRET_KEY = "your-secret-key"; // Change this to a secure secret key

app.use(json());
app.use(cors());

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)`);

// Register Route
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run(username, hashedPassword, function (err) {
      if (err) return res.status(500).json({ message: "Error registering user" });
      res.status(200).json({ message: "User registered successfully" });
    });
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!row) return res.status(400).json({ message: "User not found" });

    compare(password, row.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      const token = sign({ id: row.id, username: row.username }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token });
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
