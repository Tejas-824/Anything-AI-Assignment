'use client';

import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  status: 'pending'
};

export default function TaskForm({ onSubmit, editingTask }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'pending'
      });
    } else {
      setFormData(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => setFormData(initialState));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border bg-white p-4 shadow-sm"
    >
      <h3 className="mb-4 text-lg font-semibold">
        {editingTask ? 'Update Task' : 'Add Task'}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter task description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black"
      >
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}