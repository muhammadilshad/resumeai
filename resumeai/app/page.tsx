'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, FileText, Download, Sparkles, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Professional CV in <span className="text-blue-600">5 Minutes</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Create ATS-friendly resumes with AI assistance. Perfect for students, graduates, and job seekers across Pakistan and beyond.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" onClick={handleGetStarted}>
                  Create My CV
                </Button>
                <Button size="lg" variant="outline" onClick={() => router.push('/#how-it-works')}>
                  Learn More
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-500">No credit card required • Free to start</p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Your professional resume preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to your perfect resume</p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: 1, title: 'Enter Info', description: 'Fill in your details in simple forms' },
              { step: 2, title: 'Choose Template', description: 'Pick from 5 professional designs' },
              { step: 3, title: 'AI Polish', description: 'Improve text with AI assistance' },
              { step: 4, title: 'Download', description: 'Get your PDF instantly' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose ResumeAI?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: 'Lightning Fast', description: 'Create your resume in minutes, not hours' },
              { icon: CheckCircle, title: 'ATS-Friendly', description: 'Optimized to pass applicant tracking systems' },
              { icon: Sparkles, title: 'AI Powered', description: 'Get professional writing suggestions' },
              { icon: Download, title: 'Easy Download', description: 'Export as PDF with one click' },
              { icon: FileText, title: 'Multiple Templates', description: '5 professional designs to choose from' },
              { icon: Users, title: 'For Everyone', description: 'Perfect for students, graduates, and professionals' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Icon className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Simple Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">Choose the plan that works for you</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">Free</span>
                </div>
                <ul className="space-y-3">
                  {['2 Templates', 'Basic PDF Export', 'Watermark included', 'Email support'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-blue-600 border-2">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For serious job seekers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">Rs. 499</span>
                  <span className="text-sm text-gray-600 ml-2">one-time</span>
                </div>
                <ul className="space-y-3">
                  {['All 5 Templates', 'No Watermark', 'AI Rewriting', 'Cover Letter', 'Priority Support'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={handleGetStarted}>
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: 'Is my data secure?', a: 'Yes, we use Firebase with enterprise-grade security. Your data is encrypted and never shared.' },
              { q: 'Can I edit my resume later?', a: 'Absolutely! You can edit, duplicate, and manage all your resumes from your dashboard.' },
              { q: 'What makes a resume ATS-friendly?', a: 'Our templates avoid graphics, use standard fonts, and follow ATS best practices to ensure your resume passes screening.' },
              { q: 'Can I use the free version forever?', a: 'Yes! The free version is always available. Premium is optional for advanced features.' },
              { q: 'How does AI rewriting work?', a: 'Our AI improves your text professionally without inventing fake experience. It enhances wording and clarity.' },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-blue-600">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to create your professional CV?</h2>
          <p className="mt-4 text-lg text-blue-100">Join thousands of job seekers who've already created their resumes with ResumeAI.</p>
          <Button size="lg" variant="outline" className="mt-8 bg-white text-blue-600 hover:bg-gray-100" onClick={handleGetStarted}>
            Create My CV Now
          </Button>
        </div>
      </section>
    </div>
  );
}
