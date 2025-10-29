const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

const PORT = 8081;

app.get("/", (req, res) => {
  return res.json(`Server Running on Port ${PORT}`);
});

// Get all users Data
app.get("/users", userRoutes);

// Create users
app.post("/users/create", userRoutes);

// Show users data by id
app.get("/users/show/:id", userRoutes);

// Update users data by id
app.put("/users/update/:id", userRoutes);

// Delete users data by id
app.delete("/users/delete/:id", userRoutes);

module.exports = app;
