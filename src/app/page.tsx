"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loadState } from "@/lib/store";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const s = loadState();
    if (s.role === "coach" || s.role === "admin") {
      router.replace("/coach");
    } else if (s.role === "athlete") {
      router.replace("/athlete");
    } else {
      router.replace("/login");
    }
  }, [router]);

  // Splash screen while redirecting
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #F5F5F5, #FFFFFF)",
      }}
    >
      <Image
        src="/logo-nano-banana.svg"
        alt="Pro Training Platform"
        width={200}
        height={200}
        className="drop-shadow-2xl"
        priority
      />
      <div className="mt-8 w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
