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

      res.json({
        message: "Login berhasil",
        token,
      });
    } catch (jwtError) {
      console.error("JWT Error:", jwtError);
      res.status(500).json({ message: "Gagal membuat token" });
    }
  });
};
