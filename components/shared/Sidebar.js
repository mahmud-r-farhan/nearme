"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { mainNavItems } from "@/lib/navigation";

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
};

const NavItem = ({ href, icon: Icon, active, label }) => (
  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
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
      className="w-64 h-[100vh] bg-muted border-r border-border hidden lg:flex flex-col fixed top-0"
    >
      <nav className="flex-1 p-4 mt-20 space-y-2">
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

      <motion.div
        className="p-4 border-t border-border mt-auto"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <div className="avatar w-10 h-10 rounded-full overflow-hidden bg-gray-200" />
          <div>
            <p className="font-semibold text-sm">User Name</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success inline-block" /> Online
            </p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}