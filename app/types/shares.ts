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

export interface StockDataByPeriodItem {
  close: number | unknown;
  timestamp: number;
  high: number | unknown;
  low: number | unknown;
  open: number | unknown;
  gainLossValue?: number | undefined;
  gainLossPercentage?: number | undefined;
}

export interface StockDataByPeriodItems extends Array<StockDataByPeriodItem> {}

export interface TotalSharesItem {
  code: string;
  originalCostPrice: number;
  totalShares: number;
  account: string;
  purchaseDate: string;
  currency: string;
  exchangeRate: number | undefined;
  purchaseExchangeRate: number;
}

export interface TotalShareItemsByCode extends Array<TotalSharesItem> {}
export interface TotalShareItemsAll {
  [key: string]: TotalShareItemsByCode;
}

export interface TotalShareItemsByCodeFromAPI
  extends Array<
    Pick<
      TotalSharesItem,
      | "code"
      | "originalCostPrice"
      | "totalShares"
      | "account"
      | "purchaseDate"
      | "currency"
      | "purchaseExchangeRate"
    >
  > {}

// export interface StockInfoByPeriod {
//   timestamp: number;
//   close: number;
//   open: number;
//   high: number;
//   low: number;
//   gainLossValue: number | undefined;
//   gainLossPercentage: number | undefined;
// }

export interface StockInfoByPeriodFromAPI {
  timestamp: number;
  close: number;
  open: number;
  high: number;
  low: number;
}

export interface ExchangeRate {
  base_code: string;
  documentation: string;
  rates: object;
}

export interface LastDayHighAndDayLow {
  dayHigh: number;
  dayLow: number;
}
