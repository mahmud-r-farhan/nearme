'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

import useLogin from '@/hooks/useLogin';
import useAuthUser from '@/hooks/useAuthUser';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageLoader from '@/components/ui/PageLoader';

export default function LoginPage() {
  const { isPending, error, loginMutation } = useLogin();
  const { isLoading, authUser } = useAuthUser();
  const router = useRouter();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  const [showPassword, setShowPassword] = useState(false);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen items-center justify-center bg-muted p-4"
    >
      <Card className="w-full max-w-3xl flex flex-col lg:flex-row overflow-hidden shadow-xl border-none">
        {/* Form Side */}
        <div className="w-full lg:w-2/2 p-6 sm:p-8 flex flex-col justify-center">
          <CardHeader className="flex flex-row items-center gap-2 mb-6 p-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NearMe
            </h1>
          </CardHeader>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error.response?.data?.message || 'An error occurred'}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue your language journey
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                placeholder="hello@example.com"
                className={errors.email && 'border-destructive'}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

           {/* Password */}
            <div className="space-y-2">
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
                  placeholder="*********"
                  className={errors.password ? 'pr-10 border-destructive' : 'pr-10'}
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
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>


            <motion.div whileTap={{ scale: 0.97 }}>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign In'}
              </Button>
            </motion.div>

            <p className="text-sm text-center">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* Right Illustration Side */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary/10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Join NearMe!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              NearMe connects you with native speakers to practice languages in real-time.
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}