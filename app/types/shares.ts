export interface StockData {
  country: string;
  currentPrice: number;
  currency: string;
  dayHigh: number;
  dayLow: number;
  logo_url: string;
  longName: string;
  exchange: string;
  fiftyTwoWeekChange: string;
}

export interface StockDataByPeriodFromAPIItem {
  "Adj Close": number;
  Close: number;
  Date: number;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
  gainLossValue: number;
  gainLossPercentage: number;
}

export interface StockDataByPeriodItem {
  "Adj Close": number;
  Close: number;
  Date: number;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
  gainLossValue: number;
  gainLossPercentage: number;
}

export interface StockDataByPeriodItems extends Array<StockDataByPeriodItem> {}
export interface StockDataByPeriodFromAPIItems
  extends Array<StockDataByPeriodFromAPIItem> {}

export interface TotalSharesItem {
  code: string;
  originalCostPrice: number;
  totalShares: number;
  account: string;
  purchaseDate: string;
  currency: string;
  exchangeRate: number;
  purchaseExchangeRate: number;
}

export interface TotalShareItemsByCode extends Array<TotalSharesItem> {}
export interface TotalShareItemsAll {
  [key: string]: TotalShareItemsByCode;
}

export interface TotalSharesItemPre {
  code: string;
  originalCostPrice: number;
  totalShares: number;
  account: string;
  purchaseDate: string;
  currency: string;
  purchaseExchangeRate: number;
}

export interface TotalShareItemsByCodePre extends Array<TotalSharesItemPre> {}
export interface ExchangeRate {
  base_code: string;
  documentation: string;
  rates: object;
}

export interface LastDayHighAndDayLow {
  dayHigh: number;
  dayLow: number;
}
