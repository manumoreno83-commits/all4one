'use client';

import React from 'react';

interface ProInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function ProInput({
  label,
  error,
  icon,
  fullWidth = false,
  className = '',
  ...props
}: ProInputProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wide">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full
            px-4 ${icon ? 'pl-10' : ''}
            py-3
            bg-white dark:bg-slate-900
            border-2 border-black dark:border-white
            text-black dark:text-white
            text-base font-semibold
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-pink-600
            focus:border-transparent
            transition-all duration-200
            ${error ? 'border-gray-400 focus:ring-red-500' : ''}
            rounded-none
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm font-bold text-pink-600 uppercase tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
}
