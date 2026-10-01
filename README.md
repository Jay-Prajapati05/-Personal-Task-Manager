# ✅ TODO List — Full-Stack Task Manager

A full-stack task management app built with **React**, **Node.js**, **Express** and **MongoDB**. Create, edit, complete, filter and delete tasks through a clean REST API and a responsive UI.

> Built to practice production-style backend structure: layered architecture, schema validation and centralized error handling.

 **📂 Source:** `https://github.com/Jay-Prajapati05/-Personal-Task-Manager.git`

---

## ✨ Features

**Task management**
- Create, view, edit and delete tasks
- Mark tasks as completed
- Optional description and due date
- Filter by **All / Pending / Completed**

**User experience**
- Responsive UI styled with Tailwind CSS
- Loading, empty and error states
- Client-side title validation

**Backend quality**
- RESTful API with MongoDB persistence
- Request validation using **Zod**
- Centralized error handling (invalid ID → `400`, missing task → `404`)
- CORS configuration and a health-check endpoint

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express.js, Mongoose, Zod, dotenv, CORS |
| Database | MongoDB |

---

## 🏗 Architecture

The backend follows a **layered architecture** so each part has a single responsibility.

```text
Client → Route → Middleware (validation) → Controller → Service → Model → MongoDB
```

| Layer | Responsibility |
|---|---|
| `routes/` | Maps URLs to controllers |
| `middlewares/` | Validation and centralized error handling |
| `controllers/` | HTTP request/response handling |
| `services/` | Business logic and database operations |
| `models/` | Mongoose schema and persistence |
| `schemas/` | Zod request-validation schemas |
| `utils/` | Reusable helpers (e.g. `AppError`) |

On the frontend, all HTTP calls live in `src/services/taskApi.js`, so UI components stay focused on presentation.

<details>
<summary><b>📁 Project structure</b></summary>

```text
TODO-LIST/
├── backend/
│   ├── src/
│   │   ├── config/        # DB connection
│   │   ├── models/        # Mongoose models
│   │   ├── services/      # Business logic
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Validation, error handling
│   │   ├── schemas/       # Zod schemas
│   │   └── utils/         # AppError and helpers
│   ├── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/    # TaskForm, TaskList
        ├── services/      # taskApi.js (Axios)
        ├── App.jsx
        └── main.jsx
```
</details>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd TODO-LIST
```

### 2. Run the backend
```bash
cd backend
npm install
```
Create a `.env` file (see `.env.example`):
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```
Start the server using the dev script in `package.json`. The API runs at `http://localhost:8000`.

### 3. Run the frontend
```bash
cd frontend
npm install
npm run dev
```
The app runs at `http://localhost:5173`.

---

## 📡 API Reference

Base URL: `http://localhost:8000/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Backend health check |
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/:id` | Get a task by ID |
| `PATCH` | `/api/tasks/:id` | Update a task (also used to mark complete) |
| `DELETE` | `/api/tasks/:id` | Delete a task |

<details>
<summary><b>Example: create a task</b></summary>

**Request**
```json
POST /api/tasks
{
  "title": "Learn Express.js",
  "description": "Build a REST API",
  "dueDate": "2026-10-15T00:00:00.000Z"
}
```

**Response**
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
</details>

<details>
<summary><b>Error responses</b></summary>

| Case | Status | Response |
|---|---|---|
| Invalid MongoDB ID | `400` | `{ "success": false, "message": "Invalid task ID" }` |
| Task not found | `404` | `{ "success": false, "message": "Task not found" }` |
| Unexpected error | `500` | Generic message, no stack trace exposed |
</details>

**Task fields:** `title` (required), `description`, `status` (`pending` | `completed`, default `pending`), `dueDate`, plus timestamps.

---

## 💡 Key Highlights

- **Separation of concerns:** routes, controllers, services and models are kept in separate layers.
- **Validation at the boundary:** Zod validates every request before it reaches business logic; the backend stays the final authority even though the frontend also checks input.
- **Consistent errors:** one error handler and a custom `AppError` class give uniform API responses.
- **Clean frontend data layer:** a dedicated API service instead of Axios calls scattered across components.

---

## 🗺 Roadmap

- [ ] User authentication and user-owned tasks
- [ ] Server-side filtering, search and pagination
- [ ] Task priority and categories
- [ ] Delete confirmation
- [ ] Automated API and component tests
- [ ] Deployment and Swagger/OpenAPI docs

---

## 🤝 Contributing

1. Create a branch per change: `feat/<name>`, `fix/<name>`, `docs/<name>`
2. Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat: add task filtering`)
3. Make sure both frontend and backend run, and no secrets are committed

---

## 👤 Author

**Jay Prajapati** — [GitHub](https://github.com/Jay-Prajapati05)