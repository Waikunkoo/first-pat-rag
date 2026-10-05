import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol?: (symbol: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: 'a1',
      title: 'NVDA Resistance Breach',
      desc: 'NVIDIA crossed above $875.00 (+3.81%). Volume 14% higher than 10-day avg.',
      time: '3m ago',
      type: 'price',
      symbol: 'NVDA',
      isBullish: true,
    },
    {
      id: 'a2',
      title: 'Economic Release in 2h',
      desc: 'US Non-Farm Payrolls (NFP) expected at 180K (Prior 175K). Volatility expected.',
      time: '18m ago',
      type: 'macro',
      isBullish: null,
    },
    {
      id: 'a3',
      title: 'BTC/USD Liquidity Sweep',
      desc: 'Bitcoin tested 24h high of $65,100 with $28.4B 24h spot perpetual turnover.',
      time: '45m ago',
      type: 'price',
      symbol: 'BTC/USD',
      isBullish: true,
    },
    {
      id: 'a4',
      title: 'SMCI Unusual Volume Spike',
      desc: 'Super Micro Computer surging +11.8% to $894.20 on high call option volume.',
      time: '1h ago',
      type: 'spike',
      symbol: 'SMCI',
      isBullish: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-md">
      <div
        className="w-full max-w-md bg-surface-container rounded-2xl border border-surface-container-high shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-container-high/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
            <span className="font-headline-md font-semibold text-on-surface text-[15px]">Market Alerts & Feed</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto no-scrollbar p-3 space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (alert.symbol && onSelectSymbol) {
                  onSelectSymbol(alert.symbol);
                  onClose();
                }
              }}
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-high/40"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-title-sm text-[13px] font-semibold text-on-surface flex items-center gap-1.5">
                  {alert.symbol && (
                    <span className="font-mono text-primary font-bold text-xs bg-surface-container px-1.5 py-0.5 rounded">
                      {alert.symbol}
                    </span>
                  )}
                  {alert.title}
                </span>
                <span className="text-[10px] text-outline font-mono">{alert.time}</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">{alert.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-surface-container-lowest/80 border-t border-surface-container-high/40 text-center">
          <button
            onClick={onClose}
            className="text-xs text-primary font-semibold hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
