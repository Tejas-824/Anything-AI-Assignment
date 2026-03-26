'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUserRole } from '../../lib/auth';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const role = getUserRole();

    if (!token) {
      router.replace('/login');
      return;
    }

    if (role !== 'admin') {
      router.replace('/');
    }
  }, [router]);

  return <div>Admin Dashboard</div>;
}