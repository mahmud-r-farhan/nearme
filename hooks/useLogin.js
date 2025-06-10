'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { useAuthStore } from '@/lib/stores/authStore';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      router.push(data.user.isOnboarded ? '/' : '/onboarding');
    },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;