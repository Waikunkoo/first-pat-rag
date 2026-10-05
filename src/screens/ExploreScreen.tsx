import React, { useState, useEffect } from 'react';
import {
  SECTOR_ITEMS,
  TOP_MOVERS_GAINERS,
  TOP_MOVERS_ACTIVE,
  TOP_MOVERS_UNUSUAL,
  ECONOMIC_EVENTS
} from '../data/mockData';

interface ExploreScreenProps {
  onSelectSymbol: (symbol: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onSelectSymbol }) => {
  const [selectedCategory, setSelectedCategory] = useState('Overview');
  const [moversTab, setMoversTab] = useState<'Gainers' | 'Active' | 'Unusual'>('Gainers');
  const [bullishVote, setBullishVote] = useState(74);
  const [hasVoted, setHasVoted] = useState(false);

  // Live clocks for sessions
  const [clocks, setClocks] = useState({
    ny: '11:42:18',
    syd: '02:42:18',
    lon: '16:42:18',
    tok: '00:42:18',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format simulated session times
      const pad = (n: number) => n.toString().padStart(2, '0');
      const s = pad(now.getSeconds());
      const m = pad(now.getMinutes());
      
      setClocks({
        ny: `11:${m}:${s}`,
        syd: `02:${m}:${s}`,
        lon: `16:${m}:${s}`,
        tok: `00:${m}:${s}`,
      });
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['Overview', 'Stocks', 'Crypto', 'Forex', 'Commodities', 'Bonds'];

  const getMoversList = () => {
    switch (moversTab) {
      case 'Active':
        return TOP_MOVERS_ACTIVE;
      case 'Unusual':
        return TOP_MOVERS_UNUSUAL;
      default:
        return TOP_MOVERS_GAINERS;
    }
  };

  const handleCastVote = (isBull: boolean) => {
    if (hasVoted) return;
    setHasVoted(true);
    if (isBull) {
      setBullishVote((prev) => Math.min(99, prev + 1));
    } else {
      setBullishVote((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-4xl mx-auto">
      {/* Asset Category Filter Bar (Pills) */}
      <section className="w-full overflow-x-auto no-scrollbar px-margin pt-3">
        <div className="flex items-center space-x-space-xs" id="categoryChips">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-space-md py-1.5 rounded-full font-title-sm text-title-sm text-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat === 'Overview' && (
                  <span className="material-symbols-outlined text-[16px]">public</span>
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Market Pulse: Trading Sessions Clocks */}
      <section className="px-margin">
        <div className="bg-surface-container rounded-xl p-space-md shadow-md space-y-space-md border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">pace</span>
              <span className="font-headline-md text-title-sm text-on-surface font-semibold">
                Market Pulse
              </span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-label-data-sm text-[11px] text-secondary font-bold">
                2 SESSIONS ACTIVE
              </span>
            </div>
          </div>

          {/* Clocks Grid */}
          <div className="grid grid-cols-2 gap-space-xs">
            {/* New York */}
            <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col justify-between border border-surface-container-high/30">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface font-semibold text-xs">
                  New York
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-secondary-container text-on-secondary-container">
                  OPEN
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-mono text-label-data-md text-on-surface font-semibold text-[13px]">
                  {clocks.ny}
                </span>
                <span className="font-mono text-[10px] text-outline">EST</span>
              </div>
            </div>

            {/* Sydney */}
            <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col justify-between border border-surface-container-high/30">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface font-semibold text-xs">
                  Sydney
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-secondary-container text-on-secondary-container">
                  OPEN
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-mono text-label-data-md text-on-surface font-semibold text-[13px]">
                  {clocks.syd}
                </span>
                <span className="font-mono text-[10px] text-outline">AEDT</span>
              </div>
            </div>

            {/* London */}
            <div className="bg-surface-container-low/60 rounded-lg p-space-sm flex flex-col justify-between opacity-75 border border-surface-container-high/20">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface-variant font-medium text-xs">
                  London
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-surface-container-high text-outline">
                  CLOSED
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-mono text-label-data-md text-on-surface-variant text-[13px]">
                  {clocks.lon}
                </span>
                <span className="font-mono text-[10px] text-outline">GMT</span>
              </div>
            </div>

            {/* Tokyo */}
            <div className="bg-surface-container-low/60 rounded-lg p-space-sm flex flex-col justify-between opacity-75 border border-surface-container-high/20">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface-variant font-medium text-xs">
                  Tokyo
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-surface-container-high text-outline">
                  CLOSED
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-mono text-label-data-md text-on-surface-variant text-[13px]">
                  {clocks.tok}
                </span>
                <span className="font-mono text-[10px] text-outline">JST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Performance Heatmap Treemap */}
      <section className="px-margin space-y-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">grid_view</span>
            <span className="font-headline-md text-title-sm text-on-surface font-semibold">
              Sector Treemap
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            24h Heatmap
          </span>
        </div>

        {/* Treemap Container using custom grid weightings */}
        <div className="grid grid-cols-6 gap-1 h-44 rounded-xl overflow-hidden shadow-sm">
          {/* Technology (Big bullish) */}
          <div
            onClick={() => onSelectSymbol('NVDA')}
            className="col-span-4 row-span-2 bg-secondary-container text-on-secondary-container p-space-sm rounded-lg flex flex-col justify-between transition-transform active:scale-[0.98] cursor-pointer hover:brightness-105"
          >
            <div className="flex justify-between items-start">
              <span className="font-title-sm text-title-sm font-semibold leading-tight text-sm">
                Technology
              </span>
              <span className="material-symbols-outlined text-[16px] opacity-80">trending_up</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-label-data-lg font-bold text-lg">+2.4%</span>
              <span className="font-body-sm text-body-sm opacity-80 text-xs font-mono">XLK</span>
            </div>
          </div>

          {/* Energy */}
          <div className="col-span-2 row-span-1 bg-secondary text-on-secondary p-2 rounded-lg flex flex-col justify-between cursor-pointer hover:brightness-105">
            <span className="font-body-md text-body-md font-semibold truncate text-xs">Energy</span>
            <span className="font-mono text-label-data-md font-bold text-xs">+1.8%</span>
          </div>

          {/* Consumer Cyclical */}
          <div className="col-span-2 row-span-1 bg-secondary-fixed-dim text-on-secondary-fixed p-2 rounded-lg flex flex-col justify-between cursor-pointer hover:brightness-105">
            <span className="font-body-md text-body-md font-semibold truncate text-xs">Cyclicals</span>
            <span className="font-mono text-label-data-md font-bold text-xs">+1.2%</span>
          </div>

          {/* Financials */}
          <div className="col-span-2 row-span-1 bg-tertiary-fixed-dim text-on-tertiary-fixed-variant p-2 rounded-lg flex flex-col justify-between cursor-pointer hover:brightness-105">
            <span className="font-body-md text-body-md font-semibold truncate text-xs">Financials</span>
            <span className="font-mono text-label-data-md font-bold text-xs">-0.4%</span>
          </div>

          {/* Healthcare */}
          <div className="col-span-2 row-span-1 bg-tertiary text-on-tertiary p-2 rounded-lg flex flex-col justify-between cursor-pointer hover:brightness-105">
            <span className="font-body-md text-body-md font-semibold truncate text-xs">Healthcare</span>
            <span className="font-mono text-label-data-md font-bold text-xs">-0.9%</span>
          </div>

          {/* Utilities */}
          <div className="col-span-2 row-span-1 bg-tertiary-container text-on-tertiary-container p-2 rounded-lg flex flex-col justify-between cursor-pointer hover:brightness-105">
            <span className="font-body-md text-body-md font-semibold truncate text-xs">Utilities</span>
            <span className="font-mono text-label-data-md font-bold text-xs">-1.5%</span>
          </div>
        </div>
      </section>

      {/* Sentiment Radar Gauge */}
      <section className="px-margin">
        <div className="bg-surface-container rounded-xl p-space-md shadow-md space-y-space-sm border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                sentiment_very_satisfied
              </span>
              <span className="font-headline-md text-title-sm text-on-surface font-semibold">
                Community Sentiment
              </span>
            </div>
            <span className="font-mono text-label-data-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded-full font-bold text-xs">
              GREED {bullishVote}
            </span>
          </div>

          {/* Dynamic Bi-directional Meter */}
          <div className="space-y-1">
            <div className="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden flex p-0.5 gap-1">
              <div
                className="h-full bg-secondary-container rounded-l-full transition-all duration-500"
                style={{ width: `${bullishVote}%` }}
              />
              <div
                className="h-full bg-tertiary-container rounded-r-full transition-all duration-500"
                style={{ width: `${100 - bullishVote}%` }}
              />
            </div>
            <div className="flex justify-between items-center font-mono text-label-data-sm text-xs pt-0.5">
              <button
                onClick={() => handleCastVote(true)}
                className="text-secondary font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
                {bullishVote}% Bullish
              </button>
              <button
                onClick={() => handleCastVote(false)}
                className="text-tertiary font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                {100 - bullishVote}% Bearish
                <span className="material-symbols-outlined text-[13px]">arrow_downward</span>
              </button>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            Based on 148,290 real-time ideas & technical votes in the last 4 hours.
          </p>
        </div>
      </section>

      {/* Top Movers & Heatmap Lists Tabbed Section */}
      <section className="px-margin space-y-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            <span className="font-headline-md text-title-sm text-on-surface font-semibold">
              Top Movers
            </span>
          </div>
          <div className="flex space-x-1 bg-surface-container p-0.5 rounded-lg text-body-sm">
            {(['Gainers', 'Active', 'Unusual'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMoversTab(tab)}
                className={`px-2.5 py-1 rounded font-medium text-[11px] transition-all cursor-pointer ${
                  moversTab === tab
                    ? 'bg-surface-bright text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab === 'Unusual' ? 'Unusual Vol' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Movers Content Card */}
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm divide-y divide-surface-container-high/40 border border-surface-container-high/40">
          {getMoversList().map((item) => (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol(item.symbol)}
              className="p-space-md flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-mono font-bold text-xs text-primary">
                  {item.symbol}
                </div>
                <div>
                  <div className="font-mono font-bold text-xs text-on-surface">{item.symbol}</div>
                  <div className="font-body-sm text-body-sm text-outline text-[11px]">{item.name}</div>
                </div>
              </div>

              {/* Sparkline and telemetry */}
              <div className="flex items-center gap-3">
                <svg className="w-12 h-6 text-secondary" fill="none" viewBox="0 0 48 24">
                  <path
                    d="M1 20L12 16L24 18L34 7L47 2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="text-right">
                  <div className="font-mono text-label-data-md text-on-surface font-semibold text-xs">
                    ${item.price.toFixed(2)}
                  </div>
                  <div
                    className={`inline-block px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                      item.changePercent >= 0
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-tertiary-container text-on-tertiary-container'
                    }`}
                  >
                    {item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unusual Volume Scanner Highlight Banner */}
      <section className="px-margin">
        <div className="bg-gradient-to-r from-surface-container to-surface-container-high p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container-high/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
              <span className="font-headline-md text-title-sm text-on-surface font-semibold">
                Unusual Vol Radar
              </span>
            </div>
            <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
              LIVE SPIKE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-xs pt-1">
            {/* PLTR */}
            <div
              onClick={() => onSelectSymbol('PLTR')}
              className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-container-lowest"
            >
              <div>
                <span className="font-mono font-bold text-on-surface block text-xs">PLTR</span>
                <span className="font-mono text-[10px] text-secondary font-bold">Vol 3.2x avg</span>
              </div>
              <span className="font-mono text-label-data-md text-on-surface text-xs font-semibold">
                $24.15
              </span>
            </div>

            {/* SOFI */}
            <div
              onClick={() => onSelectSymbol('SOFI')}
              className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-container-lowest"
            >
              <div>
                <span className="font-mono font-bold text-on-surface block text-xs">SOFI</span>
                <span className="font-mono text-[10px] text-secondary font-bold">Vol 2.8x avg</span>
              </div>
              <span className="font-mono text-label-data-md text-on-surface text-xs font-semibold">
                $7.92
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Calendar Preview */}
      <section className="px-margin space-y-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary-container text-[18px]">
              calendar_today
            </span>
            <span className="font-headline-md text-title-sm text-on-surface font-semibold">
              Economic Calendar
            </span>
          </div>
          <button
            onClick={() => alert('Full macro economic release schedule for Q4')}
            className="font-body-sm text-body-sm text-primary flex items-center gap-0.5 text-xs hover:underline cursor-pointer"
          >
            View All <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="bg-surface-container rounded-xl p-space-md shadow-md space-y-space-md border border-surface-container-high/40">
          {ECONOMIC_EVENTS.map((event, idx) => (
            <React.Fragment key={event.id}>
              {idx > 0 && <div className="h-px bg-surface-container-high w-full" />}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface">
                      {event.currency}
                    </span>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold text-xs">
                      {event.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant text-xs">
                    <span>
                      Forecast: <strong className="text-on-surface font-mono">{event.forecast}</strong>
                    </span>
                    <span>
                      Prior: <strong className="text-on-surface font-mono">{event.prior}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1 shrink-0">
                  {/* Impact Dots */}
                  <div className="flex items-center space-x-1" title="High Impact">
                    {Array.from({ length: event.impactLevel }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full bg-tertiary-container ${
                          i === 0 && event.timeRemaining.includes('hours') ? 'animate-ping' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      event.timeRemaining.includes('hours')
                        ? 'text-tertiary-container bg-surface-container-lowest'
                        : 'text-outline bg-surface-container-lowest'
                    }`}
                  >
                    {event.timeRemaining}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};
