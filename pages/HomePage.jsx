"use client";

import { motion } from "framer-motion";
import { Sparkles, LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomeClient() {
  const pathname = usePathname();

  return (
    
    <div className="text-center flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white p-10">
    < LoaderCircle className="animate-spin text-black " size={16} />
    </div>
  );
}
