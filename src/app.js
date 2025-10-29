const express = require("express");
const userRoutes = require("./routes/userRoutes");

// Logger Manual
const logger = require("./middleware/logger");

// Logger Siap pakai
const morgan = require("morgan");

const app = express();
app.use(express.json());

const PORT = 8081;

// Logger Manual
app.use(logger);

// Logger Siap pakai
// app.use(morgan("combined"));

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

app.get("/users/profile", userRoutes);

module.exports = app;
