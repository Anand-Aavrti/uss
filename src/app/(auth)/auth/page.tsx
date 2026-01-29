import { Suspense } from 'react';
import AuthClient from './AuthClient';

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AuthClient />
    </Suspense>
  );
}
 
