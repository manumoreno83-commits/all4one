'use client';

import React from 'react';

interface ProLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

export default function ProLayout({
  left,
  right,
  className = '',
  leftClassName = '',
  rightClassName = '',
  gap = 'md',
}: ProLayoutProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6 lg:gap-8',
    lg: 'gap-8 lg:gap-12',
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 ${gapClasses[gap]} ${className}`}>
      {/* Left Panel */}
      <div className={`flex flex-col justify-between ${leftClassName}`}>
        {left}
      </div>

      {/* Right Panel */}
      <div className={`flex flex-col justify-between ${rightClassName}`}>
        {right}
      </div>
    </div>
  );
}
