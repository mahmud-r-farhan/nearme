'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ShipWheelIcon } from 'lucide-react';
import Link from 'next/link';
import useLogin from '@/hooks/useLogin';
import useAuthUser from '@/hooks/useAuthUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLoader from '@/components/ui/PageLoader';

export default function LoginPage() {
  const { isPending, error, loginMutation } = useLogin();
  const { isLoading, authUser } = useAuthUser();
  const router = useRouter();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (isLoading) return <PageLoader />;

  if (isAuthenticated) {
    router.replace(isOnboarded ? '/' : '/onboarding');
    return null;
  }

  const onSubmit = async (data) => {
    try {
      await loginMutation(data);
      toast.success('Signed in successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-primary/25 bg-base-100 shadow-lg lg:flex-row">
        {/* LOGIN FORM */}
        <div className="flex w-full flex-col p-6 sm:p-8 lg:w-1/2">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <ShipWheelIcon className="h-9 w-9 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Streamify
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="alert-error mb-4">
              <span>{error.response?.data?.message || 'An error occurred'}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm text-muted">
                Sign in to your account to continue your language journey
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                  placeholder="hello@example.com"
                  variant={errors.email ? 'error' : 'default'}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <Input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  placeholder="••••••••"
                  variant={errors.password ? 'error' : 'default'}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-error">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm">
                  Don’t have an account?{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Illustration */}
        <div className="hidden items-center w-full justify-center bg-primary/10 lg:flex lg:w-1/2">
          <div className="max-w-md p-8 text-center">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection" className="h-full w-full" />
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-sm text-muted">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}