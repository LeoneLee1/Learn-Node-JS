const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, now(), now())`;

  const values = [name, email, hashedPassword];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json(result);
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    const user = result[0];

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res.status(401).json({ message: "Password salah" });
    }

    try {
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "1h" });

      const refreshToken = jwt.sign({ id: user.id, email: user }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

      db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [refreshToken, user.id]);

      res.json({
        message: "Login berhasil",
        token,
        refreshToken,
      });
    } catch (jwtError) {
      console.error("JWT Error:", jwtError);
      res.status(500).json({ message: "Gagal membuat token" });
    }
  });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Server error" });

  db.query("SELECT * FROM users WHERE refresh_token = ?", refreshToken, (err, result) => {
    if (err) return res.status(401).json({ message: "Server error" });

    if (result.length === 0) return res.status(403).json({ message: "Token tidak valid" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token kadaluarsa atau tidak valid" });

      const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ accessToken });
    });
  });
};

exports.logout = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: "Token tidak ada" });

  db.query("UPDATE users SET refresh_token = NULL WHERE refresh_token = ?", refreshToken, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json({ message: "Logout berhasil", result });
  });
};
