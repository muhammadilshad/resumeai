'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/store';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '@/lib/types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
          } else {
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'User',
              photoURL: firebaseUser.photoURL || undefined,
              plan: 'free',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
