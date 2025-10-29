const db = require("../config/db");
const bcrypt = require("bcrypt");

// Get all users Data
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(result);
  });
};

// Create users
exports.createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, now(), now())";

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const values = [name, email, hashedPassword];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json(result);
  });
};

// Show users data by id
exports.getUsersData = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(result);
  });
};

// Update users data by id
exports.updateUsersData = async (req, res) => {
  const id = req.params.id;

  const { name, email, password } = req.body;

  let sql, values;

  if (password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    sql = `UPDATE users SET name = ?, email = ?, password = ?, updated_at = now() WHERE id = ?`;
    values = [name, email, hashedPassword, id];
  } else {
    sql = `UPDATE users SET name = ?, email = ?, updated_at = now() WHERE id = ?`;
    values = [name, email, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json(result);
  });
};

// Delete users data by id
exports.deleteUsersData = async (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json(result);
  });
};
