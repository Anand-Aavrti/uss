'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/Header';

export default function Layout({ children }) {
  const pathname = usePathname();

  // hide header on docs pages
  const hideHeader = pathname.startsWith('/apps/mdm/docs');

  return (
    <>
      {!hideHeader && <Header />}
      <main className="mdm-app-shell">{children}</main>
    </>
  );
}
