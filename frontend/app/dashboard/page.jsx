'use client';

import { useCallback, useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getProfile
} from '../../lib/api';
import { getToken, getUser } from '../../lib/auth';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const token = getToken();

      if (!token) return;

      const tasksData = await getTasks(token);
      const profileData = await getProfile(token);

      setTasks(tasksData.tasks || []);
      setProfile(profileData.user || getUser());
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateOrUpdate = async (formData, resetForm) => {
    try {
      const token = getToken();
      let data;

      if (editingTask) {
        data = await updateTask(editingTask._id, formData, token);
        setEditingTask(null);
      } else {
        data = await createTask(formData, token);
        resetForm();
      }

      setMessage(data.message || 'Success');
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      const data = await deleteTask(id, token);
      setMessage(data.message || 'Deleted');
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

          {profile && (
            <p className="mt-2 text-sm text-gray-600">
              Welcome, <span className="font-medium">{profile.name}</span> ({profile.role})
            </p>
          )}

          {message && (
            <p className="mt-3 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
              {message}
            </p>
          )}
        </div>

        <TaskForm onSubmit={handleCreateOrUpdate} editingTask={editingTask} />
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
      </div>
    </ProtectedRoute>
  );
}