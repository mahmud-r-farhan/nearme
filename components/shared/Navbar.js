"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { topNavItems } from "@/lib/navigation";

export default function Navbar() {
  return (
    <nav className="bg-muted border-b border-border sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        <div className="p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-7 h-8" />
            <span className="text-2xl font-bold font-mono bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              NearMe
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {topNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="icon" className="relative">
                <item.icon className="h-6 w-6 opacity-70" />
                {item.badge && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}