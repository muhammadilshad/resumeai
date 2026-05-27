'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Account Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" value={user.email} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <Input type="text" value={user.displayName} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
              <Input
                type="text"
                value={new Date(user.createdAt).toLocaleDateString()}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Plan Information</CardTitle>
            <CardDescription>Your current subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Plan</label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900 capitalize">{user.plan}</span>
                {user.plan === 'free' && (
                  <Button size="sm" onClick={() => router.push('/pricing')}>
                    Upgrade to Premium
                  </Button>
                )}
              </div>
            </div>
            {user.plan === 'premium' && (
              <div>
                <p className="text-sm text-gray-600">
                  Thank you for supporting ResumeAI! You have access to all premium features.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
