'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../lib/api';
import { saveAuth, getToken } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace('/');
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

    const data = await loginUser(formData);

    if (data.token) {
      saveAuth(data);
      setMessage('');
      router.replace('/');
    } else if (data.errors && data.errors.length > 0) {
      setMessage(data.errors[0].msg);
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black"
        >
          Login
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