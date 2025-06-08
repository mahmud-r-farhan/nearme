"use client";

import { usePathname } from "next/navigation";
import Form from "@/components/Form";

export default function Home() {
  const pathname = usePathname();

  return (
    <Form />
  );

}
