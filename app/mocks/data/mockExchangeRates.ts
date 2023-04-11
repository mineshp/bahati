import type { ExchangeRate } from "../../types/shares";

export function mockExchangeRates(baseCode: string): ExchangeRate {
  const rates: { [key: string]: ExchangeRate } = {
    USD: {
      base_code: "USD",
      documentation: "usd",
      rates: {
        USD: 1,
        EUR: 0.948483,
        GBP: 0.838326,
      },
    },
    GBP: {
      base_code: "GBP",
      documentation: "gbp",
      rates: {
        USD: 1.21,
        EUR: 1.13,
        GBP: 1,
      },
    },
    EUR: {
      base_code: "EUR",
      documentation: "eur",
      rates: {
        USD: 1.07,
        EUR: 1,
        GBP: 0.88,
      },
    },
  };

  return rates[baseCode];
}
