'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavItems } from '@/lib/navigation';
import useAuthUser from '@/hooks/useAuthUser';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Image from 'next/image';

const navItemVariants = cva(
  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full',
  {
    variants: {
      active: {
        true: 'bg-white/10 backdrop-blur-md shadow-lg border border-white/10 text-white',
        false: 'text-muted-foreground hover:bg-white/5 hover:text-white',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const NavItem = ({ href, icon: Icon, active, label }) => (
  <Link
    href={href}
    className={twMerge(clsx(navItemVariants({ active })))}
    aria-current={active ? 'page' : undefined}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className="truncate">{label}</span>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { authUser, isLoading } = useAuthUser();

  return (
    <aside className="fixed top-0 left-0 w-64 h-[100dvh] bg-gradient-to-b from-base-100/60 to-base-100/30 backdrop-blur-xl border-r border-white/10 shadow-xl hidden lg:flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 mt-14 overflow-y-auto px-4 py-6 space-y-2">
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

      {/* User Section */}
      <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
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
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-success ring-offset-2 relative">
                <Image
                  src={authUser.profilePic || 'https://avatars.githubusercontent.com/u/114731414?v=4'}
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-sm text-white truncate">
                {authUser.fullName || 'User Name'}
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
              <p className="font-semibold text-sm text-white">Guest</p>
              <p className="text-xs text-muted-foreground">Please log in</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}