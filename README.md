# Scalable REST API & Task Management System

This project is a robust, production-ready **Backend API** built with Node.js, Express, and MongoDB. It includes a fully functional **React Frontend** to demonstrate the API's capabilities.

Designed for the **Backend Developer Intern** assignment at Prime Trade, focusing on **Security (JWT/RBAC)**, **Scalability**, and **Documentation**.

---

## 🚀 Key Features

### ✅ Backend Architecture (Primary Focus)
- **Authentication:** Secure User Registration & Login using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
- **RBAC (Role-Based Access Control):** Distinguished roles for `User` and `Admin`.
- **API Versioning:** Routes are structured under `/api/v1/` for future scalability.
- **Data Validation:** Strict input validation using `express-validator`.
- **Documentation:** Integrated **Swagger UI** for interactive API testing.
- **Security:**
  - Protected Routes (Middleware).
  - CORS configuration.
  - Sanitized inputs.

### ✅ Frontend Integration (Bonus)
- Built with **React.js (Vite)** + **Tailwind CSS**.
- Demonstrates real-time data fetching, CRUD operations, and Auth state management.
- Responsive Glassmorphism UI.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, BcryptJS
- **Documentation:** Swagger UI Express
- **Frontend:** React, Tailwind, Axios

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
2. Backend Setup
Navigate to the backend directory:
```
Bash
```
cd backend
npm install
```
Environment Variables:
Create a .env file in the backend folder and add:

env
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```
Run the Server:

Bash

npm start
Server runs on http://localhost:5000

3. Frontend Setup (Optional for testing)
Open a new terminal:

Bash

cd frontend
npm install
npm run dev
📚 API Documentation
Once the server is running, visit the interactive Swagger documentation:

👉 http://localhost:5000/api-docs

Core Endpoints
Method	Endpoint	Access	Description
```
POST	/api/v1/auth/register	Public	Register new user
POST	/api/v1/auth/login	Public	Login & receive Token
GET	/api/v1/auth/me	Private	Get Profile
GET	/api/v1/tasks	Private	Get User's Tasks
POST	/api/v1/tasks	Private	Create Task
PUT	/api/v1/tasks/:id	Private	Update Task
DELETE	/api/v1/tasks/:id	Private	Delete Task
```
🛡️ Scalability Strategy
A detailed breakdown of how this architecture scales (Microservices, Caching, Load Balancing) is available in the SCALABILITY.md file in the root directory.

