# ResumeAI - Professional CV in 5 Minutes

A modern, production-ready web application that helps users create professional, ATS-friendly resumes with AI assistance. Built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## 🎯 Features

- **5 Professional Templates**: Modern, Classic, Minimal, ATS-optimized, and Gulf-style designs
- **AI-Powered Text Improvement**: Enhance your resume content with AI suggestions
- **ATS-Friendly**: Optimized to pass applicant tracking systems
- **Mobile-First Design**: Fully responsive and mobile-optimized
- **Real-time Preview**: See your resume as you build it
- **PDF Export**: Download your resume instantly
- **User Authentication**: Secure Firebase authentication
- **Cloud Storage**: All resumes saved to Firebase
- **Free & Premium Plans**: Flexible pricing with optional premium features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account (free tier works)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd resumeai
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Firebase Setup

### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name (e.g., "ResumeAI")
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Enable **Email/Password** provider
4. Save changes

### Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **Production mode**
4. Choose your region (closest to your users)
5. Click **Create**

### Set Firestore Rules

Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /resumes/{resumeId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Get Firebase Credentials

1. Go to **Project Settings** (gear icon)
2. Click **Service Accounts**
3. Click **Generate New Private Key** (for backend use only)
4. Copy the config from the **Web** section
5. Paste into `.env.local`

## 📁 Project Structure

```
resumeai/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── api/                 # API routes
│   │   └── ai/improve/      # AI text improvement endpoint
│   ├── builder/             # Resume builder
│   ├── dashboard/           # User dashboard
│   ├── preview/             # Resume preview & PDF export
│   ├── pricing/             # Pricing page
│   ├── settings/            # User settings
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── providers/           # Context providers
│   └── resume/
│       └── templates/       # Resume templates
├── lib/
│   ├── firebase/            # Firebase configuration
│   ├── store/               # Zustand stores
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── package.json
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Templates

### Modern
- Clean, professional design with blue accents
- Colored section headers with left border
- Skill badges with background color
- Best for: Tech, creative, modern roles

### Classic
- Traditional serif font design
- Centered header with horizontal line
- Uppercase section titles
- Best for: Corporate, formal positions

### Minimal
- Minimalist design with clean typography
- Simple section headers
- Compact layout
- Best for: Startups, tech companies

### ATS (Applicant Tracking System)
- Plain text, no graphics
- Standard fonts and formatting
- Optimized for parsing
- Best for: Large corporations, government jobs

### Gulf
- Professional with blue gradient header
- Colored section headers with bottom border
- Skill badges
- Best for: Middle East job market

## 🤖 AI Text Improvement

The app includes an AI improvement endpoint at `/api/ai/improve`.

### Current Status
- Mock responses are enabled by default
- Ready for OpenAI or Claude API integration

### To Enable Real AI

1. **For OpenAI:**
```bash
npm install openai
```

Add to `.env.local`:
```
OPENAI_API_KEY=sk-...
```

2. **For Claude (Anthropic):**
```bash
npm install @anthropic-ai/sdk
```

Add to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

3. Update `/app/api/ai/improve/route.ts` with your API calls

## 💳 Payment Integration

Currently, payment is handled manually. To add payment processing:

### For JazzCash/Easypaisa (Pakistan)
- Integrate with their API
- Update `/app/api/payments/` routes
- Store payment records in Firestore

### For Stripe
```bash
npm install stripe @stripe/stripe-js
```

### For PayPal
```bash
npm install @paypal/checkout-server-sdk
```

Update the pricing page and add payment routes accordingly.

## 📊 Database Schema

### Users Collection
```typescript
{
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: 'free' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}
```

### Resumes Collection
```typescript
{
  id: string;
  userId: string;
  title: string;
  template: 'modern' | 'classic' | 'minimal' | 'ats' | 'gulf';
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: References;
  createdAt: Date;
  updatedAt: Date;
  lastModified: Date;
}
```

## 🔐 Security

- All user data is encrypted in transit (HTTPS)
- Firebase Security Rules enforce user-level access control
- No sensitive data stored in localStorage
- Environment variables for API keys
- Input validation on all forms

## 📱 Responsive Design

- Mobile-first approach
- Tested on iOS and Android
- Tablet-optimized layouts
- Desktop-enhanced features

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

### Deploy to Other Platforms

The app can be deployed to any Node.js hosting:
- AWS Amplify
- Netlify
- Railway
- Render
- DigitalOcean

## 📈 Performance

- Next.js App Router for optimal performance
- Image optimization
- Code splitting
- CSS-in-JS with Tailwind
- Lazy loading for templates

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify API keys in `.env.local`
- Check Firebase Security Rules
- Ensure Firestore database is created

### PDF Export Not Working
- Check browser console for errors
- Ensure html2canvas and jsPDF are installed
- Try in a different browser

### AI Improvement Returns Mock Data
- API key not configured
- Add OPENAI_API_KEY or ANTHROPIC_API_KEY to `.env.local`

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@resumeai.com
- WhatsApp: [Add your number]

## 🎯 Roadmap

- [ ] Real payment integration (JazzCash, Easypaisa, Stripe)
- [ ] Cover letter generator
- [ ] LinkedIn headline generator
- [ ] Resume completeness score
- [ ] Job application tracker
- [ ] Resume analytics
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend by [Firebase](https://firebase.google.com)
- PDF generation with [jsPDF](https://github.com/parallax/jsPDF)
- State management with [Zustand](https://github.com/pmndrs/zustand)

---

**Made with ❤️ for job seekers everywhere**
