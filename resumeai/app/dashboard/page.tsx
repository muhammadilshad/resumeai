'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuthStore, useResumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Eye, Copy, Trash2, Loader } from 'lucide-react';
import { Resume } from '@/lib/types';
import { generateResumeId } from '@/lib/utils/helpers';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { resumes, setResumes } = useResumeStore();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchResumes();
    }
  }, [user, authLoading, router]);

  const fetchResumes = async () => {
    try {
      const q = query(collection(db, 'resumes'), where('userId', '==', user?.id));
      const snapshot = await getDocs(q);
      const resumeList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
        lastModified: doc.data().lastModified?.toDate?.() || new Date(),
      })) as Resume[];
      setResumes(resumeList);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    setDeleting(id);
    try {
      await deleteDoc(doc(db, 'resumes', id));
      setResumes(resumes.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleDuplicate = async (resume: Resume) => {
    const newResume: Resume = {
      ...resume,
      id: generateResumeId(),
      title: `${resume.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastModified: new Date(),
    };
    router.push(`/builder/${newResume.id}?duplicate=${resume.id}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="mt-2 text-gray-600">Manage and create your professional CVs</p>
          </div>
          <Button onClick={() => router.push('/builder/new')} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
                <p className="text-gray-600 mb-6">Create your first resume to get started</p>
                <Button onClick={() => router.push('/builder/new')}>
                  <Plus className="mr-2 h-5 w-5" />
                  Create Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{resume.title}</CardTitle>
                  <CardDescription>
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/builder/${resume.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/preview/${resume.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicate(resume)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                      disabled={deleting === resume.id}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
