import React from 'react';
import { ASSET_LOGOS } from '../data/mockData';

interface HeaderProps {
  title: string;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onOpenSearch,
  onOpenNotifications,
  showBackButton = false,
  onBack,
  isFavorite = false,
  onToggleFavorite,
  onProfileClick
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface-container-low/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.35)] border-b border-surface-container-high/40">
      <div className="h-14 px-margin flex items-center justify-between gap-gutter max-w-7xl mx-auto">
        {/* Left Brand / Back navigation */}
        <div className="flex items-center gap-space-sm shrink-0">
          {showBackButton ? (
            <button
              onClick={onBack}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer rounded-lg hover:bg-surface-container"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div className="flex items-center gap-2">
            <img
              alt="Terminal Logo"
              className="h-8 w-auto object-contain"
              src={ASSET_LOGOS.logo}
            />
            <span className="font-headline-md text-headline-md font-semibold tracking-tight text-on-surface hidden sm:inline">
              {title}
            </span>
            {showBackButton && (
              <h1 className="font-headline-md text-headline-md font-semibold tracking-tight text-on-surface sm:hidden">
                {title}
              </h1>
            )}
          </div>
        </div>

        {/* Center Search Trigger */}
        {!showBackButton ? (
          <button
            onClick={onOpenSearch}
            className="flex-1 max-w-md h-9 px-space-md flex items-center gap-space-xs bg-surface-container rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <span className="font-body-sm text-body-sm text-outline truncate text-left">
              Search markets, symbols, ideas...
            </span>
            <kbd className="hidden md:inline-block ml-auto text-[10px] text-outline font-mono bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant/30">
              ⌘K
            </kbd>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right Actions: Favorite (if details), Notifications, Profile */}
        <div className="flex items-center gap-space-xs shrink-0">
          {showBackButton && onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'text-[#ffb703] bg-surface-container'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              title="Watchlist Star"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isFavorite ? 'grade' : 'star'}
              </span>
            </button>
          )}

          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 flex items-center justify-center relative text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-tertiary-container ring-2 ring-surface-container-low animate-pulse"></span>
          </button>

          <button
            onClick={onProfileClick}
            className="relative cursor-pointer rounded-full p-0.5 hover:ring-2 hover:ring-primary transition-all ml-1"
            title="Account Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/30"
              src={ASSET_LOGOS.profile}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary-container rounded-full ring-2 ring-surface-container-low"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
