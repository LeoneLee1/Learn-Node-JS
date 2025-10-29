const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Register akun
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Refresh Token
router.post("/token", authController.refreshToken);

// Logout
router.delete("/logout", auth, authController.logout);

module.exports = router;
