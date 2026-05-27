'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <span className="font-bold text-gray-900">ResumeAI</span>
            </div>
            <p className="text-sm text-gray-600">Professional CV in 5 Minutes</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © 2026 ResumeAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
