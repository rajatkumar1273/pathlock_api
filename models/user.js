const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import the Sequelize instance from the db.js file

// Define the User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER, // Integer data type
    primaryKey: true, // Mark this as the primary key
    autoIncrement: true, // Enable auto-increment for this field
  },
  name: {
    type: DataTypes.STRING, // String data type
    allowNull: false, // This field cannot be null
  },
  email: {
    type: DataTypes.STRING, // String data type
    unique: true, // Ensure unique values for email
    allowNull: false, // This field cannot be null
  },
  status: {
    type: DataTypes.STRING, // String data type
    defaultValue: "Active", // Default value for status
  },
  createdDate: {
    type: DataTypes.DATE, // Date data type
    defaultValue: DataTypes.NOW, // Default to the current date and time
  },
});

// Export the User model for use in other parts of the application
module.exports = User;
