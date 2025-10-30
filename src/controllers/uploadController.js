exports.single = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File tidak ditemukan!" });

  res.json({
    message: "Upload berhasil",
    file: {
      name: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size,
    },
  });
};

exports.multiple = (req, res) => {
  res.json({
    message: "Upload multiple berhasil",
    files: req.files.map((f) => ({
      name: f.filename,
      path: `/uploads/${f.filename}`,
      size: f.size,
    })),
  });
};
