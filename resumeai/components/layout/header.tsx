'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { signOut } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase/config');
      await signOut(auth);
      useAuthStore.setState({ user: null });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">RA</span>
          </div>
          <span className="hidden font-bold text-gray-900 sm:inline">ResumeAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">
                Templates
              </Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </>
          ) : (
            <>
              <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
                How it works
              </Link>
              <Link href="/#pricing" className="text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button size="sm" onClick={() => router.push('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
