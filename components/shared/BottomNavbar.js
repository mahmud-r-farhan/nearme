"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { mainNavItems } from "@/lib/navigation";

const bottomNavVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      variants={bottomNavVariants}
      initial="hidden"
      animate="visible"
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-muted border-t border-border flex justify-around items-center h-16 z-50"
    >
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center justify-center p-2"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <item.icon className="w-6 h-6" />
          </motion.div>
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </motion.nav>
  );
}