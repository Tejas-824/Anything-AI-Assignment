'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearAuth, getToken } from '../lib/auth';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [pathname]);

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    router.replace('/login');
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold text-gray-800">
          Assignment App
        </div>

        <div className="flex items-center gap-3 text-sm sm:text-base">
          {!isLoggedIn ? (
            <>
              <Link href="/register" className="text-gray-600 hover:text-black">
                Register
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="text-gray-600 hover:text-black">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-black">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-black"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}