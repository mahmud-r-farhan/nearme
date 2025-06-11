'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthUser from '@/hooks/useAuthUser';
import PageLoader from '@/components/ui/PageLoader';
import { useAuthStore } from '@/lib/stores/authStore';
import dynamic from 'next/dynamic';

// Dynamically import HomePage with no SSR
const HomePage = dynamic(() => import('@/components/HomePage'), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isLoading, authUser } = useAuthUser();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading) {
      if (!token) {
        router.push('/login');
      } else if (authUser && !authUser.isOnboarded) {
        router.push('/onboarding');
      }
    }
  }, [mounted, isLoading, token, authUser, router]);

  if (!mounted || isLoading) {
    return <PageLoader />;
  }

  if (!token) return null;
  if (authUser && !authUser.isOnboarded) return null;

  return <HomePage />;
}