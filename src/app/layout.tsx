// import React from 'react';
// import type { Metadata, Viewport } from 'next';
// import '../styles/index.css';
// import Header from '@/components/common/Header';
// import Footer from '../components/common/Footer';
// import { LanguageProvider } from '@/components/common/LanguageProvider';
// import '@/app/i18n/client';

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
// };

// export const metadata: Metadata = {
//   title: 'Next.js with Tailwind CSS',
//   description: 'A boilerplate project with Next.js and Tailwind CSS',
//   icons: {
//     icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <LanguageProvider>
//           <Header />
//           <main>{children}</main>
//           <Footer currentLanguage="en" />
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }

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
