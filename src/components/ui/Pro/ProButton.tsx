'use client';

import React from 'react';
import { proColors } from '@/styles/pro-design-system';

interface ProButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function ProButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  className = '',
  disabled,
  children,
  ...props
}: ProButtonProps) {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-bold tracking-wide uppercase
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
  `;

  // Variant styles
  const variantStyles = {
    primary: `
      bg-gray-500 text-white
      hover:bg-gray-500 hover:scale-102
      active:scale-98
      focus:ring-2 focus:ring-pink-600 focus:ring-offset-2
      dark:focus:ring-offset-black
    `,
    secondary: `
      bg-black text-white
      hover:bg-gray-900 hover:scale-102
      active:scale-98
      focus:ring-2 focus:ring-gray-600 focus:ring-offset-2
      dark:bg-white dark:text-black
      dark:hover:bg-gray-100
      dark:focus:ring-offset-black
    `,
    tertiary: `
      bg-transparent text-black
      border-2 border-black
      hover:bg-black hover:text-white hover:scale-102
      active:scale-98
      dark:text-white dark:border-white
      dark:hover:bg-white dark:hover:text-black
    `,
  };

  // Size styles
  const sizeStyles = {
    sm: `
      px-4 py-2
      text-sm
      rounded-md
    `,
    md: `
      px-6 py-3
      text-base
      rounded-md
    `,
    lg: `
      px-8 py-4
      text-lg
      rounded-none
    `,
  };

  // Combine styles
  const combinedClass = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      className={combinedClass}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading spinner */}
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icon */}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}

      {/* Text */}
      <span>{children}</span>

      {/* Ripple effect on click */}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        button:active::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 100%;
          transform: scale(1);
          transform-origin: 50% 50%;
          pointer-events: none;
          animation: ripple 600ms ease-out;
        }
      `}</style>
    </button>
  );
}
