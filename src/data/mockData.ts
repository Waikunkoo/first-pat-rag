import { WatchlistItem, CandleData, SectorItem, MoverItem, EconomicEvent } from '../types';

export const INITIAL_WATCHLIST: WatchlistItem[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    exchange: 'NASDAQ',
    category: 'stock',
    price: 875.28,
    change: 32.14,
    changePercent: 3.81,
    volume: '42.8M',
    high24h: 881.00,
    low24h: 842.10,
    marketCap: '$2.16T',
    peRatio: 68.4,
    divYield: '0.04%',
    isBullish: true,
    avatarText: 'N',
    sparkline: [22, 25, 15, 10, 3]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    category: 'stock',
    price: 182.52,
    change: -1.20,
    changePercent: -0.65,
    volume: '54.1M',
    high24h: 184.20,
    low24h: 181.80,
    marketCap: '$2.82T',
    peRatio: 28.5,
    divYield: '0.52%',
    isBullish: false,
    icon: 'file_download',
    sparkline: [6, 4, 14, 18, 24]
  },
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    exchange: 'SPOT',
    category: 'crypto',
    price: 64280.50,
    change: 2120.00,
    changePercent: 3.41,
    volume: '$28.4B',
    high24h: 65100.00,
    low24h: 62940.00,
    marketCap: '$1.26T',
    isBullish: true,
    avatarText: '₿',
    sparkline: [25, 22, 16, 6, 2]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    category: 'stock',
    price: 175.34,
    change: 4.12,
    changePercent: 2.41,
    volume: '88.2M',
    high24h: 178.50,
    low24h: 171.20,
    marketCap: '$558B',
    peRatio: 41.2,
    isBullish: true,
    avatarText: 'T',
    sparkline: [20, 24, 18, 12, 6]
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    exchange: 'SPOT',
    category: 'crypto',
    price: 3485.10,
    change: 124.50,
    changePercent: 3.71,
    volume: '$14.1B',
    high24h: 3520.00,
    low24h: 3350.00,
    marketCap: '$418B',
    isBullish: true,
    avatarText: 'Ξ',
    sparkline: [22, 26, 14, 8, 3]
  },
  {
    symbol: 'AMD',
    name: 'Adv. Micro Dev.',
    exchange: 'NASDAQ',
    category: 'stock',
    price: 162.40,
    change: -3.80,
    changePercent: -2.29,
    volume: '31.9M',
    high24h: 167.50,
    low24h: 161.00,
    marketCap: '$262B',
    peRatio: 112.4,
    isBullish: false,
    avatarText: 'A',
    sparkline: [4, 6, 16, 20, 26]
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF',
    exchange: 'ARCA',
    category: 'index',
    price: 508.12,
    change: 2.90,
    changePercent: 0.57,
    volume: '65.4M',
    high24h: 509.30,
    low24h: 505.80,
    marketCap: '$512B',
    isBullish: true,
    avatarText: 'S',
    sparkline: [18, 20, 15, 11, 5]
  }
];

export const MARKET_RIBBON_ITEMS = [
  { symbol: 'SPX', price: '5,088.80', changePercent: '+0.58%', isBullish: true, isPulse: true },
  { symbol: 'NDX', price: '16,110.20', changePercent: '+1.14%', isBullish: true, isPulse: false },
  { symbol: 'BTCUSD', price: '$64,280', changePercent: '+3.42%', isBullish: true, isPulse: true },
  { symbol: 'EURUSD', price: '1.0842', changePercent: '-0.15%', isBullish: false, isPulse: false },
  { symbol: 'XAUUSD', price: '$2,342.10', changePercent: '+0.82%', isBullish: true, isPulse: false },
  { symbol: 'US10Y', price: '4.228%', changePercent: '-0.04%', isBullish: false, isPulse: false },
  { symbol: 'DXY', price: '104.15', changePercent: '+0.21%', isBullish: true, isPulse: false }
];

export const BTC_CANDLES_1D: CandleData[] = [
  { time: '04 Oct', open: 62400, high: 63100, low: 62100, close: 62850, volume: 22.4, isBullish: true },
  { time: '06 Oct', open: 62850, high: 63500, low: 62600, close: 63300, volume: 18.2, isBullish: true },
  { time: '08 Oct', open: 63300, high: 63450, low: 62200, close: 62550, volume: 26.5, isBullish: false },
  { time: '10 Oct', open: 62550, high: 62800, low: 61800, close: 62100, volume: 30.1, isBullish: false },
  { time: '11 Oct', open: 62100, high: 62900, low: 61600, close: 62750, volume: 24.0, isBullish: true },
  { time: '13 Oct', open: 62750, high: 63900, low: 62650, close: 63780, volume: 38.6, isBullish: true },
  { time: '15 Oct', open: 63780, high: 64200, low: 63500, close: 64100, volume: 28.2, isBullish: true },
  { time: '17 Oct', open: 64100, high: 64250, low: 63850, close: 64000, volume: 14.5, isBullish: false },
  { time: '18 Oct', open: 64000, high: 64150, low: 63400, close: 63650, volume: 20.3, isBullish: false },
  { time: '20 Oct', open: 63650, high: 64800, low: 63500, close: 64650, volume: 36.8, isBullish: true },
  { time: '22 Oct', open: 64650, high: 65150, low: 64400, close: 65050, volume: 32.5, isBullish: true },
  { time: '24 Oct', open: 65050, high: 65300, low: 64500, close: 64700, volume: 24.1, isBullish: false },
  { time: '25 Oct', open: 64700, high: 64950, low: 64200, close: 64850, volume: 20.8, isBullish: true },
  { time: '27 Oct', open: 64850, high: 65400, low: 64700, close: 65350, volume: 39.4, isBullish: true },
  { time: '29 Oct', open: 65350, high: 65450, low: 64900, close: 65100, volume: 26.2, isBullish: false },
  { time: '31 Oct', open: 65100, high: 65800, low: 64950, close: 65650, volume: 42.1, isBullish: true },
  { time: 'Today',  open: 63940, high: 65100, low: 63820, close: 64280.50, volume: 34.6, isBullish: true }
];

export const SECTOR_ITEMS: SectorItem[] = [
  {
    id: 'tech',
    name: 'Technology',
    changePercent: 2.4,
    ticker: 'XLK',
    weight: 4,
    colSpan: 'col-span-4',
    rowSpan: 'row-span-2',
    bgColor: 'bg-secondary-container',
    textColor: 'text-on-secondary-container',
    isBullish: true
  },
  {
    id: 'energy',
    name: 'Energy',
    changePercent: 1.8,
    ticker: 'XLE',
    weight: 2,
    colSpan: 'col-span-2',
    rowSpan: 'row-span-1',
    bgColor: 'bg-secondary',
    textColor: 'text-on-secondary',
    isBullish: true
  },
  {
    id: 'cyclicals',
    name: 'Cyclicals',
    changePercent: 1.2,
    ticker: 'XLY',
    weight: 2,
    colSpan: 'col-span-2',
    rowSpan: 'row-span-1',
    bgColor: 'bg-secondary-fixed-dim',
    textColor: 'text-on-secondary-fixed',
    isBullish: true
  },
  {
    id: 'financials',
    name: 'Financials',
    changePercent: -0.4,
    ticker: 'XLF',
    weight: 2,
    colSpan: 'col-span-2',
    rowSpan: 'row-span-1',
    bgColor: 'bg-tertiary-fixed-dim',
    textColor: 'text-on-tertiary-fixed-variant',
    isBullish: false
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    changePercent: -0.9,
    ticker: 'XLV',
    weight: 2,
    colSpan: 'col-span-2',
    rowSpan: 'row-span-1',
    bgColor: 'bg-tertiary',
    textColor: 'text-on-tertiary',
    isBullish: false
  },
  {
    id: 'utilities',
    name: 'Utilities',
    changePercent: -1.5,
    ticker: 'XLU',
    weight: 2,
    colSpan: 'col-span-2',
    rowSpan: 'row-span-1',
    bgColor: 'bg-tertiary-container',
    textColor: 'text-on-tertiary-container',
    isBullish: false
  }
];

export const TOP_MOVERS_GAINERS: MoverItem[] = [
  {
    symbol: 'COIN',
    name: 'Coinbase Global',
    price: 248.80,
    changePercent: 14.2,
    volume: '22.8M',
    sparkline: [20, 16, 18, 7, 2]
  },
  {
    symbol: 'SMCI',
    name: 'Super Micro Computer',
    price: 894.20,
    changePercent: 11.8,
    volume: '15.4M',
    sparkline: [22, 14, 15, 9, 3]
  },
  {
    symbol: 'RNDR',
    name: 'Render Token',
    price: 10.42,
    changePercent: 9.4,
    volume: '$310M',
    sparkline: [18, 19, 11, 13, 4]
  }
];

export const TOP_MOVERS_ACTIVE: MoverItem[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    changePercent: 3.81,
    volume: '48.2M',
    sparkline: [12, 18, 14, 8, 3]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 175.34,
    changePercent: 2.41,
    volume: '88.2M',
    sparkline: [15, 12, 16, 10, 5]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.52,
    changePercent: -0.65,
    volume: '54.1M',
    sparkline: [5, 8, 12, 16, 22]
  }
];

export const TOP_MOVERS_UNUSUAL: MoverItem[] = [
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    price: 24.15,
    changePercent: 8.6,
    volume: '3.2x avg',
    sparkline: [19, 14, 15, 8, 2]
  },
  {
    symbol: 'SOFI',
    name: 'SoFi Technologies',
    price: 7.92,
    changePercent: 5.3,
    volume: '2.8x avg',
    sparkline: [16, 12, 14, 7, 4]
  },
  {
    symbol: 'ARM',
    name: 'Arm Holdings plc',
    price: 124.60,
    changePercent: 7.9,
    volume: '2.5x avg',
    sparkline: [20, 15, 12, 6, 3]
  }
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: 'nfp',
    currency: 'USD',
    title: 'Non-Farm Payrolls (NFP)',
    forecast: '180K',
    prior: '175K',
    timeRemaining: 'In 2 hours',
    impactLevel: 3
  },
  {
    id: 'fed',
    currency: 'USD',
    title: 'Fed Interest Rate Decision',
    forecast: '5.50%',
    prior: '5.50%',
    timeRemaining: 'Wednesday',
    impactLevel: 3
  },
  {
    id: 'cpi',
    currency: 'USD',
    title: 'Consumer Price Index (MoM)',
    forecast: '0.3%',
    prior: '0.4%',
    timeRemaining: 'Friday',
    impactLevel: 2
  }
];

export const COMMUNITY_IDEAS = [
  {
    id: 'idea-1',
    author: 'QuantumWaveTrader',
    authorRole: 'Pro Analyst',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    title: 'BTC/USD: Ascending Channel Breakout Pattern Testing $68K Resistance',
    symbol: 'BTC/USD',
    sentiment: 'Bullish',
    timeAgo: '42m ago',
    likes: 342,
    comments: 58,
    analysis: 'Clean bounce off the 50 EMA on the 4H chart with rising volume. RSI sitting at 58 shows healthy room before overbought conditions.'
  },
  {
    id: 'idea-2',
    author: 'SiliconAlpha',
    authorRole: 'Market Maker',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    title: 'NVDA: Blackwell Momentum with Target Projection of $950 into Q4',
    symbol: 'NVDA',
    sentiment: 'Bullish',
    timeAgo: '2h ago',
    likes: 819,
    comments: 114,
    analysis: 'Consolidation near $875 is setting up the next leg toward the consensus $950 target. Supply constraints indicate sustained pricing power.'
  },
  {
    id: 'idea-3',
    author: 'MacroSentinel',
    authorRole: 'Macro Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    title: 'S&P 500 (SPY): Fed Policy Dilemma & Key Support Levels at $505',
    symbol: 'SPY',
    sentiment: 'Neutral',
    timeAgo: '3h ago',
    likes: 215,
    comments: 42,
    analysis: 'Markets pricing in rate cut delays. Look for high-beta divergence before committing to fresh index swings.'
  }
];

export const ASSET_LOGOS: Record<string, string> = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1XLkE7atSpUmfqdzGLp6AsZPorsInHnmTCXZJEd1PEaYYJuyt7S66UVaJEfYLPI7Hgn4kPGfPun0Jwzrjjsc_45_TT8jZie-33NeO1DiYX9dXPgOWJIB6Ey_S12u_yAuQEwYk9Ok0tkqr3YSJ07YouCF6nXRhZjA_0Yzlp4wIe8J74QGLsiYkgjf6u51HhszJap1uPmKWa8Qh31uyfhXb45crMmnH4HvHgLCB1nUn3kKgKU0tnUf_8J',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvqQm2V2vLQyTsqYHxH7Ifs3gF1ZfvFlvB15DBNAxpmGHdq4OuA6M4qchu5fgbpm4Uc7RRTJdbj_2HXuZBtXl3GsRCJ7-qmc0xe-wYcU9N3qr7zB6prHQ3pWb-EbkWQuP4CuWBtyld14yp_skXLIfioN-Vk2n62vO6Dq43GHAQk_LSGWEjRvU0VrNT0zq364_Yo0SaY4hCXd9dQOnKqqRIZEX2glqW1E7MoY5U9SbRmW2Gkr_bHDU',
  catalyst: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZK0RipEImqZ5Kds8ZR5irl7sbZgUFSw_O2Ig-Xjoyq1Cei4fd57b4DgmfJlKybE0Gv0NWhk4X-rk1BxPqdXamB1d0mHSPyqOPLs9LqcScTNpN1dUp9WFnJmp9QqI_a9S2TFCvzgv2KetCOXC12CmB6I73ZBrwXcEOirW3_mldqpk1w4NcKhDYfJxdDQSirEDSP_FcuC-Aj3xH63PWxWkGA2vAmCueoF10PdI603_rdRnzriwEinc'
};
