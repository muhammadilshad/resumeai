'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/store';
import { Resume } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Edit, Loader, ArrowLeft } from 'lucide-react';
import { ModernTemplate } from '@/components/resume/templates/modern';
import { ClassicTemplate } from '@/components/resume/templates/classic';
import { MinimalTemplate } from '@/components/resume/templates/minimal';
import { ATSTemplate } from '@/components/resume/templates/ats';
import { GulfTemplate } from '@/components/resume/templates/gulf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PreviewPage({ params }: { params: { resumeId: string } }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && params.resumeId) {
      loadResume();
    }
  }, [user, authLoading, params.resumeId, router]);

  const loadResume = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'resumes', params.resumeId));
      if (docSnap.exists()) {
        setResume(docSnap.data() as Resume);
        setSelectedTemplate(docSnap.data().template || 'modern');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById('resume-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save(`${resume?.personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setDownloading(false);
    }
  };

  const renderTemplate = () => {
    if (!resume) return null;

    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      case 'ats':
        return <ATSTemplate resume={resume} />;
      case 'gulf':
        return <GulfTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!resume) {
    return <div>Resume not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Preview</h1>
              <p className="mt-2 text-gray-600">{resume.title}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push(`/builder/${resume.id}`)}>
              <Edit className="mr-2 h-5 w-5" />
              Edit
            </Button>
            <Button onClick={handleDownloadPDF} disabled={downloading}>
              <Download className="mr-2 h-5 w-5" />
              {downloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Select Template</h3>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {['modern', 'classic', 'minimal', 'ats', 'gulf'].map((template) => (
              <button
                key={template}
                onClick={() => setSelectedTemplate(template)}
                className={`rounded-lg border-2 p-3 text-center transition-all ${
                  selectedTemplate === template
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium text-gray-900 capitalize">{template}</div>
              </button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div id="resume-content" className="bg-white">
              {renderTemplate()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
