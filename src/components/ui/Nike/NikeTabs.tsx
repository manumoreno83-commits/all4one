'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface NikeTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export default function NikeTabs({
  tabs,
  defaultTabId,
  onChange,
  variant = 'underline',
  className = '',
}: NikeTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      {/* Tab List */}
      <div
        className={`
          flex border-b-2 border-black dark:border-white
          overflow-x-auto
          ${variant === 'pills' ? 'gap-2 border-b-0 p-2' : 'gap-0'}
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              flex items-center gap-2
              px-4 py-3 sm:px-6 sm:py-4
              font-extrabold uppercase tracking-wide
              text-sm sm:text-base
              transition-all duration-200
              whitespace-nowrap
              focus:outline-none focus:ring-2 focus:ring-pink-600
              ${
                activeTab === tab.id
                  ? variant === 'pills'
                    ? 'bg-black text-white dark:bg-white dark:text-black rounded-none'
                    : 'text-black dark:text-white border-b-2 border-black dark:border-white -mb-[2px]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-6 animate-fade-in">
        {activeTabContent}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
