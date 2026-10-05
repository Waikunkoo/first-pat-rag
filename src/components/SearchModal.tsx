import React, { useState } from 'react';
import { WatchlistItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: WatchlistItem[];
  onSelectSymbol: (symbol: string) => void;
  onAddToWatchlist?: (symbol: WatchlistItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  watchlist,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularSymbols = [
    { symbol: 'NVDA', name: 'NVIDIA Corp.', category: 'Stock', price: '$875.28', change: '+3.81%' },
    { symbol: 'BTC/USD', name: 'Bitcoin', category: 'Crypto', price: '$64,280.50', change: '+3.41%' },
    { symbol: 'AAPL', name: 'Apple Inc.', category: 'Stock', price: '$182.52', change: '-0.65%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', category: 'Stock', price: '$175.34', change: '+2.41%' },
    { symbol: 'ETH/USD', name: 'Ethereum', category: 'Crypto', price: '$3,485.10', change: '+3.71%' },
    { symbol: 'SOL/USD', name: 'Solana', category: 'Crypto', price: '$184.20', change: '+8.42%' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', category: 'Stock', price: '$420.75', change: '+1.12%' },
    { symbol: 'XAU/USD', name: 'Gold Spot', category: 'Forex', price: '$2,342.10', change: '+0.82%' },
  ];

  const filtered = popularSymbols.filter(
    (item) =>
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-lg bg-surface-container rounded-2xl border border-surface-container-high shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-surface-container-high/60 gap-3">
          <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search symbols, indices, crypto (e.g. NVDA, BTC)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-on-surface placeholder:text-outline font-body-md focus:outline-none text-[15px]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-outline hover:text-on-surface p-1 rounded-full text-xs font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1.5 rounded-lg bg-surface-container-high/50 hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto no-scrollbar p-2">
          <div className="px-3 py-1.5 text-[11px] font-mono text-outline uppercase tracking-wider">
            {query ? 'Matching Instruments' : 'Trending & Verified Assets'}
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {filtered.map((item) => {
              const isPositive = item.change.startsWith('+');
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-container-high cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center font-mono font-bold text-xs text-primary">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-on-surface text-[13px]">
                          {item.symbol}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-[9px] font-mono text-outline">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-on-surface-variant truncate block max-w-[180px]">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-on-surface text-[13px]">
                      {item.price}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isPositive
                          ? 'bg-secondary-container/20 text-secondary'
                          : 'bg-tertiary-container/20 text-tertiary'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Keyboard shortcuts */}
        <div className="px-4 py-2 bg-surface-container-lowest/80 border-t border-surface-container-high/40 flex items-center justify-between text-[11px] text-outline">
          <span>Click any symbol to open live chart & details</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
