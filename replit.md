# USS - Global Infrastructure

## Overview
A Next.js 15 application with Firebase authentication, Tailwind CSS styling, and internationalization support.

## Tech Stack
- **Framework**: Next.js 15.1.11 with TypeScript
- **Styling**: Tailwind CSS 3.4.6
- **Authentication**: Firebase Auth (requires configuration)
- **Internationalization**: i18next with react-i18next
- **Charts**: Recharts

## Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Authentication routes
│   ├── (public)/     # Public routes (home, products, etc.)
│   └── i18n/         # Internationalization config
├── components/       # React components
│   ├── common/       # Shared components (Header, etc.)
│   └── ui/           # UI components
├── hooks/            # Custom React hooks
├── lib/              # Library configurations (Firebase)
└── styles/           # Global styles
```

## Setup Requirements

### Firebase Configuration
This app requires Firebase credentials. Set the following environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Development
- Dev server runs on port 5000
- Command: `npm run dev`

## Deployment
- Build: `npm run build`
- Production: `npm run serve`
