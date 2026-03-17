'use client';

import React, { useEffect } from 'react';
import ProButton from './ProButton';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
  }[];
  closeButton?: boolean;
}

export default function ProModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  actions = [],
  closeButton = true,
}: ProModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-full sm:w-96 max-h-96',
    md: 'w-full sm:w-2xl max-h-[80vh]',
    lg: 'w-full sm:w-4xl max-h-[90vh]',
    fullscreen: 'w-full h-full',
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        p-4 sm:p-0
      "
      onClick={onClose}
    >
      <div
        className={`
          bg-white dark:bg-slate-900
          rounded-none
          shadow-2xl
          overflow-hidden
          flex flex-col
          transition-all duration-300
          ${sizeClasses[size]}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || closeButton) && (
          <div className="border-b-2 border-black dark:border-white p-6 flex items-center justify-between">
            <div>
              {title && (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-semibold">
                  {subtitle}
                </p>
              )}
            </div>

            {closeButton && (
              <button
                onClick={onClose}
                className="
                  text-2xl font-bold text-gray-600 dark:text-gray-400
                  hover:text-black dark:hover:text-white
                  transition-colors duration-200
                  p-2
                "
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer with Actions */}
        {actions.length > 0 && (
          <div className="border-t-2 border-black dark:border-white p-6 flex gap-3 flex-col sm:flex-row">
            {actions.map((action, index) => (
              <ProButton
                key={index}
                variant={action.variant || 'primary'}
                size="md"
                fullWidth
                onClick={action.onClick}
                isLoading={action.isLoading}
              >
                {action.label}
              </ProButton>
            ))}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        div[onClick][className*="bg-black/50"] ~ div {
          animation: modalIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
