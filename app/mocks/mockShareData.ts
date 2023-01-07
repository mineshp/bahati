import type { StockData } from "../types/shares";

const mockShareHeaderData: { [key: string]: StockData } = {
  TSLA: {
    country: "United States",
    currentPrice: 276.83,
    currency: "USD",
    dayHigh: 282.35,
    dayLow: 274.28,
    logo_url: "https://logo.clearbit.com/tesla.com",
    longName: "Tesla",
    exchange: "NASDAQ",
  },
  NFLX: {
    country: "United States",
    currentPrice: 233.03,
    currency: "USD",
    dayHigh: 233.88,
    dayLow: 225.05,
    logo_url: "https://logo.clearbit.com/netflix.com",
    longName: "Netflix",
    exchange: "NASDAQ",
  },
  SPCE: {
    country: "United States",
    currentPrice: 5.85,
    currency: "USD",
    dayHigh: 5.95,
    dayLow: 5.63,
    logo_url: "https://logo.clearbit.com/virgingalactic.com",
    longName: "Virgin Galactic",
    exchange: "NYSE",
  },
  "VOW3.DE": {
    country: "Germany",
    currentPrice: 148.96,
    currency: "EUR",
    dayHigh: 148.96,
    dayLow: 141.38,
    logo_url: "https://logo.clearbit.com/volkswagenag.com",
    longName: "Volkswagon",
    exchange: "DE",
  },
  "ROO.L": {
    country: "United Kingdom",
    currentPrice: 81.3,
    currency: "GBP",
    dayHigh: 82.04,
    dayLow: 76.1,
    logo_url: "https://logo.clearbit.com/deliveroo.com",
    longName: "Deliveroo",
    exchange: "LSE",
  },
  "BP.L": {
    country: "United Kingdom",
    currentPrice: 453.7,
    currency: "GBP",
    dayHigh: 457.55,
    dayLow: 443.95,
    logo_url: "https://logo.clearbit.com/bp.com",
    longName: "BP",
    exchange: "LSE",
  },
  ENR: {
    country: "United States",
    currentPrice: 28.01,
    currency: "USD",
    dayHigh: 28.65,
    dayLow: 27.89,
    logo_url: "https://logo.clearbit.com/energizerholdings.com",
    longName: "Energizer Holdings",
    exchange: "NYSE",
  },
};

export function mockShareData(code: string): StockData {
  return mockShareHeaderData[code];
}
