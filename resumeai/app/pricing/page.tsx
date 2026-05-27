'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleUpgrade = () => {
    if (!user) {
      router.push('/signup');
    } else {
      router.push('/settings');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Simple, Transparent Pricing</h1>
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
                <span className="text-4xl font-bold text-gray-900">Free</span>
              </div>
              <ul className="space-y-3">
                {[
                  '2 Professional Templates',
                  'Basic PDF Export',
                  'Watermark included',
                  'Email Support',
                  'Unlimited Resumes',
                  'Auto-save Drafts',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" onClick={() => router.push('/signup')}>
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-blue-600 border-2 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For serious job seekers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold text-gray-900">Rs. 499</span>
                <span className="text-sm text-gray-600 ml-2">one-time payment</span>
              </div>
              <ul className="space-y-3">
                {[
                  'All 5 Professional Templates',
                  'No Watermark',
                  'AI Text Rewriting',
                  'Cover Letter Generator',
                  'LinkedIn Headline Generator',
                  'Priority Email Support',
                  'Unlimited Resumes',
                  'Advanced Analytics',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={handleUpgrade}>
                <Zap className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
          <p className="text-gray-600 mb-4">We support multiple payment methods for your convenience:</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">JazzCash</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Easypaisa</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Bank Transfer</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">WhatsApp Payment</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-6">
            After payment, contact us via WhatsApp or email to activate your premium account.
          </p>
        </div>
      </div>
    </div>
  );
}
