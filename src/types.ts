export type TabType = 'watchlist' | 'chart' | 'explore' | 'ideas' | 'menu';

export type AssetCategory = 'all' | 'stock' | 'crypto' | 'forex' | 'index' | 'futures';

export interface WatchlistItem {
  symbol: string;
  name: string;
  exchange: string;
  category: AssetCategory;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  high24h: number;
  low24h: number;
  marketCap?: string;
  peRatio?: number;
  divYield?: string;
  isBullish: boolean;
  avatarText?: string;
  icon?: string;
  sparkline: number[];
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isBullish: boolean;
}

export interface SectorItem {
  id: string;
  name: string;
  changePercent: number;
  ticker: string;
  weight: number; // for grid spanning
  colSpan: string;
  rowSpan: string;
  bgColor: string;
  textColor: string;
  isBullish: boolean;
}

export interface MoverItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  sparkline: number[];
}

export interface EconomicEvent {
  id: string;
  currency: string;
  title: string;
  forecast: string;
  prior: string;
  timeRemaining: string;
  impactLevel: 1 | 2 | 3;
}

export interface ExecutedOrder {
  id: string;
  symbol: string;
  type: 'Market' | 'Limit' | 'Stop';
  action: 'BUY' | 'SELL';
  shares: number;
  price: number;
  timestamp: string;
  totalCost: number;
  status: 'Filled' | 'Pending';
}
