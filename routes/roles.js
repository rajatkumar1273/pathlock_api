const express = require("express");
const Role = require("../models/role"); // Import the Role model
const router = express.Router();

// Create a new role
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body; // Extract name and description from the request body

    // Validate input
    if (!name) {
      return res.status(400).send({ error: "Role name is required" });
    }

    // Check if the role name already exists
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).send({ error: "Role name already exists" });
    }

    // Create a new role
    const role = await Role.create({ name, description });
    res.status(201).send(role); // Respond with the created role
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.findAll(); // Fetch all roles
    res.send(roles); // Respond with the list of roles
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Get a specific role by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract role ID from the URL
    const role = await Role.findByPk(id); // Find the role by primary key

    if (!role) {
      return res.status(404).send({ error: "Role not found" }); // Return 404 if role not found
    }

    res.send(role); // Respond with the role data
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Update role details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract role ID from the URL
    const { name, description } = req.body; // Extract fields from the request body

    const role = await Role.findByPk(id); // Find the role by primary key
    if (!role) {
      return res.status(404).send({ error: "Role not found" }); // Return 404 if role not found
    }

    // Update role details
    role.name = name || role.name;
    role.description = description || role.description;
    await role.save();

    res.send(role); // Respond with the updated role data
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Delete a role
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract role ID from the URL
    const role = await Role.findByPk(id); // Find the role by primary key

    if (!role) {
      return res.status(404).send({ error: "Role not found" }); // Return 404 if role not found
    }

    // Delete the role
    await role.destroy();
    res.send({ message: "Role deleted successfully" }); // Respond with success message
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

module.exports = router; // Export the router
