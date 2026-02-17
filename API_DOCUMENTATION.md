# API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication

### 1. Register User
*   **Endpoint:** `POST /auth/register`
*   **Body:**
    ```json
    {
      "username": "JohnDoe",
      "email": "john@example.com",
      "password": "secretpassword"
    }
    ```
*   **Response:** returns JWT token + User info.

### 2. Login User
*   **Endpoint:** `POST /auth/login`
*   **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "secretpassword"
    }
    ```
*   **Response:** returns JWT token.

### 3. Get Current Profile
*   **Endpoint:** `GET /auth/me`
*   **Headers:** `x-auth-token: <your_jwt_token>`

---

## Tasks (Protected Routes)
*All Task routes require Header: `x-auth-token: <token>`*

### 1. Get All Tasks
*   **Endpoint:** `GET /tasks`
*   **Description:** Returns tasks created by the logged-in user.

### 2. Create Task
*   **Endpoint:** `POST /tasks`
*   **Body:**
    ```json
    {
      "title": "Complete Assignment",
      "description": "Finish the frontend and backend task"
    }
    ```

### 3. Update Task Status
*   **Endpoint:** `PUT /tasks/:id`
*   **Body:** `{"status": "completed"}` or `{"title": "New Title"}`

### 4. Delete Task
*   **Endpoint:** `DELETE /tasks/:id`