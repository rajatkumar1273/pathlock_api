const express = require("express");
const User = require("../models/user"); // Import the User model
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body; // Extract name and email from the request body

    // Validate input
    if (!name || !email) {
      return res.status(400).send({ error: "Name and Email are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ error: "Email already exists" });
    }

    // Create a new user
    const user = await User.create({ name, email });
    res.status(201).send(user); // Respond with the created user
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const { status } = req.query; // Extract query parameter for filtering by status

    // Fetch users, optionally filtering by status
    const users = status
      ? await User.findAll({ where: { status } })
      : await User.findAll();

    res.send(users); // Respond with the list of users
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the URL
    const user = await User.findByPk(id); // Find the user by primary key

    if (!user) {
      return res.status(404).send({ error: "User not found" }); // Return 404 if user not found
    }

    res.send(user); // Respond with the user data
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Update user details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the URL
    const { name, email, status } = req.body; // Extract fields from the request body

    const user = await User.findByPk(id); // Find the user by primary key
    if (!user) {
      return res.status(404).send({ error: "User not found" }); // Return 404 if user not found
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.status = status || user.status;
    await user.save();

    res.send(user); // Respond with the updated user data
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Soft delete a user (mark as Inactive)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the URL
    const user = await User.findByPk(id); // Find the user by primary key

    if (!user) {
      return res.status(404).send({ error: "User not found" }); // Return 404 if user not found
    }

    // Mark user as inactive
    user.status = "Inactive";
    await user.save();

    res.send({ message: "User marked as inactive" }); // Respond with success message
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

module.exports = router; // Export the router
