import React, { useState } from 'react';
import { ASSET_LOGOS } from '../data/mockData';
import { WatchlistItem } from '../types';

interface SymbolDetailScreenProps {
  symbol: string;
  item?: WatchlistItem;
  onBack: () => void;
  onExecuteOrder?: (order: {
    symbol: string;
    action: 'BUY' | 'SELL';
    price: number;
    shares: number;
    type: 'Market' | 'Limit' | 'Stop';
  }) => void;
}

export const SymbolDetailScreen: React.FC<SymbolDetailScreenProps> = ({
  symbol = 'NVDA',
  item,
  onBack,
  onExecuteOrder,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [shares, setShares] = useState(10);
  const [takeProfit, setTakeProfit] = useState('962.80');
  const [stopLoss, setStopLoss] = useState('831.50');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const price = item?.price ?? (symbol === 'BTC/USD' ? 64280.50 : 875.28);
  const name = item?.name ?? (symbol === 'BTC/USD' ? 'Bitcoin' : 'NVIDIA Corporation');
  const exchange = item?.exchange ?? (symbol === 'BTC/USD' ? 'SPOT' : 'NASDAQ');
  const changeVal = item?.change ?? 32.14;
  const changePct = item?.changePercent ?? 3.81;
  const isBull = changeVal >= 0;

  const estimatedCost = (shares * price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleAdjustQty = (delta: number) => {
    setShares((prev) => Math.max(1, prev + delta));
  };

  const handleTriggerOrder = (action: 'BUY' | 'SELL') => {
    const executedPrice = action === 'BUY' ? price + 0.07 : price - 0.08;
    if (onExecuteOrder) {
      onExecuteOrder({
        symbol,
        action,
        price: executedPrice,
        shares,
        type: orderType === 'market' ? 'Market' : orderType === 'limit' ? 'Limit' : 'Stop',
      });
    }

    setToastMessage(`${action} ${shares} ${symbol} at Market executed!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const timeframes = ['1D', '5D', '1M', '1Y', '5Y', 'ALL'];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 p-space-sm rounded-lg bg-surface-bright text-on-surface flex items-center justify-between gap-3 shadow-2xl border border-secondary-container animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              check_circle
            </span>
            <span className="font-mono text-label-data-sm text-xs font-semibold">
              {toastMessage}
            </span>
          </div>
          <span className="font-mono text-[10px] text-outline">Routed via ARCA</span>
        </div>
      )}

      {/* Asset Identity & Realtime Ribbon */}
      <section className="px-margin pt-space-md pb-space-sm bg-surface-container-low flex flex-col gap-space-xs border-b border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-mono text-[12px] px-space-xs py-0.5 rounded bg-surface-container-highest text-primary font-bold">
              {symbol}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium text-xs">
              {name}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="font-mono text-[11px] text-outline">{exchange}</span>
          </div>
          <div className="flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-secondary-container/20">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-label-data-sm text-secondary font-medium text-[11px]">
              LIVE
            </span>
          </div>
        </div>

        {/* Main Price Hero & Micro Flash */}
        <div className="flex items-baseline justify-between mt-space-xs">
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight font-mono text-[24px]">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <div
              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
                isBull
                  ? 'bg-secondary-container/30 text-secondary'
                  : 'bg-tertiary-container/30 text-tertiary'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isBull ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
              <span className="font-mono text-label-data-md font-semibold text-xs">
                {isBull ? `+$${changeVal.toFixed(2)}` : `-$${Math.abs(changeVal).toFixed(2)}`} (
                {isBull ? `+${changePct}%` : `${changePct}%`})
              </span>
            </div>
          </div>
          <button
            onClick={() => alert(`Price alert set for ${symbol}`)}
            className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Price Alert"
          >
            <span className="material-symbols-outlined text-[18px]">add_alert</span>
          </button>
        </div>

        {/* After Hours Ticker */}
        <div className="flex items-center gap-space-xs text-on-surface-variant pt-0.5 text-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-outline">
            Post-Market:
          </span>
          <span className="font-mono text-[11px] text-on-surface font-medium">$878.10</span>
          <span className="font-mono text-[11px] text-secondary">+$2.82 (+0.32%)</span>
          <span className="material-symbols-outlined text-[13px] text-outline ml-auto">
            schedule
          </span>
        </div>
      </section>

      {/* Interactive Timeframe & Mini Sparkline Bar */}
      <div className="px-margin py-space-sm bg-surface-container flex items-center justify-between gap-gutter overflow-x-auto no-scrollbar border-b border-surface-container-high/30">
        <div className="flex items-center gap-space-xs">
          {timeframes.map((tf) => {
            const isActive = selectedTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                {tf}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1 text-secondary font-mono text-[11px] pl-2">
          <svg className="w-16 h-5" fill="none" viewBox="0 0 64 20">
            <path
              d="M1 17L12 14L23 16L34 8L45 10L56 3L63 2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </div>
      </div>

      {/* Key Statistics Grid (2x3 Bento) */}
      <section className="p-margin flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-title-sm text-title-sm text-on-surface font-semibold text-sm">
            Key Market Metrics
          </h2>
          <span className="font-mono text-[11px] text-outline">Real-time Feed</span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          {/* Day's Range Card with Dynamic Progress Track */}
          <div className="col-span-2 p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs shadow-sm border border-surface-container-high/40">
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-xs">
              <span>Day's Range</span>
              <span className="font-mono text-[11px] text-secondary font-medium">Near High</span>
            </div>
            <div className="flex justify-between items-baseline font-mono text-label-data-md font-semibold text-on-surface text-xs">
              <span>$842.10</span>
              <span className="text-secondary">$875.28</span>
              <span>$881.00</span>
            </div>
            <div className="relative w-full h-2 rounded-full bg-surface-container-highest overflow-hidden my-0.5">
              <div
                className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-tertiary via-secondary to-secondary-container"
                style={{ width: '85%' }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-on-secondary ring-2 ring-secondary"
                style={{ left: 'calc(85% - 6px)' }}
              />
            </div>
            <div className="flex justify-between text-outline font-mono text-[10px]">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* 52-Week Range Card */}
          <div className="col-span-2 p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs shadow-sm border border-surface-container-high/40">
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-xs">
              <span>52-Week Range</span>
              <span className="font-mono text-[11px] text-primary font-medium">+123.1% YoY</span>
            </div>
            <div className="flex justify-between items-baseline font-mono text-label-data-md font-semibold text-on-surface text-xs">
              <span>$392.30</span>
              <span>$974.00</span>
            </div>
            <div className="relative w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 rounded-full bg-primary-container"
                style={{ width: '82%' }}
              />
            </div>
          </div>

          {/* Market Cap */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-surface-container-high/40">
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-xs">
              <span>Market Cap</span>
              <span className="material-symbols-outlined text-[15px] text-outline">domain</span>
            </div>
            <div className="mt-space-xs">
              <p className="font-mono text-label-data-lg text-on-surface font-semibold tracking-tight text-base">
                $2.16T
              </p>
              <p className="font-mono text-[11px] text-secondary font-medium">Rank #3 Global</p>
            </div>
          </div>

          {/* P/E Ratio */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-surface-container-high/40">
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-xs">
              <span>P/E Ratio (TTM)</span>
              <span className="material-symbols-outlined text-[15px] text-outline">calculate</span>
            </div>
            <div className="mt-space-xs">
              <p className="font-mono text-label-data-lg text-on-surface font-semibold tracking-tight text-base">
                68.4
              </p>
              <p className="font-mono text-[11px] text-outline">Fwd P/E: 32.1</p>
            </div>
          </div>

          {/* Volume Metric */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-surface-container-high/40">
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-xs">
              <span>Volume</span>
              <span className="material-symbols-outlined text-[15px] text-outline">bar_chart</span>
            </div>
            <div className="mt-space-xs">
              <p className="font-mono text-label-data-lg text-on-surface font-semibold tracking-tight text-base">
                48.2M
              </p>
              <p className="font-mono text-[11px] text-secondary">Avg: 42.1M (+14%)</p>
            </div>
          </div>

          {/* Dividend Yield */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-surface-container-high/40">
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-xs">
              <span>Div Yield</span>
              <span className="material-symbols-outlined text-[15px] text-outline">payments</span>
            </div>
            <div className="mt-space-xs">
              <p className="font-mono text-label-data-lg text-on-surface font-semibold tracking-tight text-base">
                0.04%
              </p>
              <p className="font-mono text-[11px] text-outline">$0.16 / Share</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Analysis Gauge Section (TradingView Style Speedometer) */}
      <section className="px-margin py-space-sm flex flex-col gap-space-sm">
        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-secondary">speed</span>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold text-sm">
                Technical Summary
              </h3>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-bold tracking-wide">
              STRONG BUY
            </span>
          </div>

          {/* Speedometer Canvas Representation */}
          <div className="relative flex flex-col items-center justify-center pt-2 pb-1">
            <svg className="w-64 h-32" fill="none" viewBox="0 0 200 100">
              {/* Background Arc Segments */}
              {/* Strong Sell */}
              <path d="M 20 95 A 80 80 0 0 1 45 42" stroke="#da2237" strokeLinecap="round" strokeWidth="12" />
              {/* Sell */}
              <path d="M 49 38 A 80 80 0 0 1 76 21" stroke="#ffb3b0" strokeWidth="12" />
              {/* Neutral */}
              <path d="M 82 19 A 80 80 0 0 1 118 19" stroke="#8d90a2" strokeWidth="12" />
              {/* Buy */}
              <path d="M 124 21 A 80 80 0 0 1 151 38" stroke="#66dabf" strokeWidth="12" />
              {/* Strong Buy */}
              <path d="M 155 42 A 80 80 0 0 1 180 95" stroke="#20a28a" strokeLinecap="round" strokeWidth="12" />

              {/* Dynamic Pointer needle pinned to Strong Buy ~ 60 deg right */}
              <g transform="translate(100, 95) rotate(60)">
                <path d="M -3 0 L 0 -72 L 3 0 Z" fill="#dfe2f2" />
                <circle cx="0" cy="0" fill="#b6c4ff" r="6" />
                <circle cx="0" cy="0" fill="#0f131e" r="2.5" />
              </g>
            </svg>

            {/* Speedometer Indicator Labels */}
            <div className="w-full flex justify-between px-space-md font-mono text-[11px] font-semibold -mt-2">
              <span className="text-tertiary-container">SELL</span>
              <span className="text-outline">NEUTRAL</span>
              <span className="text-secondary">BUY</span>
            </div>

            <div className="flex items-center gap-space-lg mt-space-sm pt-space-xs text-center">
              <div className="flex flex-col">
                <span className="font-mono text-label-data-lg font-bold text-tertiary-container text-base">
                  1
                </span>
                <span className="font-body-sm text-[10px] text-outline">Sell</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-label-data-lg font-bold text-outline text-base">7</span>
                <span className="font-body-sm text-[10px] text-outline">Neutral</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-label-data-lg font-bold text-secondary text-base">
                  18
                </span>
                <span className="font-body-sm text-[10px] text-outline">Buy</span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Progress Bars */}
          <div className="grid grid-cols-2 gap-space-xs mt-space-sm pt-space-sm bg-surface-container rounded-lg p-space-sm">
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-on-surface-variant">Oscillators</span>
                <span className="text-secondary font-medium">Buy (2)</span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '70%' }} />
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-on-surface-variant">Moving Avg</span>
                <span className="text-secondary font-medium">Strong Buy (16)</span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analyst Ratings & Consensus Target */}
      <section className="px-margin py-space-sm flex flex-col gap-space-sm">
        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <h3 className="font-title-sm text-title-sm text-on-surface font-semibold text-sm">
              Analyst Consensus
            </h3>
            <span className="font-mono text-[11px] text-outline">54 Analysts</span>
          </div>

          <div className="flex items-center gap-space-md">
            {/* Upside Circular Highlight */}
            <div className="w-16 h-16 rounded-full bg-surface-container flex flex-col items-center justify-center shrink-0 border border-secondary-container/40">
              <span className="font-mono text-label-data-md font-bold text-secondary text-sm">
                88%
              </span>
              <span className="font-body-sm text-[10px] text-outline">Buy</span>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-baseline font-body-sm text-xs">
                <span className="text-on-surface-variant">Average Target Price</span>
                <span className="font-mono text-label-data-md font-bold text-on-surface">
                  $950.00
                </span>
              </div>
              <div className="flex justify-between items-center font-mono text-[11px]">
                <span className="text-outline">Implied Return</span>
                <span className="text-secondary font-semibold">+8.5% Upside</span>
              </div>

              {/* Target Price Band */}
              <div className="w-full h-2 rounded-full bg-surface-container-highest relative mt-1">
                <div className="absolute left-[30%] right-[15%] h-full bg-primary/40 rounded-full" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-on-surface"
                  style={{ left: '45%' }}
                  title="Current Price"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary"
                  style={{ left: '70%' }}
                  title="Average Target"
                />
              </div>

              <div className="flex justify-between text-outline font-mono text-[10px] pt-0.5">
                <span>Low: $650</span>
                <span>Median: $950</span>
                <span>High: $1,200</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Catalyst Alert Tile */}
      <section className="px-margin py-space-xs mb-space-xs">
        <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm border border-surface-container-high/40 hover:bg-surface-container transition-colors cursor-pointer">
          <img
            className="w-12 h-12 rounded-lg object-cover shrink-0"
            alt="NVIDIA Blackwell B200 Chip Architecture"
            src={ASSET_LOGOS.catalyst}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] text-primary font-medium uppercase tracking-wider">
              Catalyst Alert
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium truncate text-xs">
              Blackwell B200 Architecture shipments scheduled ahead of consensus
            </span>
          </div>
          <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline hover:text-on-surface shrink-0 ml-auto cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Slide-Up Quick Order Execution Sheet */}
      <section className="mt-space-md p-space-md bg-surface-container-low rounded-t-2xl shadow-2xl flex flex-col gap-space-md border-t border-surface-container-high/50">
        {/* Sheet Drag Handle Indicator */}
        <div className="w-10 h-1 rounded-full bg-outline-variant/60 self-center -mt-1 mb-1" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary">bolt</span>
            <h2 className="font-title-sm text-title-sm text-on-surface font-semibold text-sm">
              Quick Order Execution
            </h2>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-outline">
            <span>Instant Fill</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          </div>
        </div>

        {/* Order Type Switcher Pills */}
        <div className="grid grid-cols-3 gap-space-xs p-1 rounded-lg bg-surface-container-lowest">
          {(['market', 'limit', 'stop'] as const).map((type) => {
            const isSelected = orderType === type;
            return (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`py-1.5 rounded font-mono text-xs font-semibold capitalize transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Stepper Quantity & Dynamic Cost Calculator */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-body-sm text-on-surface-variant">Order Quantity</span>
            <span className="font-mono text-[11px] text-outline">Avail: $124,500.00</span>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded-xl bg-surface-container-lowest">
            <button
              onClick={() => handleAdjustQty(-1)}
              className="w-10 h-10 rounded-lg bg-surface-container-high active:bg-surface-bright flex items-center justify-center text-on-surface text-lg font-bold transition-transform active:scale-95 cursor-pointer"
            >
              -
            </button>
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-1">
                <input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent font-mono text-label-data-lg text-on-surface font-bold focus:outline-none text-base"
                />
                <span className="font-body-sm text-body-sm text-outline text-xs">Shares</span>
              </div>
              <span className="font-mono text-[11px] text-primary font-medium">
                Est. Cost ${estimatedCost}
              </span>
            </div>
            <button
              onClick={() => handleAdjustQty(1)}
              className="w-10 h-10 rounded-lg bg-surface-container-high active:bg-surface-bright flex items-center justify-center text-on-surface text-lg font-bold transition-transform active:scale-95 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Risk Protection: Take Profit & Stop Loss Dual Fields */}
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col gap-1">
            <div className="flex justify-between items-center font-mono text-[11px]">
              <span className="text-secondary font-medium">Take Profit</span>
              <span className="text-outline">+10%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-outline">$</span>
              <input
                type="text"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="w-full text-right bg-transparent font-mono text-label-data-md text-on-surface font-semibold focus:outline-none text-xs"
              />
            </div>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col gap-1">
            <div className="flex justify-between items-center font-mono text-[11px]">
              <span className="text-tertiary-container font-medium">Stop Loss</span>
              <span className="text-outline">-5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-outline">$</span>
              <input
                type="text"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="w-full text-right bg-transparent font-mono text-label-data-md text-on-surface font-semibold focus:outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Terminal Dual Action CTAs: High Informational Contrast */}
        <div className="grid grid-cols-2 gap-space-sm pt-space-xs pb-space-sm">
          {/* Sell / Short Button */}
          <button
            onClick={() => handleTriggerOrder('SELL')}
            className="h-14 rounded-lg bg-tertiary-container hover:brightness-110 active:brightness-125 flex flex-col items-center justify-center transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            <span className="font-body-md text-on-tertiary-container font-bold tracking-wide flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
              SELL / SHORT
            </span>
            <span className="font-mono text-[11px] text-on-tertiary-container/90 font-medium">
              ${(price - 0.08).toFixed(2)} Bid
            </span>
          </button>

          {/* Buy / Long Button */}
          <button
            onClick={() => handleTriggerOrder('BUY')}
            className="h-14 rounded-lg bg-secondary-container hover:brightness-110 active:brightness-125 flex flex-col items-center justify-center transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            <span className="font-body-md text-on-secondary-container font-bold tracking-wide flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              BUY / LONG
            </span>
            <span className="font-mono text-[11px] text-on-secondary-container/90 font-medium">
              ${(price + 0.07).toFixed(2)} Ask
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
