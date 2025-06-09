'use client';

import { useAuthUser } from '@/hooks/useAuthUser';
import { useRouter } from 'next/navigation';
import HomePage from '@/pages/HomePage';
import PageLoader from '@/components/lib/PageLoader';

export default function Home() {
  const { isLoading, authUser } = useAuthUser();
  const router = useRouter();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (!isOnboarded) {
    router.push('/onboarding');
    return null;
  }

  return <HomePage />;
}