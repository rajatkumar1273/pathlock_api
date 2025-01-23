# User Provisioning System API

This project is a simple API for managing users, roles, and user-role assignments.

## Features
- User Management:
  - Create, retrieve, update, delete users.
- Role Management:
  - Add, retrieve, update, delete roles.
- User-Role Assignment:
  - Assign roles to users and retrieve user-role assignments.

## Setup Instructions
1. Clone the repository:
git clone <repository-url> cd pathlock_api
2. 2. Install dependencies:
npm install
3. Configure the database:
- Update `./db.js` with your database credentials.
4. Run the application:
node app.js
5. Access the API at `http://localhost:3000`.

## API Endpoints
### User Management:
- **POST** `/users` – Create a user.
- **GET** `/users` – Get all users.
- **GET** `/users/{id}` – Get user details.
- **PUT** `/users/{id}` – Update user details.
- **DELETE** `/users/{id}` – Soft delete a user.

### Role Management:
- **POST** `/roles` – Create a role.
- **GET** `/roles` – Get all roles.
- **GET** `/roles/{id}` – Get role details.
- **PUT** `/roles/{id}` – Update role details.
- **DELETE** `/roles/{id}` – Delete a role.

### User-Role Assignment:
- **POST** `/user-roles` – Assign a role to a user.
- **GET** `/user-roles` – Get all user-role assignments.
- **DELETE** `/user-roles/{id}` – Remove a role from a user.

## Testing Instructions
1. Import the Postman collection (see below).
2. Test the endpoints using provided JSON examples.
3. Verify proper status codes and responses.

## Postman Collection
- [Download Collection](./postman/UserProvisioningAPI.postman_collection.json)

## Screenshots
- Include screenshots of successful API tests.
