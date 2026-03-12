'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsoleLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('mdm_user');

    if (!session) {
      router.replace('/auth?redirect=/apps/mdm/console');
      return;
    }

    try {
      const parsed = JSON.parse(session);

       if (!parsed?.email || !parsed?.tenantId) {
        localStorage.removeItem('mdm_user');
        router.replace('/auth?redirect=/apps/mdm/console');
        return;
      }

      setUser(parsed);
    } catch {
      // Corrupted session
      localStorage.removeItem('mdm_user');
      router.replace('/auth?redirect=/apps/mdm/console');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !user) return null;

  return <>{children}</>;
}
