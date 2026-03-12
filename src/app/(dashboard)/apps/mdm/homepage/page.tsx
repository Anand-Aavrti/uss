'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/hooks/useAuthUser';
import HomepageInteractive from './components/HomepageInteractive';

export default function MDMHomepage() {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    // Authenticated users skip the info page and go straight to enroll
    if (!loading && user) {
      router.replace('/products-overview/enroll/uss-mdm');
    }
  }, [user, loading, router]);

  // Still render the page while auth is loading so unauthenticated users
  // don't see a blank flash
  return (
    <main className="min-h-screen">
      <HomepageInteractive />
    </main>
  );
}
