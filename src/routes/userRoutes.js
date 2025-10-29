const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// Get all users Data
router.get("/users", userController.getAllUsers);

// Create users
router.post("/users/create", userController.createUsers);

// Show users data by id
router.get("/users/show/:id", userController.getUsersData);

// Update users data by id
router.put("/users/update/:id", userController.updateUsersData);

// Delete users data by id
router.delete("/users/delete/:id", userController.deleteUsersData);

module.exports = router;
