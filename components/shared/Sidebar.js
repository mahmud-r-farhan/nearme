'use client';

import Link from 'next/link';
import Traditions from 'lucide-react';
import { usePathname } from 'next/navigation';
import { mainNavItems } from '@/lib/navigation';
import useAuthUser from '@/hooks/useAuthUser';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { ShipWheelIcon } from 'lucide-react';

const navItemVariants = cva(
  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full',
  {
    variants: {
      active: {
        true: 'bg-primary text-primary-foreground',
        false: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const NavItem = ({ href, icon: Icon, active, label }) => (
  <div>
    <Link href={href} className={twMerge(clsx(navItemVariants({ active })))}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { authUser, isLoading } = useAuthUser();

  return (
    <aside className="fixed top-0 w-64 h-screen bg-base-200 border-r border-base-300 hidden lg:flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <ShipWheelIcon className="w-9 h-9 text-primary" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            NearMe
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            active={pathname === item.href}
            label={item.label}
          />
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-base-300 mt-auto">
        {isLoading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
              <div className="h-3 w-1/2 bg-gray-300 rounded" />
            </div>
          </div>
        ) : authUser ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={authUser?.profilePic || '/placeholder-avatar.png'}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">
                {authUser?.fullName || 'User Name'}
              </p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="avatar w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">Guest</p>
              <p className="text-xs text-muted-foreground">Please log in</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}