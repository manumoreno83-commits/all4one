"use client";

import React from "react";

type Variant = "primary" | "secondary" | "accent" | "danger" | "ghost";
type Size = "sm" | "md" | "lg" | "coach";

const base =
  "inline-flex items-center justify-center font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand-dark-blue)] text-white hover:bg-[var(--color-brand-dark-blue-light)]",
  secondary:
    "bg-[var(--color-brand-medium-blue)] text-white hover:bg-[var(--color-brand-medium-blue-light)]",
  accent:
    "bg-[var(--color-brand-orange)] text-white hover:bg-[var(--color-brand-orange-light)]",
  danger:
    "bg-[var(--color-brand-red)] text-white hover:bg-[var(--color-brand-red-light)]",
  ghost:
    "bg-transparent text-[var(--color-brand-dark-blue)] hover:bg-black/5 dark:text-white dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-base gap-2",
  lg: "h-14 px-7 text-lg gap-2.5",
  coach: "h-16 px-8 text-xl gap-3 min-w-[200px]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  loading,
  fullWidth,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
