'use client';

import React from 'react';

interface NikeBadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export default function NikeBadge({
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: NikeBadgeProps) {
  const variantStyles = {
    primary: 'bg-gray-500 text-white',
    secondary: 'bg-black text-white dark:bg-white dark:text-black',
    success: 'bg-gray-400 text-white',
    warning: 'bg-gray-400 text-black',
    error: 'bg-red-400 text-white',
    info: 'bg-gray-300 text-white',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-bold uppercase tracking-wide
        rounded-full
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
