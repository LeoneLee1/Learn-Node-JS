const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Tidak ada token. Akses ditolak!" });
  }

  if (token !== "Bearer mysecrettokken123") {
    return res.status(403).json({ message: "Token tidak valid!" });
  }

  next();
};

module.exports = auth;
