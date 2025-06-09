"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-muted border-b border-border sticky top-0 z-30 h-16 flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
           <div className="p-5 border-b border-border">
            <Link href="/" className="flex items-center gap-2.5">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              </motion.div>
              <span className="text-2xl font-bold font-mono bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                NearMe
              </span>
            </Link>
          </div>

        <div className="flex items-center gap-4 ml-auto">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-6 w-6 opacity-70" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="relative">
                <Settings className="w-6 h-6 opacity-70" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}