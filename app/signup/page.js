'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        {/* FORM SIDE */}
        <div className="flex w-full flex-col p-6 sm:p-8 lg:w-1/2">
          <div className="mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              NearMe
            </span>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-3 rounded mb-4">
              {error.response?.data?.message || 'An error occurred'}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p className="text-sm text-muted-foreground">
                Join NearMe and Find, Connect, Meet, Chats, and Fun!!
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  {...register('fullName', { required: 'Full Name is required' })}
                  placeholder="John Doe"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="text-sm font-medium">Username</label>
                <Input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Must be at least 3 characters' },
                  })}
                  placeholder="johnny"
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
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
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    placeholder="********"
                    className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground opacity-70">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', {
                      required: 'Confirm your password',
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                    placeholder="********"
                    className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register('terms', { required: 'You must agree to the terms' })}
                  className="mt-1 checkbox checkbox-sm"
                />
                <p className="text-xs text-foreground leading-tight">
                  I agree to the{' '}
                  <span className="text-primary hover:underline cursor-pointer">
                    terms of service
                  </span>{' '}
                  and{' '}
                  <span className="text-primary hover:underline cursor-pointer">
                    privacy policy
                  </span>
                </p>
              </div>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating account...' : 'Create Account'}
            </Button>

            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* IMAGE SIDE */}
        <div className="hidden w-full items-center justify-center bg-primary/10 lg:flex lg:w-1/2">
          <div className="max-w-md p-8 text-center">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="logo2.png" 
              alt="Language connection" 
              className="h-full w-full object-contain" />
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="text-sm text-muted-foreground">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}