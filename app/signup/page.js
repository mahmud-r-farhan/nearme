'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ShipWheelIcon } from 'lucide-react';
import Link from 'next/link';
import useSignUp from '@/hooks/useSignUp';
import useAuthUser from '@/hooks/useAuthUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLoader from '@/components/ui/PageLoader';

export default function SignupPage() {
  const { isPending, error, signupMutation } = useSignUp();
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
      fullName: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  if (isLoading) return <PageLoader />;

  if (isAuthenticated) {
    router.replace(isOnboarded ? '/' : '/onboarding');
    return null;
  }

  const onSubmit = async (data) => {
    try {
      await signupMutation({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      toast.success('Account created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-primary/25 bg-base-100 shadow-lg lg:flex-row">
        {/* SIGNUP FORM */}
        <div className="flex w-full flex-col p-6 sm:p-8 lg:w-1/2">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <ShipWheelIcon className="h-9 w-9 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Nearme
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert-error mb-4">
              <span>{error.response?.data?.message || 'An error occurred'}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className="text-sm text-muted-foreground">
                  Join Nearmeand start your language learning adventure!
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <Input
                    {...register('fullName', { required: 'Full Name is required' })}
                    placeholder="John Doe"
                    variant={errors.fullName ? 'error' : 'default'}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-error">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="john@example.com"
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
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    placeholder="********"
                    variant={errors.password ? 'error' : 'default'}
                  />
                  {errors.password ? (
                    <p className="mt-1 text-xs text-error">{errors.password.message}</p>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground opacity-70">
                      Password must be at least 6 characters long
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="form-control">
                  <label className="label flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      {...register('terms', { required: 'You must agree to the terms' })}
                    />
                    <span className="text-xs leading-tight text-foreground">
                      I agree to the{' '}
                      <span className="text-primary hover:underline">terms of service</span> and{' '}
                      <span className="text-primary hover:underline">privacy policy</span>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-xs text-error">{errors.terms.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="hidden w-full items-center justify-center bg-primary/10 lg:flex lg:w-1/2">
          <div className="max-w-md p-8 text-center">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection" className="h-full w-full" />
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
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