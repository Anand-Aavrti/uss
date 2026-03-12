 

import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { LanguageProvider } from '@/components/common/LanguageProvider';
import '@/app/i18n/client';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'USS',
  description: 'Mission control for global systems',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
