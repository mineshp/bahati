import type { ExchangeRate } from "../types/shares";

export function mockExchangeRates(): ExchangeRate {
  return {
    base_code: "USD",
    documentation: "test",
    rates: {
      USD: 1,
      AUD: 1.476658,
      EUR: 0.948483,
      GBP: 0.838326,
    },
  };
}
