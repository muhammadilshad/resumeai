import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/components/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ResumeAI - Professional CV in 5 Minutes',
  description: 'Create ATS-friendly professional resumes with AI assistance. Perfect for students, graduates, and job seekers.',
  keywords: 'resume, cv, job, application, ai, professional',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
