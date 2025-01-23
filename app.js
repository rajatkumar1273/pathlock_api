const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db");

const userRoutes = require("./routes/users");
const roleRoutes = require("./routes/roles");
const userRoleRoutes = require("./routes/userRoles");

const app = express();
const PORT = 3000;

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Root route - Optional, just returns a message to indicate the server is running
app.get("/", (req, res) => {
  res.send(
    "User Provisioning System API is running. Access /users, /roles, or /user-roles."
  );
});

// Routes
app.use("/users", userRoutes); // User management routes
app.use("/roles", roleRoutes); // Role management routes
app.use("/user-roles", userRoleRoutes); // User-role assignment routes

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
