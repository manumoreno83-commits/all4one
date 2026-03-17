"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export default function BottomNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C2128] border-t border-gray-200 dark:border-gray-800 z-40 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const active = item.href === "/coach" || item.href === "/athlete"
            ? pathname === item.href || pathname === item.href + "/"
            : pathname.startsWith(item.href);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                active
                  ? "text-[var(--color-brand-orange)]"
                  : "text-gray-400 hover:text-[var(--color-brand-dark-blue)] dark:hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
