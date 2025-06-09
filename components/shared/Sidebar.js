"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UsersIcon, CalendarSearch, Rss, Settings } from "lucide-react";
import { motion } from "framer-motion";

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
};

const NavItem = ({ href, icon, active, label }) => (
  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </motion.div>
);

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 bg-muted border-r border-border hidden lg:flex flex-col h-screen sticky top-0"
    >
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          </motion.div>
          <span className="text-2xl font-bold font-mono bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Nearme
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem href="/" icon={<HomeIcon className="w-5 h-5" />} active={pathname === "/"} label="Home" />
        <NavItem href="/friends" icon={<UsersIcon className="w-5 h-5" />} active={pathname === "/friends"} label="Friends" />
        <NavItem href="/events" icon={<CalendarSearch className="w-5 h-5" />} active={pathname === "/events"} label="Events" />
        <NavItem href="/posts" icon={<Rss className="w-5 h-5" />} active={pathname === "/posts"} label="Posts" />
        <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} active={pathname === "/settings"} label="Settings" />
      </nav>

      <motion.div
        className="p-4 border-t border-border mt-auto"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <div className="avatar w-10 h-10 rounded-full overflow-hidden bg-gray-200" />
          <div>
            <p className="font-semibold text-sm">Mahmud</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success inline-block" /> Online
            </p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}