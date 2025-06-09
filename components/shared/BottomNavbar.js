'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { mainNavItems } from '@/lib/navigation';

const bottomNavVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 12 },
  },
};

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      variants={bottomNavVariants}
      initial="hidden"
      animate="visible"
      className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl flex justify-around items-center h-16 z-50 px-2"
    >
      {mainNavItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href} className="relative group">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-accent/30'
              }`}
            >
              <item.icon className="w-6 h-6" />

              {/* Optional Label on Active */}
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 4,
                }}
                className="text-xs mt-1 absolute top-full text-center text-foreground pointer-events-none"
              >
               { /*{item.label}*/ }
              </motion.span>
            </motion.div>
          </Link>
        );
      })}
    </motion.nav>
  );
}