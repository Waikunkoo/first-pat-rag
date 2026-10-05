import React, { useState } from 'react';
import { WatchlistItem, AssetCategory } from '../types';
import { MARKET_RIBBON_ITEMS } from '../data/mockData';

interface WatchlistScreenProps {
  watchlist: WatchlistItem[];
  onSelectSymbol: (symbol: string) => void;
  onNavigateToTab: (tab: 'chart' | 'explore') => void;
  onOpenAddSymbol: () => void;
}

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  watchlist,
  onSelectSymbol,
  onNavigateToTab,
  onOpenAddSymbol,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<AssetCategory>('all');
  const [currentWatchlistName, setCurrentWatchlistName] = useState('Tech & Crypto Focus');
  const [isWatchlistDropdownOpen, setIsWatchlistDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price' | 'change'>('default');

  const watchlists = [
    'Tech & Crypto Focus',
    'Global Macro & Forex',
    'Mega-Cap AI Leaders',
    'DeFi High-Yield Movers',
  ];

  // Filtering
  const filteredItems = watchlist.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change') return b.changePercent - a.changePercent;
    return 0;
  });

  const toggleSort = () => {
    if (sortBy === 'default') setSortBy('change');
    else if (sortBy === 'change') setSortBy('price');
    else setSortBy('default');
  };

  return (
    <div className="flex flex-col w-full pb-6 select-none max-w-4xl mx-auto">
      {/* Scrolling Market Ribbon */}
      <div className="w-full bg-surface-container-lowest overflow-x-auto no-scrollbar py-2 px-margin flex items-center gap-space-sm border-b border-surface-container-high/40">
        {MARKET_RIBBON_ITEMS.map((item) => (
          <div
            key={item.symbol}
            onClick={() => onSelectSymbol(item.symbol.includes('BTC') ? 'BTC/USD' : item.symbol)}
            className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1 rounded-full shrink-0 shadow-sm cursor-pointer hover:bg-surface-container transition-colors"
          >
            {item.isBullish ? (
              <span className={`w-1.5 h-1.5 rounded-full bg-secondary-container ${item.isPulse ? 'animate-pulse' : ''}`} />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container" />
            )}
            <span className="font-ticker-badge text-ticker-badge text-on-surface font-mono font-bold text-xs">
              {item.symbol}
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant font-mono text-[11px]">
              {item.price}
            </span>
            <span
              className={`font-label-data-sm text-label-data-sm font-mono text-[11px] font-medium ${
                item.isBullish ? 'text-secondary-fixed-dim' : 'text-tertiary'
              }`}
            >
              {item.changePercent}
            </span>
          </div>
        ))}
      </div>

      {/* Watchlist Controller Bar */}
      <div className="px-margin pt-3 pb-2 flex items-center justify-between relative">
        <div className="flex items-center gap-space-xs">
          <div className="relative">
            <button
              onClick={() => setIsWatchlistDropdownOpen(!isWatchlistDropdownOpen)}
              className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight text-[17px]">
                {currentWatchlistName}
              </span>
              <span className="material-symbols-outlined text-[18px] text-outline">
                {isWatchlistDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {isWatchlistDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-surface-container rounded-xl border border-surface-container-high shadow-xl z-30 p-1.5 animate-in fade-in">
                {watchlists.map((wl) => (
                  <button
                    key={wl}
                    onClick={() => {
                      setCurrentWatchlistName(wl);
                      setIsWatchlistDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      wl === currentWatchlistName
                        ? 'bg-primary-container/20 text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{wl}</span>
                    {wl === currentWatchlistName && (
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="w-2 h-2 rounded-full bg-primary-container" />
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            onClick={toggleSort}
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors active:scale-95 cursor-pointer"
            title={`Sort: ${sortBy}`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
          <button
            onClick={onOpenAddSymbol}
            className="h-8 px-2.5 rounded-lg bg-primary-container text-on-primary-container flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span className="font-title-sm text-body-sm font-semibold text-xs">Symbol</span>
          </button>
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="w-full overflow-x-auto no-scrollbar px-margin py-2 flex items-center gap-space-xs">
        {[
          { id: 'all', label: `All (${watchlist.length})` },
          { id: 'stock', label: 'Stocks' },
          { id: 'crypto', label: 'Crypto' },
          { id: 'forex', label: 'Forex' },
          { id: 'index', label: 'Indices' },
          { id: 'futures', label: 'Futures' },
        ].map((chip) => {
          const isActive = selectedFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setSelectedFilter(chip.id as AssetCategory)}
              className={`px-3 py-1.5 rounded-full font-body-sm text-body-sm shrink-0 transition-all active:scale-95 cursor-pointer text-xs ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant font-medium hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Column Telemetry Header */}
      <div className="px-margin pt-2 pb-1.5 flex items-center justify-between text-outline font-mono text-[11px] uppercase tracking-wider">
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-on-surface"
          onClick={toggleSort}
        >
          <span>Ticker / Volume</span>
          <span className="material-symbols-outlined text-[12px]">unfold_more</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">Trend (24h)</span>
          <span>Last / Chg</span>
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="flex flex-col gap-1 px-margin-sm" id="watchlist-container">
        {sortedItems.map((item) => (
          <div
            key={item.symbol}
            onClick={() => onSelectSymbol(item.symbol)}
            className="group flex items-center justify-between px-space-md py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all active:scale-[0.99] cursor-pointer border border-transparent hover:border-surface-container-high/60"
          >
            {/* Left zone: Icon + Name */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-mono text-xs text-primary font-bold shrink-0">
                {item.icon ? (
                  <span className="material-symbols-outlined text-[18px] text-on-surface">
                    {item.icon}
                  </span>
                ) : item.avatarText ? (
                  <span
                    className={
                      item.symbol.includes('BTC')
                        ? 'text-secondary-fixed text-sm'
                        : item.symbol === 'TSLA'
                        ? 'text-error'
                        : 'text-primary'
                    }
                  >
                    {item.avatarText}
                  </span>
                ) : (
                  item.symbol.charAt(0)
                )}
              </div>

              <div className="flex flex-col min-w-0 pl-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[13px] font-bold text-on-surface">
                    {item.symbol}
                  </span>
                  <span
                    className={`px-1 py-0.2 rounded text-[9px] font-mono uppercase bg-surface-container-high ${
                      item.exchange === 'SPOT' ? 'text-secondary font-bold' : 'text-outline'
                    }`}
                  >
                    {item.exchange}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-on-surface-variant truncate max-w-[100px] sm:max-w-none">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-outline font-mono font-normal">
                    {item.category === 'crypto' ? '24h ' : 'Vol '}
                    {item.volume}
                  </span>
                </div>
              </div>
            </div>

            {/* Sparkline (Bullish or Bearish) */}
            <div className="w-16 h-7 flex items-center shrink-0 mx-2">
              {item.isBullish ? (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 64 28">
                  <path
                    className="text-secondary-container"
                    d="M 0,22 Q 12,25 24,15 T 44,10 T 64,3"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                  <circle
                    className="fill-secondary-container animate-ping opacity-75"
                    cx="64"
                    cy="3"
                    r="2"
                  />
                  <circle className="fill-secondary-container" cx="64" cy="3" r="2" />
                </svg>
              ) : (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 64 28">
                  <path
                    className="text-tertiary-container"
                    d="M 0,6 Q 16,4 28,14 T 48,18 T 64,24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                  <circle className="fill-tertiary-container" cx="64" cy="24" r="2" />
                </svg>
              )}
            </div>

            {/* Quotes: Last Price & % badge */}
            <div className="flex flex-col items-end shrink-0 min-w-[84px]">
              <span className="font-mono text-[13px] font-bold text-on-surface tracking-tight">
                ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className={`font-mono text-[11px] ${
                    item.isBullish ? 'text-secondary-fixed-dim' : 'text-tertiary'
                  }`}
                >
                  {item.change >= 0 ? `+$${item.change.toFixed(2)}` : `-$${Math.abs(item.change).toFixed(2)}`}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                    item.isBullish
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-tertiary-container text-on-tertiary-container'
                  }`}
                >
                  {item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Pulse Indicator & Quick Action Dock */}
      <div className="mx-margin mt-4 p-3 rounded-xl bg-surface-container flex items-center justify-between shadow-md border border-surface-container-high/40">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container" />
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            Live streaming • 0ms latency
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToTab('explore')}
            className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm text-xs flex items-center gap-1 hover:bg-surface-bright transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">bar_chart</span>
            <span>Heatmap</span>
          </button>
          <button
            onClick={onOpenAddSymbol}
            className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm text-xs flex items-center gap-1 hover:bg-surface-bright transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">sensors</span>
            <span>Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};
