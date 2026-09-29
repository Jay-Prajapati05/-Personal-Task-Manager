import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/taskApi.js";

function TaskForm({
  onTaskCreated,
  editingTask,
  onTaskUpdated,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!editingTask) {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });

      setError("");
      return;
    }

    setFormData({
      title: editingTask.title || "",
      description: editingTask.description || "",
      dueDate: editingTask.dueDate
        ? editingTask.dueDate.slice(0, 10)
        : "",
    });

    setError("");
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setError("");

      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        ...(formData.dueDate && {
          dueDate: new Date(formData.dueDate).toISOString(),
        }),
      };

      if (editingTask) {
        const response = await updateTask(editingTask._id, taskData);

        onTaskUpdated(response.data);
        onCancelEdit();
      } else {
        const response = await createTask(taskData);

        onTaskCreated(response.data);

        setFormData({
          title: "",
          description: "",
          dueDate: "",
        });
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to save task"
      );
    }
  };

 return (
  <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-5 text-xl font-semibold text-slate-900">
      {editingTask ? "Edit Task" : "Add Task"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Due Date
        </label>

        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  </section>
);
}

export default TaskForm;