"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!state.role) {
      router.replace("/login");
    }
  }, [state.role, router]);

  if (!state.role) return null;
  return <>{children}</>;
}
