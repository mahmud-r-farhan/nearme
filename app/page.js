'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthUser from '@/hooks/useAuthUser';
import HomePage from '@/pages/HomePage';
import PageLoader from '@/components/ui/PageLoader';
import { useAuthStore } from '@/lib/stores/authStore';

export default function Home() {
  const { isLoading, authUser } = useAuthUser();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  {/*
  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/login');
    } else if (authUser && !authUser.isOnboarded) {
      router.push('/onboarding');
    }
  }, [isLoading, token, authUser, router]);

  if (isLoading) return <PageLoader />;
  if (!token) return null;
  if (authUser && !authUser.isOnboarded) return null;
  */}
  return <HomePage />;
}