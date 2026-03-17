"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (state.role !== "coach" && state.role !== "admin") {
      router.replace("/login");
    }
  }, [state.role, router]);

  if (state.role !== "coach" && state.role !== "admin") return null;
  return <>{children}</>;
}
