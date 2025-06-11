import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Near-me',
    template: '%s | Near-me',
  },
  description: 'Near me - a social platform for connect, chats, calls, posts, meet and events',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={geistSans.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}