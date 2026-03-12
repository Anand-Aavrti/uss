'use client';
import { Suspense, useEffect } from 'react';
import AuthClient from './AuthClient';
import { useAuth } from '@/hooks/useAuthUser';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthPageInner() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect') || '/home';

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirect);
    }
  }, [user, loading, redirect, router]);

  if (loading) return null;
  return <AuthClient />;
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AuthPageInner />
    </Suspense>
  );
}
