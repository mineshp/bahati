export interface SharesToWatch {
  symbol?: string;
  currency?: string;
  shareCode?: string;
  watchlist?: string;
  created?: number;
  regularMarketOpen?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  fiftyTwoWeekRange?: string;
}

export interface WatchlistData {
  [key: string]: SharesToWatch[];
}

export interface WatchlistTrackerData {
  symbol: string;
  currency: string;
  regularMarketOpen: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  fiftyTwoWeekRange: string;
}

export interface WatchlistTrackerDataItems
  extends Array<WatchlistTrackerData> {}
