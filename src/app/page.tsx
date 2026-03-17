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
        background: "linear-gradient(135deg, #1A2A42, #223754, #496D91)",
      }}
    >
      <Image
        src="/logo.png"
        alt="ALL4ONE Funcional Fitness Club"
        width={200}
        height={200}
        className="drop-shadow-2xl"
        priority
      />
      <div className="mt-8 w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
