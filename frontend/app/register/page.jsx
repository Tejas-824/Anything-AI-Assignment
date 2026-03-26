'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/api';
import { saveAuth, getToken, getUserRole } from '../../lib/auth';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    const role = getUserRole();

    if (token) {
      if (role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await registerUser(formData);

      if (data?.token) {
        saveAuth(data);

        const role = data?.user?.role || data?.role || formData.role;

        if (role === 'admin') {
          router.replace('/admin');
        } else {
          router.replace('/');
        }
      } else if (data?.errors?.length > 0) {
        setMessage(data.errors[0].msg);
      } else {
        setMessage(data?.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && (
        <p className="mt-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
          {message}
        </p>
      )}
    </div>
  );
}