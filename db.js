const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with SQLite as the database dialect
const sequelize = new Sequelize({
  dialect: "sqlite", // Specifies SQLite as the database engine
  storage: "user_provisioning.db", // Name of the SQLite database file
  logging: false, // Disable logging to keep the console clean (optional)
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Export the sequelize instance for use in other files
module.exports = sequelize;
