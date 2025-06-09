"use client";

import { motion } from "framer-motion";
import { Sparkles, LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomeClient() {
  const pathname = usePathname();

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center gap-8 p-10 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl font-bold flex items-center gap-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Sparkles className="text-yellow-300" />
        This route is under development!
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl max-w-xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        We’re building this page using{" "}
        <strong>ShadCN UI</strong>, <strong>Framer Motion</strong>,{" "}
        <strong>Tailwind CSS</strong>, and <strong>Lucide Icons</strong>.
      </motion.p>

      <motion.div
        className="flex items-center gap-2 text-sm bg-white/10 p-3 rounded-lg backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <LoaderCircle className="animate-spin text-white" size={16} />
        Current route: <code className="font-mono">{pathname}</code>
      </motion.div>
    </motion.div>
  );
}
