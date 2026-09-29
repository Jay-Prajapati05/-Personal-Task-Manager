import { deleteTask, updateTask } from "../services/taskApi.js";

function TaskList({
  tasks,
  onTaskDeleted,
  onTaskUpdated,
  onEditTask,
}) {
  if (tasks.length === 0) {
    return (
      <section className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">No tasks found.</p>
      </section>
    );
  }

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);

      onTaskDeleted(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleComplete = async (task) => {
    try {
      const response = await updateTask(task._id, {
        status: "completed",
      });

      onTaskUpdated(response.data);
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <article
            key={task._id}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-slate-900">
                  {task.title}
                </h3>

                {task.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {task.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status === "completed"
                      ? "Completed"
                      : "Pending"}
                  </span>

                  {task.dueDate && (
                    <span className="text-sm text-slate-500">
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  onClick={() => onEditTask(task)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Edit
                </button>

                {task.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(task)}
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task._id)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TaskList;