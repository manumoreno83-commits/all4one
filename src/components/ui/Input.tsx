"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--color-brand-dark-blue)] dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-medium-blue)]">
            {icon}
          </span>
        )}
        <input
          className={`w-full h-12 ${icon ? "pl-10" : "pl-4"} pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128] text-[var(--color-brand-dark-blue)] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)] transition ${error ? "border-[var(--color-brand-red)]" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-[var(--color-brand-red)]">{error}</p>
      )}
    </div>
  );
}

export function SearchInput(props: Omit<InputProps, "icon">) {
  return (
    <Input
      icon={<span className="text-lg">&#128269;</span>}
      placeholder="Buscar..."
      {...props}
    />
  );
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 999,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--color-brand-dark-blue)] dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold text-lg active:scale-95"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          -
        </button>
        <span className="w-12 text-center font-semibold text-lg">{value}</span>
        <button
          type="button"
          className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold text-lg active:scale-95"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}
