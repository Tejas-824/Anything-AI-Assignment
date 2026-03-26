'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../lib/auth';

export default function HomePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace('/register');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Task Management System
      </h1>

      <p className="mt-3 text-sm text-gray-600 sm:text-base">
        You can create, update, and delete tasks from your dashboard.
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Use the dashboard to manage your tasks easily.
      </p>
    </div>
  );
}