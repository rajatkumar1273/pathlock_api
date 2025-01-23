const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import the Sequelize instance from the db.js file

// Define the Role model
const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER, // Integer data type
    primaryKey: true, // Mark this as the primary key
    autoIncrement: true, // Enable auto-increment for this field
  },
  name: {
    type: DataTypes.STRING, // String data type
    allowNull: false, // This field cannot be null
  },
  description: {
    type: DataTypes.STRING, // String data type for an optional description
  },
});

// Export the Role model for use in other parts of the application
module.exports = Role;
