# ResumeAI Setup Guide

## Complete Setup Instructions

This guide walks you through setting up ResumeAI from scratch.

## Step 1: Firebase Project Setup

### 1.1 Create Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `ResumeAI`
4. Disable Google Analytics (optional)
5. Click **"Create project"** and wait for completion

### 1.2 Enable Authentication
1. In left sidebar, click **Authentication**
2. Click **"Get started"**
3. Select **Email/Password** provider
4. Toggle **Enable** switch
5. Click **Save**

### 1.3 Create Firestore Database
1. In left sidebar, click **Firestore Database**
2. Click **"Create database"**
3. Select **Production mode**
4. Choose region closest to your users
5. Click **"Create"**

### 1.4 Set Security Rules
1. In Firestore, go to **Rules** tab
2. Replace all content with:

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

3. Click **Publish**

### 1.5 Get Firebase Credentials
1. Click **Project Settings** (gear icon, top-left)
2. Go to **General** tab
3. Scroll to **Your apps** section
4. Click **Web** icon (or create if not exists)
5. Copy the config object
6. Save for next step

## Step 2: Local Setup

### 2.1 Clone Repository
```bash
git clone <your-repo-url>
cd resumeai
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Configure Environment Variables
1. Create `.env.local` file in project root
2. Copy from `.env.example`:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` and add your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2.4 Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 3: Test the Application

### 3.1 Test Landing Page
- [ ] Hero section loads
- [ ] "Create My CV" button works
- [ ] Navigation links work
- [ ] Footer displays

### 3.2 Test Authentication
- [ ] Sign up with email/password
- [ ] Verify user created in Firebase
- [ ] Login with credentials
- [ ] Logout works

### 3.3 Test Dashboard
- [ ] Dashboard loads after login
- [ ] "Create New Resume" button works
- [ ] Empty state displays correctly

### 3.4 Test Resume Builder
- [ ] All tabs load (Personal, Summary, Experience, Education, Skills)
- [ ] Form inputs work
- [ ] Add/remove buttons work
- [ ] Save button works
- [ ] Data persists after refresh

### 3.5 Test Preview & PDF
- [ ] Preview page loads
- [ ] Template selector works
- [ ] All 5 templates display correctly
- [ ] PDF download works

## Step 4: Optional - Add AI Integration

### For OpenAI:
```bash
npm install openai
```

Add to `.env.local`:
```
OPENAI_API_KEY=sk-your-key-here
```

Update `/app/api/ai/improve/route.ts`:
```typescript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Add your implementation
```

### For Claude (Anthropic):
```bash
npm install @anthropic-ai/sdk
```

Add to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Step 5: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables from `.env.local`
6. Click **"Deploy"**

### Option B: Deploy to Other Platforms

**AWS Amplify:**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

## Troubleshooting

### Issue: "Firebase config is invalid"
**Solution:** 
- Verify all keys in `.env.local` are correct
- Check Firebase Console for correct values
- Restart dev server after changing `.env.local`

### Issue: "Cannot read property 'uid' of null"
**Solution:**
- User not authenticated
- Check Firebase Authentication is enabled
- Clear browser cache and try again

### Issue: "Firestore permission denied"
**Solution:**
- Check Firestore Security Rules
- Verify user is logged in
- Check browser console for exact error

### Issue: "PDF export fails"
**Solution:**
- Check browser console for errors
- Ensure html2canvas and jsPDF are installed
- Try in Chrome/Firefox (not Safari)

## File Structure Checklist

Verify these files exist:

```
✓ app/
  ✓ (auth)/login/page.tsx
  ✓ (auth)/signup/page.tsx
  ✓ api/ai/improve/route.ts
  ✓ builder/[resumeId]/page.tsx
  ✓ dashboard/page.tsx
  ✓ preview/[resumeId]/page.tsx
  ✓ pricing/page.tsx
  ✓ settings/page.tsx
  ✓ layout.tsx
  ✓ page.tsx
  ✓ globals.css

✓ components/
  ✓ ui/button.tsx
  ✓ ui/input.tsx
  ✓ ui/textarea.tsx
  ✓ ui/card.tsx
  ✓ ui/tabs.tsx
  ✓ layout/header.tsx
  ✓ layout/footer.tsx
  ✓ providers/auth-provider.tsx
  ✓ resume/templates/modern.tsx
  ✓ resume/templates/classic.tsx
  ✓ resume/templates/minimal.tsx
  ✓ resume/templates/ats.tsx
  ✓ resume/templates/gulf.tsx

✓ lib/
  ✓ firebase/config.ts
  ✓ store/index.ts
  ✓ types/index.ts
  ✓ utils/helpers.ts
  ✓ utils/cn.ts

✓ .env.example
✓ package.json
✓ tailwind.config.ts
✓ tsconfig.json
✓ README.md
```

## Next Steps

1. **Customize branding** - Update colors, fonts, logo
2. **Add payment integration** - JazzCash, Easypaisa, Stripe
3. **Implement AI** - OpenAI or Claude API
4. **Add analytics** - Google Analytics or Mixpanel
5. **Set up email** - SendGrid or Mailgun for notifications
6. **Create admin panel** - Manage users and payments

## Support

- Check README.md for detailed documentation
- Review Firebase docs: https://firebase.google.com/docs
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs

---

**Happy building! 🚀**
