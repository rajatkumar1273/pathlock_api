const express = require("express");
const User = require("../models/user"); // Import User model
const Role = require("../models/role"); // Import Role model
const UserRoleAssignment = require("../models/userRole"); // Import UserRoleAssignment model
const router = express.Router();

// Assign a role to a user
router.post("/", async (req, res) => {
  try {
    const { userId, roleId } = req.body; // Extract userId and roleId from the request body

    // Validate input
    if (!userId || !roleId) {
      return res
        .status(400)
        .send({ error: "User ID and Role ID are required" });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if role exists
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).send({ error: "Role not found" });
    }

    // Check if the user already has the role assigned
    const existingAssignment = await UserRoleAssignment.findOne({
      where: { userId, roleId },
    });
    if (existingAssignment) {
      return res
        .status(400)
        .send({ error: "Role is already assigned to the user" });
    }

    // Assign the role to the user
    const userRoleAssignment = await UserRoleAssignment.create({
      userId,
      roleId,
    });

    res.status(201).send(userRoleAssignment); // Respond with the created assignment
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// List all user-role assignments (filter by userId or roleId)
router.get("/", async (req, res) => {
  try {
    const { userId, roleId } = req.query; // Extract query parameters for filtering

    const filter = {};
    if (userId) filter.userId = userId;
    if (roleId) filter.roleId = roleId;

    // Fetch user-role assignments based on the filter
    const userRoleAssignments = await UserRoleAssignment.findAll({
      where: filter,
      include: [User, Role], // Include User and Role data in the response
    });

    res.send(userRoleAssignments); // Respond with the list of assignments
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

// Remove a role assignment from a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract assignment ID from the URL

    // Find the assignment by ID
    const userRoleAssignment = await UserRoleAssignment.findByPk(id);
    if (!userRoleAssignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }

    // Delete the assignment
    await userRoleAssignment.destroy();
    res.send({ message: "Role assignment removed successfully" }); // Respond with success message
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" }); // Handle server errors
  }
});

module.exports = router; // Export the router
