const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Register akun
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

router.post("/token", authController.refreshToken);

router.delete("/logout", authController.logout);

module.exports = router;
