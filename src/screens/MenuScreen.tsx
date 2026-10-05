import React from 'react';
import { ASSET_LOGOS } from '../data/mockData';
import { ExecutedOrder } from '../types';

interface MenuScreenProps {
  orders: ExecutedOrder[];
  isFramedView: boolean;
  onToggleFramedView: () => void;
  onClearOrders: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  orders,
  isFramedView,
  onToggleFramedView,
  onClearOrders,
}) => {
  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-4xl mx-auto px-margin pt-3">
      {/* Account Profile Card */}
      <div className="bg-surface-container rounded-2xl p-4 border border-surface-container-high/50 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container"
            src={ASSET_LOGOS.profile}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md font-semibold text-on-surface text-base">
                waikunkoo96
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-secondary-container/20 text-secondary">
                PRO TIER 1
              </span>
            </div>
            <p className="text-xs text-outline font-mono">ID: AIS-463166773700 • Verified</p>
          </div>
        </div>

        <button
          onClick={() => alert('Account Settings & API Keys')}
          className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-outline hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>

      {/* Portfolio Overview Widget */}
      <div className="bg-surface-container rounded-2xl p-4 border border-surface-container-high/50 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs text-outline">
          <span>Simulated Paper Portfolio</span>
          <span className="font-mono text-secondary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Live Margin
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold font-mono text-on-surface">$124,500.00</span>
            <div className="flex items-center gap-1.5 text-xs text-secondary font-mono mt-0.5">
              <span>+$3,412.50</span>
              <span>(+2.82% Today)</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-outline block">Buying Power</span>
            <span className="text-sm font-bold font-mono text-primary">$2,490,000.00 (20x)</span>
          </div>
        </div>
      </div>

      {/* Executed Orders History */}
      <div className="bg-surface-container rounded-2xl p-4 border border-surface-container-high/50 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">history</span>
            <h3 className="font-semibold text-on-surface text-sm">Recent Order Executions</h3>
          </div>
          {orders.length > 0 && (
            <button
              onClick={onClearOrders}
              className="text-[11px] text-outline hover:text-on-surface font-mono"
            >
              Clear Log
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-6 text-xs text-outline space-y-1">
            <span className="material-symbols-outlined text-3xl opacity-40">receipt_long</span>
            <p>No trade executions yet in this session.</p>
            <p className="text-[11px] text-on-surface-variant">
              Tap BUY or SELL on any Chart or Symbol Details screen to execute simulated instant orders!
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/30"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      order.action === 'BUY'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-tertiary-container text-on-tertiary-container'
                    }`}
                  >
                    {order.action}
                  </span>
                  <div>
                    <span className="font-mono font-bold text-xs text-on-surface">
                      {order.symbol}
                    </span>
                    <span className="text-[10px] text-outline block">
                      {order.shares} shares @ ${order.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-xs text-on-surface">
                    ${order.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-secondary font-mono block">
                    {order.status} • {order.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terminal Settings & Display Toggles */}
      <div className="bg-surface-container rounded-2xl p-4 border border-surface-container-high/50 shadow-md space-y-3">
        <h3 className="font-semibold text-on-surface text-sm">Terminal Preferences</h3>

        <div className="space-y-2">
          {/* Mobile frame vs Full-width container toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-primary">smartphone</span>
              <div>
                <span className="text-xs font-semibold text-on-surface block">
                  Mobile Device Frame Mode
                </span>
                <span className="text-[11px] text-outline">
                  Emulate compact mobile terminal viewport on desktop
                </span>
              </div>
            </div>
            <button
              onClick={onToggleFramedView}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isFramedView ? 'bg-primary-container' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  isFramedView ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-secondary">flash_on</span>
              <div>
                <span className="text-xs font-semibold text-on-surface block">
                  Ultra-Low Latency Mode
                </span>
                <span className="text-[11px] text-outline">Direct memory execution feed (0ms)</span>
              </div>
            </div>
            <span className="text-xs font-mono text-secondary font-bold">ACTIVE</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-outline">dark_mode</span>
              <div>
                <span className="text-xs font-semibold text-on-surface block">Theme</span>
                <span className="text-[11px] text-outline">Obsidian Market Terminal Dark</span>
              </div>
            </div>
            <span className="text-xs font-mono text-outline font-medium">Default</span>
          </div>
        </div>
      </div>
    </div>
  );
};
