import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'watchlist', label: 'Watchlist', icon: 'format_list_bulleted' },
  { id: 'chart', label: 'Chart', icon: 'show_chart' },
  { id: 'explore', label: 'Explore', icon: 'travel_explore' },
  { id: 'ideas', label: 'Ideas', icon: 'forum' },
  { id: 'menu', label: 'Menu', icon: 'menu' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.5)] border-t border-surface-container-high/40">
      <div className="flex justify-around items-center h-14 px-margin-sm max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all cursor-pointer ${
                isActive
                  ? 'text-primary-container drop-shadow-[0_0_8px_rgba(41,98,255,0.45)] font-semibold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`material-symbols-outlined text-[22px] transition-transform ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className="font-body-sm text-[10px] leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
