"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: string;
  padding?: "sm" | "md" | "lg";
}

const paddings = { sm: "p-3", md: "p-4", lg: "p-6" };

export default function Card({
  children,
  className = "",
  onClick,
  gradient,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-sm ${paddings[padding]} ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}`}
      style={gradient ? { background: gradient } : undefined}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
}

// Block card with colored left border
export function BlockCard({
  color,
  children,
  className = "",
  style,
  ...rest
}: {
  color: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "color">) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-[#1C2128] shadow-sm p-4 border-l-4 ${className}`}
      style={{ borderLeftColor: color, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

// Stat card for dashboards
export function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}) {
  return (
    <div className="bg-white dark:bg-[#1C2128] rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {color && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
          />
        )}
      </div>
      <p className="text-2xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
        {value}
      </p>
      <p className="text-sm text-[var(--color-brand-medium-blue)] dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}
