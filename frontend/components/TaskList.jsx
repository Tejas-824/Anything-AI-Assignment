'use client';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center text-gray-500 shadow-sm">
        No tasks found
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{task.description}</p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Status:</span> {task.status}
              </p>
              {task.user && (
                <p className="mt-1 text-sm">
                  <span className="font-medium">User:</span> {task.user.name}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}