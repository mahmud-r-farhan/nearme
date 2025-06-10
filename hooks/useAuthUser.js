'use client';

import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '@/lib/api';
import { useAuthStore } from '@/lib/stores/authStore';

const useAuthUser = () => {
  const { user, setUser } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
      }
    },
    onError: () => {
      setUser(null);
    },
  });

  return { isLoading, authUser: user };
};

export default useAuthUser;