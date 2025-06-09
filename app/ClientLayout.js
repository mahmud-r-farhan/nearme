'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Layout from '@/components/layout/Layout';

export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="forest" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Layout showSidebar={true}>{children}</Layout>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}