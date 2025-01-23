const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import the Sequelize instance from the db.js file
const User = require("./user"); // Import the User model
const Role = require("./role"); // Import the Role model

// Define the UserRoleAssignment model
const UserRoleAssignment = sequelize.define("UserRoleAssignment", {
  id: {
    type: DataTypes.INTEGER, // Integer data type
    primaryKey: true, // Mark this as the primary key
    autoIncrement: true, // Enable auto-increment for this field
  },
  assignedDate: {
    type: DataTypes.DATE, // Date data type
    defaultValue: DataTypes.NOW, // Default to the current date and time
  },
});

// Define associations
UserRoleAssignment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
}); // A UserRoleAssignment belongs to a User
UserRoleAssignment.belongsTo(Role, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
}); // A UserRoleAssignment belongs to a Role

// Export the UserRoleAssignment model for use in other parts of the application
module.exports = UserRoleAssignment;
