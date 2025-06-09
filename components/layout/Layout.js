'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../shared/Sidebar';
import Navbar from '../shared/Navbar';
import BottomNavbar from '../shared/BottomNavbar';

export default function Layout({ children, showSidebar = true }) {
  const pathname = usePathname();
  const hideSidebarRoutes = ['/login', '/signup', '/onboarding', '/chat/'];

  const shouldShowSidebar = showSidebar && !hideSidebarRoutes.some((route) => pathname.startsWith(route));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {shouldShowSidebar && <Sidebar />}
        <main className="flex-1 overflow-y-auto lg:ml-0">{children}</main>
      </div>
      <BottomNavbar />
    </div>
  );
}