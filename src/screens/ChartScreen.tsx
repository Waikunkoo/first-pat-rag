import React, { useState, useEffect } from 'react';
import { BTC_CANDLES_1D } from '../data/mockData';

interface ChartScreenProps {
  symbol?: string;
  onExecuteOrder?: (order: { symbol: string; action: 'BUY' | 'SELL'; price: number; size: number }) => void;
  onOpenDetails?: (symbol: string) => void;
}

export const ChartScreen: React.FC<ChartScreenProps> = ({
  symbol = 'BTC/USD',
  onExecuteOrder,
  onOpenDetails,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [candleStyle, setCandleStyle] = useState<'Candles' | 'Line' | 'Area'>('Candles');
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const [showIndicators, setShowIndicators] = useState(true);
  const [selectedLotSize, setSelectedLotSize] = useState('0.10');
  const [selectedLeverage, setSelectedLeverage] = useState('20x');
  const [isLeverageMenuOpen, setIsLeverageMenuOpen] = useState(false);
  const [hoveredCandleIndex, setHoveredCandleIndex] = useState<number | null>(16);
  const [orderToast, setOrderToast] = useState<{ message: string; visible: boolean } | null>(null);

  // Live price fluctuation effect
  const [currentPrice, setCurrentPrice] = useState(64280.50);
  const [isPriceTickUp, setIsPriceTickUp] = useState<boolean | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() * 8 - 3.8);
      setCurrentPrice((prev) => {
        const next = Math.round((prev + delta) * 100) / 100;
        setIsPriceTickUp(delta > 0);
        setTimeout(() => setIsPriceTickUp(null), 600);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W'];
  const lotSizes = ['0.05', '0.10', '0.50', '1.00'];
  const leverages = ['5x', '10x', '20x', '50x', '100x'];

  const currentHoveredCandle = hoveredCandleIndex !== null
    ? BTC_CANDLES_1D[hoveredCandleIndex]
    : BTC_CANDLES_1D[BTC_CANDLES_1D.length - 1];

  const handleTrade = (action: 'BUY' | 'SELL') => {
    const price = action === 'BUY' ? 64285.00 : 64275.00;
    const size = parseFloat(selectedLotSize);
    
    if (onExecuteOrder) {
      onExecuteOrder({
        symbol,
        action,
        price,
        size,
      });
    }

    setOrderToast({
      message: `${action} ${selectedLotSize} BTC at $${price.toLocaleString()} executed!`,
      visible: true,
    });

    setTimeout(() => {
      setOrderToast(null);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full pb-6 selection:bg-primary selection:text-on-primary max-w-4xl mx-auto">
      {/* Toast Notification */}
      {orderToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-surface-bright text-on-surface flex items-center gap-2 shadow-2xl border border-secondary-container animate-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
          <span className="font-mono text-xs font-semibold">{orderToast.message}</span>
          <span className="text-[10px] text-outline font-mono ml-2">Binance Tier 1</span>
        </div>
      )}

      {/* Chart Top Telemetry & Info Header */}
      <div className="px-margin pt-space-sm pb-space-xs bg-surface-container-low flex flex-col gap-space-xs shadow-sm border-b border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-gutter cursor-pointer hover:opacity-90"
            onClick={() => onOpenDetails && onOpenDetails('BTC/USD')}
          >
            <div className="w-7 h-7 rounded-lg bg-[#f7931a]/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] text-[#f7931a]">
                currency_bitcoin
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-ticker-badge text-ticker-badge tracking-wider text-on-surface font-mono font-bold text-xs">
                  {symbol}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
                <span className="font-body-sm text-body-sm text-outline text-[11px]">Binance</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 text-[11px]">
                Spot Perpetual • Tier 1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => onOpenDetails && onOpenDetails(symbol)}
              className="px-2 py-1 rounded-lg bg-surface-container-high flex items-center gap-1 text-on-surface-variant hover:text-on-surface active:scale-95 transition-all text-xs font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span className="hidden sm:inline">Details</span>
            </button>
            <button
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen?.();
                } else {
                  document.documentElement.requestFullscreen?.();
                }
              }}
              className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-all cursor-pointer"
              title="Fullscreen"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
            </button>
            <button
              onClick={() => {
                alert('Chart snapshot copied to clipboard!');
              }}
              className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-all cursor-pointer"
              title="Snapshot"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
          </div>
        </div>

        {/* Live Price Ticker & High/Low Metrics */}
        <div className="flex items-baseline justify-between mt-0.5">
          <div className="flex items-baseline gap-space-sm">
            <span
              className={`font-label-data-lg text-headline-lg-mobile font-semibold tracking-tight font-mono text-[22px] transition-colors duration-300 ${
                isPriceTickUp === true
                  ? 'text-secondary'
                  : isPriceTickUp === false
                  ? 'text-tertiary'
                  : 'text-on-surface'
              }`}
            >
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="inline-flex items-center gap-0.5 px-space-xs py-0.5 rounded bg-secondary-container/20 text-secondary font-mono text-label-data-sm text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[13px] leading-none">arrow_drop_up</span>
              +3.42%
            </span>
          </div>

          <div className="flex items-center gap-gutter text-right">
            <div className="flex flex-col">
              <span className="font-body-sm text-[10px] text-outline leading-tight">24h High</span>
              <span className="font-label-data-sm text-label-data-sm text-on-surface font-mono text-[11px]">
                $65,100.00
              </span>
            </div>
            <div className="w-[1px] h-5 bg-surface-variant" />
            <div className="flex flex-col">
              <span className="font-body-sm text-[10px] text-outline leading-tight">24h Low</span>
              <span className="font-label-data-sm text-label-data-sm text-on-surface font-mono text-[11px]">
                $62,940.00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector Tabs */}
      <div className="flex items-center justify-between px-margin py-space-xs bg-surface-container-low overflow-x-auto no-scrollbar gap-space-xs border-b border-surface-container-high/30">
        <div className="flex items-center gap-1 shrink-0">
          {timeframes.map((tf) => {
            const isActive = selectedTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-[0_0_10px_rgba(41,98,255,0.4)]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                {tf}
              </button>
            );
          })}
          <div className="relative">
            <button className="flex items-center gap-0.5 px-2 py-1 rounded text-outline font-mono text-[11px] hover:text-on-surface transition-colors cursor-pointer">
              More
              <span className="material-symbols-outlined text-[13px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Utility Toolbar */}
      <div className="flex items-center justify-between px-margin py-1.5 bg-surface-container shadow-inner border-b border-surface-container-high/40">
        <div className="flex items-center gap-space-xs relative">
          {/* Active Candle Style */}
          <div className="relative">
            <button
              onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}
              className="h-7 px-2 rounded bg-surface-container-high text-primary flex items-center gap-1 shadow-sm font-mono text-[11px] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {candleStyle === 'Candles' ? 'candlestick_chart' : candleStyle === 'Line' ? 'show_chart' : 'area_chart'}
              </span>
              <span>{candleStyle}</span>
              <span className="material-symbols-outlined text-[13px]">arrow_drop_down</span>
            </button>

            {isStyleMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-32 bg-surface-container rounded-lg border border-surface-container-high shadow-xl z-30 p-1">
                {(['Candles', 'Line', 'Area'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => {
                      setCandleStyle(style);
                      setIsStyleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded text-xs font-mono ${
                      candleStyle === style ? 'bg-primary-container/20 text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compare Action */}
          <button
            onClick={() => alert('Compare tool: Overlay SPX, NDX, or Gold')}
            className="h-7 px-2 rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-mono text-[11px] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            <span>Compare</span>
          </button>

          {/* Indicators Toggle */}
          <button
            onClick={() => setShowIndicators(!showIndicators)}
            className={`h-7 px-2 rounded flex items-center gap-1.5 font-mono text-[11px] transition-colors cursor-pointer ${
              showIndicators
                ? 'bg-surface-container-low text-on-surface'
                : 'bg-surface-container-low text-outline'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-primary">function</span>
            <span>Indicators</span>
            <span className="px-1 py-0.2 rounded bg-surface-bright text-[9px] font-mono text-primary font-bold">
              3
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => alert('Alert created at $64,280.50')}
            className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            title="Create Alert"
          >
            <span className="material-symbols-outlined text-[17px]">add_alert</span>
          </button>
          <button
            onClick={() => alert('Chart Settings: Time zone UTC, Candlestick colors')}
            className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Chart Settings"
          >
            <span className="material-symbols-outlined text-[17px]">tune</span>
          </button>
        </div>
      </div>

      {/* Active Indicators Legend Strip */}
      {showIndicators && (
        <div className="flex items-center justify-between px-margin py-1 bg-surface-container text-body-sm font-body-sm border-b border-surface-container-high/30">
          <div className="flex items-center gap-space-md text-[11px] overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-0.5 rounded bg-[#00f2fe]" />
              <span className="font-mono text-on-surface-variant text-[11px]">
                EMA 20 <span className="text-[#00f2fe] font-medium">63,890.2</span>
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-0.5 rounded bg-[#ffb703]" />
              <span className="font-mono text-on-surface-variant text-[11px]">
                EMA 50 <span className="text-[#ffb703] font-medium">62,410.8</span>
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-0.5 rounded bg-[#a855f7]" />
              <span className="font-mono text-on-surface-variant text-[11px]">
                RSI 14 <span className="text-[#a855f7] font-medium">58.4</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowIndicators(false)}
            className="text-outline hover:text-on-surface flex items-center shrink-0 pl-1 cursor-pointer"
            title="Hide Indicators"
          >
            <span className="material-symbols-outlined text-[15px]">visibility</span>
          </button>
        </div>
      )}

      {/* Main Chart Canvas Area */}
      <div className="relative w-full bg-surface-container-low overflow-hidden select-none touch-pan-x">
        {/* SVG Chart Stage */}
        <div className="relative w-full h-[320px]">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 390 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bull-glow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#089981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#089981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="rsi-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Price Grid Lines */}
            <line opacity="0.45" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="330" y1="40" y2="40" />
            <line opacity="0.45" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="330" y1="95" y2="95" />
            <line opacity="0.45" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="330" y1="150" y2="150" />
            <line opacity="0.45" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="330" y1="205" y2="205" />
            <line opacity="0.45" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="330" y1="260" y2="260" />

            {/* Vertical Time Grid Lines */}
            <line opacity="0.3" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="55" x2="55" y1="0" y2="300" />
            <line opacity="0.3" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="125" x2="125" y1="0" y2="300" />
            <line opacity="0.3" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="195" x2="195" y1="0" y2="300" />
            <line opacity="0.3" stroke="#313441" strokeDasharray="3,3" strokeWidth="0.75" x1="265" x2="265" y1="0" y2="300" />

            {/* EMA 50 Overlay (Amber Gold) */}
            {showIndicators && (
              <path
                d="M 0,225 C 40,220 80,210 120,205 C 160,200 200,185 240,165 C 280,145 310,135 330,130"
                fill="none"
                opacity="0.85"
                stroke="#ffb703"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            )}

            {/* EMA 20 Overlay (Electric Cyan) */}
            {showIndicators && (
              <path
                d="M 0,210 C 35,198 75,215 115,190 C 155,165 195,145 235,110 C 275,80 305,92 330,86"
                fill="none"
                stroke="#00f2fe"
                strokeLinecap="round"
                strokeWidth="2"
              />
            )}

            {/* Candlestick Series matching design */}
            {/* Candle 1: Bull */}
            <line stroke="#089981" strokeWidth="1.2" x1="18" x2="18" y1="185" y2="235" />
            <rect fill="#089981" height="28" rx="0.5" width="10" x="13" y="195" />

            {/* Candle 2: Bull */}
            <line stroke="#089981" strokeWidth="1.2" x1="36" x2="36" y1="172" y2="220" />
            <rect fill="#089981" height="22" rx="0.5" width="10" x="31" y="180" />

            {/* Candle 3: Bear */}
            <line stroke="#f23645" strokeWidth="1.2" x1="54" x2="54" y1="175" y2="218" />
            <rect fill="#f23645" height="26" rx="0.5" width="10" x="49" y="182" />

            {/* Candle 4: Bear pullback */}
            <line stroke="#f23645" strokeWidth="1.2" x1="72" x2="72" y1="190" y2="242" />
            <rect fill="#f23645" height="32" rx="0.5" width="10" x="67" y="200" />

            {/* Candle 5: Bull Reversal Pinbar */}
            <line stroke="#089981" strokeWidth="1.2" x1="90" x2="90" y1="180" y2="250" />
            <rect fill="#089981" height="18" rx="0.5" width="10" x="85" y="188" />

            {/* Candle 6: Massive Bull Impulse */}
            <line stroke="#089981" strokeWidth="1.2" x1="108" x2="108" y1="140" y2="198" />
            <rect fill="#089981" height="42" rx="0.5" width="10" x="103" y="148" />

            {/* Candle 7: Bull Continuation */}
            <line stroke="#089981" strokeWidth="1.2" x1="126" x2="126" y1="128" y2="168" />
            <rect fill="#089981" height="25" rx="0.5" width="10" x="121" y="132" />

            {/* Candle 8: Bear Doji */}
            <line stroke="#f23645" strokeWidth="1.2" x1="144" x2="144" y1="122" y2="162" />
            <rect fill="#f23645" height="6" rx="0.5" width="10" x="139" y="138" />

            {/* Candle 9: Bear Consolidation */}
            <line stroke="#f23645" strokeWidth="1.2" x1="162" x2="162" y1="130" y2="175" />
            <rect fill="#f23645" height="22" rx="0.5" width="10" x="157" y="140" />

            {/* Candle 10: Bull Engulfing */}
            <line stroke="#089981" strokeWidth="1.2" x1="180" x2="180" y1="105" y2="165" />
            <rect fill="#089981" height="42" rx="0.5" width="10" x="175" y="112" />

            {/* Candle 11: Bull Run */}
            <line stroke="#089981" strokeWidth="1.2" x1="198" x2="198" y1="85" y2="135" />
            <rect fill="#089981" height="34" rx="0.5" width="10" x="193" y="94" />

            {/* Candle 12: High Wick Rejection Bear */}
            <line stroke="#f23645" strokeWidth="1.2" x1="216" x2="216" y1="65" y2="125" />
            <rect fill="#f23645" height="20" rx="0.5" width="10" x="211" y="92" />

            {/* Candle 13: Bull Hammer */}
            <line stroke="#089981" strokeWidth="1.2" x1="234" x2="234" y1="80" y2="140" />
            <rect fill="#089981" height="15" rx="0.5" width="10" x="229" y="85" />

            {/* Candle 14: Bull Breakout */}
            <line stroke="#089981" strokeWidth="1.2" x1="252" x2="252" y1="58" y2="105" />
            <rect fill="#089981" height="30" rx="0.5" width="10" x="247" y="65" />

            {/* Candle 15: Minor Bear Rest */}
            <line stroke="#f23645" strokeWidth="1.2" x1="270" x2="270" y1="62" y2="108" />
            <rect fill="#f23645" height="16" rx="0.5" width="10" x="265" y="70" />

            {/* Candle 16: Bull Rally to 65,100 */}
            <line stroke="#089981" strokeWidth="1.2" x1="288" x2="288" y1="35" y2="88" />
            <rect fill="#089981" height="36" rx="0.5" width="10" x="283" y="42" />

            {/* Candle 17 (Current Live Candle): Active Bullish */}
            <line stroke="#089981" strokeWidth="1.2" x1="306" x2="306" y1="46" y2="98" />
            <rect className="animate-pulse" fill="#089981" height="28" rx="0.5" width="10" x="301" y="58" />

            {/* Active Price Crosshair Dashed Line Locked at 64,280.50 (Y = 86px) */}
            <line opacity="0.85" stroke="#2962ff" strokeDasharray="4,4" strokeWidth="1" x1="0" x2="330" y1="86" y2="86" />
            <circle cx="306" cy="86" fill="#2962ff" r="3" />
          </svg>

          {/* Right Vertical Y-Axis Container */}
          <div className="absolute right-0 top-0 bottom-0 w-[60px] bg-surface-container border-l border-surface-container-high/40 flex flex-col justify-between py-1 text-right pr-1.5 pointer-events-none">
            <span className="font-mono text-[10px] text-outline">$66,000</span>
            <span className="font-mono text-[10px] text-outline">$65,000</span>

            {/* Current Price Badge Pill Locked on Y-Axis */}
            <div className="absolute right-0 top-[72px] bg-primary-container text-on-primary-container px-1.5 py-0.5 rounded-l shadow-[0_2px_8px_rgba(41,98,255,0.6)] flex items-center justify-center">
              <span className="font-mono text-[11px] font-bold tracking-tight">
                64,280.5
              </span>
            </div>

            <span className="font-mono text-[10px] text-outline">$64,000</span>
            <span className="font-mono text-[10px] text-outline">$63,000</span>
            <span className="font-mono text-[10px] text-outline">$62,000</span>
            <span className="font-mono text-[10px] text-outline">$61,000</span>
          </div>

          {/* Scrub Floating Tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:left-28 sm:translate-x-0 top-3 px-2 py-1 rounded bg-surface-container-highest/90 backdrop-blur-md shadow-md flex items-center gap-2 pointer-events-none border border-surface-container-high/40">
            <div className="flex items-center gap-1">
              <span className="font-body-sm text-[10px] text-outline">O</span>
              <span className="font-mono text-[10px] text-secondary">
                {currentHoveredCandle.open.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-body-sm text-[10px] text-outline">H</span>
              <span className="font-mono text-[10px] text-secondary">
                {currentHoveredCandle.high.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-body-sm text-[10px] text-outline">L</span>
              <span className="font-mono text-[10px] text-error">
                {currentHoveredCandle.low.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-body-sm text-[10px] text-outline">C</span>
              <span className="font-mono text-[10px] text-secondary">
                {currentHoveredCandle.close.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Time X-Axis Strip */}
        <div className="w-full h-5 bg-surface-container flex items-center justify-between px-3 pr-16 text-outline font-mono text-[10px] border-t border-surface-container-high/40">
          <span>04 Oct</span>
          <span>11 Oct</span>
          <span>18 Oct</span>
          <span>25 Oct</span>
          <span className="text-primary font-medium">Today</span>
        </div>
      </div>

      {/* Sub-Chart Panel 1: Volume Density Histogram */}
      <div className="relative w-full bg-surface-container-low px-margin py-1.5 shadow-sm mt-1 border-t border-surface-container-high/30">
        <div className="flex items-center justify-between mb-1">
          <span className="font-body-sm text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">
            Vol (SMA 9) <span className="font-mono text-secondary text-[11px]">42.84K BTC</span>
          </span>
          <span className="font-mono text-[10px] text-outline">USDT 2.75B</span>
        </div>

        <div className="relative w-full h-11">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 360 44" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#089981" height="20" opacity="0.6" rx="0.5" width="8" x="12" y="24" />
            <rect fill="#089981" height="16" opacity="0.6" rx="0.5" width="8" x="30" y="28" />
            <rect fill="#f23645" height="24" opacity="0.6" rx="0.5" width="8" x="48" y="20" />
            <rect fill="#f23645" height="28" opacity="0.6" rx="0.5" width="8" x="66" y="16" />
            <rect fill="#089981" height="22" opacity="0.6" rx="0.5" width="8" x="84" y="22" />
            <rect fill="#089981" height="36" opacity="0.85" rx="0.5" width="8" x="102" y="8" />
            <rect fill="#089981" height="26" opacity="0.6" rx="0.5" width="8" x="120" y="18" />
            <rect fill="#f23645" height="12" opacity="0.6" rx="0.5" width="8" x="138" y="32" />
            <rect fill="#f23645" height="18" opacity="0.6" rx="0.5" width="8" x="156" y="26" />
            <rect fill="#089981" height="34" opacity="0.85" rx="0.5" width="8" x="174" y="10" />
            <rect fill="#089981" height="30" opacity="0.75" rx="0.5" width="8" x="192" y="14" />
            <rect fill="#f23645" height="22" opacity="0.6" rx="0.5" width="8" x="210" y="22" />
            <rect fill="#089981" height="18" opacity="0.6" rx="0.5" width="8" x="228" y="26" />
            <rect fill="#089981" height="38" opacity="0.9" rx="0.5" width="8" x="246" y="6" />
            <rect fill="#f23645" height="24" opacity="0.6" rx="0.5" width="8" x="264" y="20" />
            <rect fill="#089981" height="40" opacity="1" rx="0.5" width="8" x="282" y="4" />
            <rect fill="#089981" height="32" opacity="0.8" rx="0.5" width="8" x="300" y="12" />
            <path d="M 0,28 C 60,25 120,18 180,20 C 240,15 300,12 360,10" fill="none" opacity="0.75" stroke="#ffb703" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* Sub-Chart Panel 2: RSI Oscillator Panel */}
      <div className="relative w-full bg-surface-container-low px-margin py-2 shadow-sm mt-1 border-t border-surface-container-high/30">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-body-sm text-[11px] text-on-surface-variant font-medium">
              RSI (14, Close)
            </span>
            <span className="font-mono text-[11px] font-bold text-[#a855f7]">58.40</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-outline">
            <span>OB: 70</span>
            <span>OS: 30</span>
          </div>
        </div>

        <div className="relative w-full h-16">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 360 64" xmlns="http://www.w3.org/2000/svg">
            <line opacity="0.4" stroke="#f23645" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="360" y1="18" y2="18" />
            <line opacity="0.4" stroke="#434656" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="360" y1="32" y2="32" />
            <line opacity="0.4" stroke="#089981" strokeDasharray="3,3" strokeWidth="0.75" x1="0" x2="360" y1="46" y2="46" />
            <rect fill="#a855f7" height="28" opacity="0.05" width="360" x="0" y="18" />
            <path d="M 0,48 C 30,52 60,42 90,38 C 120,34 150,44 180,30 C 210,22 240,28 270,19 C 300,16 330,22 360,26" fill="none" stroke="#a855f7" strokeLinecap="round" strokeWidth="1.8" />
            <circle cx="360" cy="26" fill="#a855f7" r="3" />
          </svg>
          <div className="absolute right-0 top-5 transform -translate-y-1/2 bg-[#a855f7]/20 text-[#a855f7] px-1 py-0.2 rounded text-[9px] font-mono">
            58.4
          </div>
        </div>
      </div>

      {/* Market Order Flow Micro-Ticker Summary */}
      <div className="mx-margin mt-space-md p-space-sm rounded-xl bg-surface-container flex items-center justify-between shadow-sm border border-surface-container-high/40">
        <div className="flex items-center gap-gutter">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px]">water_full</span>
          </div>
          <div className="flex flex-col">
            <span className="font-body-sm text-[11px] text-outline">Order Book Depth</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-secondary font-medium">Bids 61%</span>
              <div className="w-12 h-1.5 bg-surface-bright rounded-full overflow-hidden flex">
                <div className="bg-secondary h-full w-[61%]" />
                <div className="bg-tertiary-container h-full w-[39%]" />
              </div>
              <span className="font-mono text-[11px] text-tertiary font-medium">39% Asks</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-right">
          <span className="font-body-sm text-[11px] text-outline">Estimated Funding</span>
          <span className="font-mono text-[11px] text-on-surface font-medium">+0.0100% (4h)</span>
        </div>
      </div>

      {/* Bottom Floating Quick Execution Module */}
      <div className="sticky bottom-14 mt-space-md px-margin py-space-sm bg-surface-container-lowest/95 backdrop-blur-xl rounded-t-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.6)] flex flex-col gap-space-sm z-30 border-t border-surface-container-high/40">
        {/* Lot Size Selector Strip */}
        <div className="flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-1">
            <span className="font-body-sm text-[11px] text-outline">Size:</span>
            {lotSizes.map((size) => {
              const isSelected = selectedLotSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedLotSize(size)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                      : 'bg-surface-container-high text-outline hover:text-on-surface'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsLeverageMenuOpen(!isLeverageMenuOpen)}
              className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[11px] flex items-center gap-0.5 cursor-pointer hover:bg-surface-container-high"
            >
              <span>Leverage:</span>
              <span className="text-primary font-bold">{selectedLeverage}</span>
              <span className="material-symbols-outlined text-[13px]">expand_more</span>
            </button>

            {isLeverageMenuOpen && (
              <div className="absolute right-0 bottom-full mb-1.5 w-24 bg-surface-container rounded-lg border border-surface-container-high shadow-xl z-40 p-1">
                {leverages.map((lev) => (
                  <button
                    key={lev}
                    onClick={() => {
                      setSelectedLeverage(lev);
                      setIsLeverageMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded text-xs font-mono ${
                      selectedLeverage === lev ? 'bg-primary-container text-white font-bold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {lev}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dual Action Quick Trade Triggers */}
        <div className="grid grid-cols-2 gap-gutter">
          {/* Sell / Short Trigger */}
          <button
            onClick={() => handleTrade('SELL')}
            className="group relative overflow-hidden py-3 px-space-sm rounded-xl bg-tertiary-container text-on-tertiary-container shadow-md active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:brightness-110"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] leading-none group-hover:-translate-y-0.5 transition-transform">
                trending_down
              </span>
              <span className="font-headline-md text-headline-md font-bold leading-tight">
                SELL
              </span>
            </div>
            <span className="font-mono text-label-data-md font-bold tracking-tight text-white/95">
              64,275.00
            </span>
            <span className="font-body-sm text-[9px] uppercase tracking-wider text-white/70">
              Bid Volume 18.4 BTC
            </span>
          </button>

          {/* Buy / Long Trigger */}
          <button
            onClick={() => handleTrade('BUY')}
            className="group relative overflow-hidden py-3 px-space-sm rounded-xl bg-secondary-container text-on-secondary-container shadow-md active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:brightness-110"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] leading-none group-hover:-translate-y-0.5 transition-transform">
                trending_up
              </span>
              <span className="font-headline-md text-headline-md font-bold leading-tight text-white">
                BUY
              </span>
            </div>
            <span className="font-mono text-label-data-md font-bold tracking-tight text-white">
              64,285.00
            </span>
            <span className="font-body-sm text-[9px] uppercase tracking-wider text-white/80">
              Ask Volume 24.1 BTC
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
