import { useEffect, useState } from "react";

import { getTasks } from "./services/taskApi.js";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();

        setTasks(response.data);
      } catch (error) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="text-sm text-slate-500">Loading tasks...</p>
    </main>
  );
}

 if (error) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </p>
    </main>
  );
}

  const filteredTasks = tasks.filter((task) => {
  if (filter === "pending") {
    return task.status !== "completed";
  }

  if (filter === "completed") {
    return task.status === "completed";
  }

  return true;
});

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
     <h1 className="mb-8 text-3xl font-bold text-slate-900">
  Personal Task Manager
</h1>
     <div className="mb-6 flex gap-2">
  <button
    onClick={() => setFilter("all")}
    className={
      filter === "all"
        ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
    }
  >
    All
  </button>

  <button
    onClick={() => setFilter("pending")}
    className={
      filter === "pending"
        ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
    }
  >
    Pending
  </button>

  <button
    onClick={() => setFilter("completed")}
    className={
      filter === "completed"
        ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
    }
  >
    Completed
  </button>
</div>

      <TaskForm
        editingTask={editingTask}
        onTaskCreated={(newTask) => {
          setTasks((currentTasks) => [newTask, ...currentTasks]);
        }}
        onTaskUpdated={(updatedTask) => {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
        }}
        onCancelEdit={() => {
          setEditingTask(null);
        }}
      />

      <TaskList
        tasks={filteredTasks}
        onTaskDeleted={(taskId) => {
          setTasks((currentTasks) =>
            currentTasks.filter((task) => task._id !== taskId)
          );
        }}
        onTaskUpdated={(updatedTask) => {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
        }}
        onEditTask={(task) => {
          setEditingTask(task);
        }}
      />

      
    </main>
  );
}

export default App;