/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, WatchlistItem, ExecutedOrder } from './types';
import { INITIAL_WATCHLIST } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { WatchlistScreen } from './screens/WatchlistScreen';
import { ChartScreen } from './screens/ChartScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { SymbolDetailScreen } from './screens/SymbolDetailScreen';
import { IdeasScreen } from './screens/IdeasScreen';
import { MenuScreen } from './screens/MenuScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('watchlist');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(INITIAL_WATCHLIST);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NVDA');
  const [isViewingDetail, setIsViewingDetail] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['NVDA', 'BTC/USD', 'AAPL']));
  const [orders, setOrders] = useState<ExecutedOrder[]>([]);
  const [isFramedView, setIsFramedView] = useState<boolean>(false);

  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    setIsViewingDetail(true);
  };

  const handleBackFromDetail = () => {
    setIsViewingDetail(false);
  };

  const handleToggleFavorite = (symbol: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) {
        next.delete(symbol);
      } else {
        next.add(symbol);
      }
      return next;
    });
  };

  const handleExecuteOrder = (orderData: {
    symbol: string;
    action: 'BUY' | 'SELL';
    price: number;
    shares?: number;
    size?: number;
    type?: 'Market' | 'Limit' | 'Stop';
  }) => {
    const qty = orderData.shares ?? orderData.size ?? 1;
    const newOrder: ExecutedOrder = {
      id: 'ord-' + Date.now(),
      symbol: orderData.symbol,
      type: orderData.type ?? 'Market',
      action: orderData.action,
      shares: qty,
      price: orderData.price,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      totalCost: qty * orderData.price,
      status: 'Filled',
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  // Determine header title
  const getHeaderTitle = () => {
    if (isViewingDetail) return 'Symbol Details';
    switch (activeTab) {
      case 'watchlist':
        return 'Watchlist';
      case 'chart':
        return 'Chart';
      case 'explore':
        return 'Explore';
      case 'ideas':
        return 'Ideas';
      case 'menu':
        return 'Menu';
      default:
        return 'Watchlist';
    }
  };

  const currentItem = watchlist.find((i) => i.symbol === selectedSymbol);

  return (
    <div
      className={`min-h-screen bg-surface text-on-surface flex flex-col font-body-md ${
        isFramedView
          ? 'items-center justify-center p-2 sm:p-6 bg-[#0a0d14]'
          : ''
      }`}
    >
      {/* Optional Desktop Frame Wrapper */}
      <div
        className={`w-full min-h-screen flex flex-col relative transition-all ${
          isFramedView
            ? 'max-w-[420px] max-h-[920px] rounded-3xl overflow-hidden border-2 border-surface-container-high shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-surface'
            : ''
        }`}
      >
        {/* Pinned Top Navigation Header */}
        <Header
          title={getHeaderTitle()}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          showBackButton={isViewingDetail}
          onBack={handleBackFromDetail}
          isFavorite={favorites.has(selectedSymbol)}
          onToggleFavorite={() => handleToggleFavorite(selectedSymbol)}
          onProfileClick={() => {
            setIsViewingDetail(false);
            setActiveTab('menu');
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative w-full pt-14 pb-20 bg-surface overflow-x-hidden">
          {isViewingDetail ? (
            <SymbolDetailScreen
              symbol={selectedSymbol}
              item={currentItem}
              onBack={handleBackFromDetail}
              onExecuteOrder={handleExecuteOrder}
            />
          ) : (
            <>
              {activeTab === 'watchlist' && (
                <WatchlistScreen
                  watchlist={watchlist}
                  onSelectSymbol={handleSelectSymbol}
                  onNavigateToTab={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenAddSymbol={() => setIsSearchOpen(true)}
                />
              )}

              {activeTab === 'chart' && (
                <ChartScreen
                  symbol={selectedSymbol === 'NVDA' ? 'BTC/USD' : selectedSymbol}
                  onExecuteOrder={handleExecuteOrder}
                  onOpenDetails={(sym) => {
                    setSelectedSymbol(sym);
                    setIsViewingDetail(true);
                  }}
                />
              )}

              {activeTab === 'explore' && (
                <ExploreScreen
                  onSelectSymbol={handleSelectSymbol}
                />
              )}

              {activeTab === 'ideas' && (
                <IdeasScreen
                  onSelectSymbol={handleSelectSymbol}
                />
              )}

              {activeTab === 'menu' && (
                <MenuScreen
                  orders={orders}
                  isFramedView={isFramedView}
                  onToggleFramedView={() => setIsFramedView(!isFramedView)}
                  onClearOrders={() => setOrders([])}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation Dock */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setIsViewingDetail(false);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Global Interactive Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        watchlist={watchlist}
        onSelectSymbol={handleSelectSymbol}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />
    </div>
  );
}
