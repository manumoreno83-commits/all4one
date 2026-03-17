'use client';

import React from 'react';

interface ProCardProps {
  variant?: 'light' | 'dark';
  hoverEffect?: 'lift' | 'scale' | 'none';
  className?: string;
  children: React.ReactNode;
}

export default function ProCard({
  variant = 'light',
  hoverEffect = 'scale',
  className = '',
  children,
}: ProCardProps) {
  const baseStyles = `
    relative
    rounded-none
    border-none
    shadow-none
    transition-all duration-200
    overflow-hidden
  `;

  const variantStyles = {
    light: `
      bg-white
      dark:bg-black
      border-0
    `,
    dark: `
      bg-black
      dark:bg-black
      text-white
    `,
  };

  const hoverStyles = {
    lift: 'hover:-translate-y-1 hover:shadow-lg',
    scale: 'hover:scale-102',
    none: '',
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${hoverStyles[hoverEffect]}
        ${className}
      `}
      style={{
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
}
