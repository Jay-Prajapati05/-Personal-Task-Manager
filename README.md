# TODO List

A full-stack task management application with a React frontend and a Node.js/Express/MongoDB backend.

The project provides a simple task workflow for creating, viewing, editing, completing, filtering, and deleting tasks through a REST API and a responsive web interface.

---

## Features

### Task Management

- Create a task
- View all tasks
- View a task by ID through the API
- Edit an existing task
- Mark a task as completed
- Delete a task
- Optional task description
- Optional due date
- Task status: `pending` or `completed`

### Frontend

- React-based task management UI
- Create and edit task form
- Task list
- Mark task as completed
- Delete task
- All / Pending / Completed filters
- Loading state
- Empty state
- Error state
- Client-side title validation
- Responsive styling with Tailwind CSS

### Backend

- RESTful Task API
- MongoDB persistence
- Request validation
- Centralized error handling
- Invalid MongoDB ID handling
- 404 handling for missing tasks
- CORS configuration
- Health-check endpoint

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- CORS
- dotenv

---

## Project Structure

```text
TODO-LIST/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── taskModel.js
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   └── ...
│   │   ├── schemas/
│   │   │   └── ...
│   │   └── utils/
│   │       └── AppError.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── taskApi.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

> The exact contents of some directories may evolve as the project grows. The structure above describes the intended application architecture.

---

## Architecture

The backend follows a layered architecture.

### Build Order

Each backend feature is implemented in this dependency order:

```text
Model
  ↓
Service
  ↓
Controller
  ↓
Route
  ↓
Server Mount
```

### Runtime Request Flow

An incoming request flows in the opposite direction:

```text
Client
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
  ↓
Response
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| `models/` | MongoDB data structure and persistence |
| `services/` | Business logic and database operations |
| `controllers/` | HTTP request/response handling |
| `routes/` | URL-to-controller mapping |
| `middlewares/` | Validation, authentication, error handling, etc. |
| `schemas/` | Request validation schemas |
| `utils/` | Small reusable helpers |
| `config/` | External service/database configuration |

---

# Backend

## Backend Setup

### 1. Move into the backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

Do not commit real secrets or credentials to Git.

### 4. Start the backend

Use the development script defined in the backend `package.json`.

The API is expected to run on:

```text
http://localhost:8000
```

---

# Frontend

## Frontend Setup

### 1. Move into the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The Vite development server is expected to run on:

```text
http://localhost:5173
```

The frontend communicates with the backend through Axios using:

```text
http://localhost:8000/api
```

---

# API Reference

Base URL:

```text
http://localhost:8000/api
```

## Health Check

### `GET /health`

Checks whether the backend server is running.

Example:

```http
GET http://localhost:8000/health
```

Successful response:

```json
{
  "status": "ok"
}
```

---

## Get All Tasks

### `GET /api/tasks`

Returns all tasks.

Example:

```http
GET http://localhost:8000/api/tasks
```

Successful response:

```json
{
  "success": true,
  "data": []
}
```

---

## Create Task

### `POST /api/tasks`

Creates a new task.

Example request:

```json
{
  "title": "Learn Express.js",
  "description": "Build a REST API",
  "dueDate": "2026-10-15T00:00:00.000Z"
}
```

Successful response:

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Learn Express.js",
    "description": "Build a REST API",
    "status": "pending",
    "dueDate": "2026-10-15T00:00:00.000Z"
  }
}
```

---

## Get Task by ID

### `GET /api/tasks/:id`

Returns a single task by MongoDB ID.

Example:

```http
GET http://localhost:8000/api/tasks/64f...
```

Possible responses:

- `200` — task found
- `400` — invalid task ID
- `404` — task does not exist

---

## Update Task

### `PATCH /api/tasks/:id`

Updates an existing task.

Example:

```json
{
  "title": "Learn Express and MongoDB",
  "status": "completed"
}
```

This endpoint is also used by the frontend to mark a task as completed.

Possible responses:

- `200` — task updated
- `400` — invalid task ID/request
- `404` — task does not exist

---

## Delete Task

### `DELETE /api/tasks/:id`

Deletes an existing task.

Example:

```http
DELETE http://localhost:8000/api/tasks/64f...
```

Successful response:

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

Possible responses:

- `200` — task deleted
- `400` — invalid task ID
- `404` — task does not exist

---

# API Endpoint Summary

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Backend health check |
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/:id` | Get one task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

These endpoints match the Task CRUD flow implemented by the frontend API service.

---

# Task Data

A task supports the following fields:

| Field | Description |
|---|---|
| `_id` | MongoDB-generated task ID |
| `title` | Task title |
| `description` | Optional task description |
| `status` | `pending` or `completed` |
| `dueDate` | Optional task due date |
| timestamps | Database timestamps, where configured |

The frontend currently uses the task status to display and filter tasks.

---

# Validation

Task requests are validated separately from the MongoDB model.

The application validates task input before it reaches the business logic layer.

The frontend also performs a basic title check before sending a create/update request.

For example:

```text
Title is required
```

Backend validation remains the final authority because clients cannot be trusted.

---

# Error Handling

The backend uses centralized error handling.

### Invalid Task ID

If a request contains an invalid MongoDB ObjectId:

```text
400 Bad Request
```

Response:

```json
{
  "success": false,
  "message": "Invalid task ID"
}
```

### Task Not Found

If a valid ID does not belong to an existing task:

```text
404 Not Found
```

Response:

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Unexpected Server Error

Unexpected errors return a generic server error response instead of exposing internal stack traces.

---

# Frontend API Integration

The frontend keeps HTTP communication inside:

```text
frontend/src/services/taskApi.js
```

The service exposes operations for:

```text
getTasks()
createTask()
updateTask()
deleteTask()
```

Components use these functions instead of putting Axios calls throughout the UI.

This keeps API communication separate from presentation logic.

---

# Frontend Components

## `TaskForm`

Responsible for:

- Creating tasks
- Editing tasks
- Managing form state
- Validating the required title
- Sending create/update requests
- Showing form-level errors
- Handling edit cancellation

## `TaskList`

Responsible for:

- Displaying tasks
- Showing task status
- Showing due dates
- Starting task editing
- Marking tasks complete
- Deleting tasks
- Showing the empty state

## `App`

Responsible for:

- Loading tasks
- Maintaining task state
- Maintaining the active filter
- Maintaining the currently edited task
- Updating the UI after CRUD operations
- Connecting `TaskForm` and `TaskList`

---

# Task Filtering

The frontend currently provides three filters:

```text
All
Pending
Completed
```

Filtering is performed on the client side using the tasks already loaded from the API.

There is currently no separate backend filtering endpoint.

---

# Testing & Verification

The current API should be manually verified with the following checklist.

## Health Check

- [ ] `GET /health` returns `200`
- [ ] Response contains `"status": "ok"`

## Create

- [ ] Create task with a valid title
- [ ] Create task with description
- [ ] Create task with due date
- [ ] Verify task is stored in MongoDB
- [ ] Verify default status is `pending`
- [ ] Verify invalid input is rejected

## Read

- [ ] `GET /api/tasks` returns created tasks
- [ ] `GET /api/tasks/:id` returns the correct task
- [ ] Verify a missing task returns `404`
- [ ] Verify an invalid MongoDB ID returns `400`

## Update

- [ ] Update task title
- [ ] Update description
- [ ] Update due date
- [ ] Change status to `completed`
- [ ] Verify the updated document directly in MongoDB
- [ ] Verify updating a missing task returns `404`

## Delete

- [ ] Delete an existing task
- [ ] Verify the task is removed from MongoDB
- [ ] Verify deleting a missing task returns `404`
- [ ] Verify an invalid ID returns `400`

## Frontend

- [ ] Load tasks
- [ ] Create task
- [ ] Edit task
- [ ] Mark task complete
- [ ] Delete task
- [ ] Filter All / Pending / Completed
- [ ] Refresh the page and verify persisted tasks remain available
- [ ] Verify loading, empty, and error states

---

# Development Workflow

The project follows a feature-oriented Git workflow.

## Branches

Use a dedicated branch for each feature or fix:

```text
feat/<feature-name>
fix/<bug-name>
chore/<task-name>
refactor/<change-name>
docs/<documentation-name>
```

Example:

```bash
git switch -c feat/task-filter
```

Avoid direct commits to `main` after the initial scaffold.

## Commit Style

Use Conventional Commits.

Examples:

```text
feat: add task filtering
fix: handle invalid task id
refactor: separate task business logic
docs: update API documentation
```

Keep commits aligned with logical changes rather than creating one huge commit.

## Pull Request Checklist

Before merging:

- [ ] Review the complete diff
- [ ] Verify API endpoints
- [ ] Run the frontend
- [ ] Run the backend
- [ ] Test the affected feature
- [ ] Check error cases
- [ ] Verify no secrets are committed
- [ ] Verify README/documentation is up to date

---

# Current Scope

The current application is an MVP task manager.

The focus is on a simple and correct CRUD workflow:

```text
Create
  ↓
Read
  ↓
Update
  ↓
Complete
  ↓
Delete
```

Authentication, authorization, advanced filtering, pagination, caching, and other production features are outside the current MVP scope.

They can be introduced later as separate features following the same layered architecture.

---

# Future Improvements

Potential next features include:

- User authentication
- User-owned tasks
- Authorization
- Server-side filtering
- Pagination
- Search
- Task priority
- Task categories
- Better loading states
- Delete confirmation
- Automated API tests
- Frontend component tests
- Production deployment
- API documentation with OpenAPI/Swagger

These should be implemented incrementally rather than added to the MVP all at once.

---

# Project Status

**Status:** MVP Task Management Application

The project currently contains:

- React frontend
- Node.js/Express backend
- MongoDB persistence
- Task CRUD API
- Request validation
- Centralized error handling
- Task filtering
- Frontend/backend API integration
- Responsive UI

---

## License

This project is currently intended as a learning and portfolio project.
