"use client";

import { usePathname } from "next/navigation";
import Posts from "@/components/Posts";

export default function Home() {
  const pathname = usePathname();

  return (
    <Posts />
  );

}
