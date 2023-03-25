import _ from "lodash";
import memoizee from "memoizee";
import type {
  StockData,
  StockDataByPeriodItems,
  TotalSharesItem,
  ExchangeRate,
} from "../types/shares";
import {
  calcGainLossDailyPercentage,
  calcGainLossDailyValue,
} from "../utils/shares";
import { toMilliseconds } from "../utils/date";
import { mockShareData } from "../mocks/mockShareData";
import { mockShareDataByPeriod } from "../mocks/mockShareDataByPeriod";
import { mockExchangeRates } from "../mocks/mockExchangeRates";
import { mockPurchasedShareDate } from "~/mocks/mockPurchasedShareDataByCode";

export async function getMockExchangeRates(
  baseCurrency: string
): Promise<ExchangeRate> {
  const res = new Response(JSON.stringify(mockExchangeRates(baseCurrency)));
  const data = await res.json();

  return new Promise((resolve, reject) => resolve(data.rates["GBP"]));
}

const getExchangeRate = memoizee(
  async function getExchangeRate(baseCurrency: string): Promise<ExchangeRate> {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.SHARE_API_KEY ?? "abc",
        "X-RapidAPI-Host": "exchangerate-api.p.rapidapi.com",
      },
    };

    return fetch(
      `https://exchangerate-api.p.rapidapi.com/rapid/latest/${baseCurrency} `,
      options
    )
      .then((response) => response.json())
      .then(({ rates }) => rates["GBP"])
      .catch((err) => console.error(err));
  },
  {
    maxAge: 86400 * 1000,
    promise: "done:finally",
    profileName: "GET Exchange Rate",
  }
);

const getShareDataByCode = memoizee(
  async function getShareDataByCode(code: string): Promise<StockData> {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.SHARE_API_KEY ?? "abc",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    };

    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${code}`;

    const response = await fetch(url, options)
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));

    const { defaultKeyStatistics, price, summaryDetail, summaryProfile } =
      response;

    const baseShareData = {
      country: summaryProfile.country,
      currentPrice: summaryDetail.open.fmt,
      currency: price.currency,
      longName: price.longName,
      logo_url: "UNKNOWN",
      exchange: price.exchangeName,
      dayLow: summaryDetail.dayLow.fmt,
      dayHigh: summaryDetail.dayHigh.fmt,
      fiftyTwoWeekChange: defaultKeyStatistics["52WeekChange"].fmt,
    };

    return {
      ...baseShareData,
    };
  },
  {
    maxAge: 21600 * 1000,
    promise: "done:finally",
    profileName: "GET share data by code",
  }
);

export async function mockGetShareDataByCode(code: string): Promise<StockData> {
  const res = new Response(JSON.stringify(mockShareData(code)));
  const data = await res.json();

  return { ...data };
}

const getSharesByCodeAndPeriod = memoizee(
  async function getSharesByCodeAndPeriod(
    code: string,
    range: string,
    interval: string
  ): Promise<StockDataByPeriodItems> {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.SHARE_API_KEY ?? "abc",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    };

    const data = await fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=${interval}&symbol=${code}&range=${range}&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`,
      options
    )
      .then((response) => response.json())
      .then(({ chart: { result } }) => result[0])
      .then(({ timestamp, indicators: { quote } }) =>
        _.zipWith(
          timestamp,
          quote[0].close,
          quote[0].open,
          quote[0].high,
          quote[0].low,
          (timestamp, close, open, high, low) => ({
            timestamp: toMilliseconds(timestamp as number),
            close,
            open,
            high,
            low,
          })
        )
      )
      .then((stockByPeriod) => {
        return stockByPeriod.map((rec: any, i: number) => {
          const previousDay = stockByPeriod[i - 1];
          let gainLossValue = 0;
          let gainLossPercentage = 0;
          if (previousDay?.close) {
            gainLossValue = calcGainLossDailyValue(
              previousDay?.close as number,
              rec?.open as number
            );
            gainLossPercentage = Number(
              calcGainLossDailyPercentage(
                previousDay?.close as number,
                rec?.open as number
              )
            );
          }
          return { ...rec, gainLossValue, gainLossPercentage };
        });
      })
      .catch((err) => console.error(err));

    return data ?? [];
  },
  {
    maxAge: 21600 * 1000,
    promise: "done:finally",
    profileName: "GET share data by code and period",
  }
);

export async function mockGetSharesByCodeAndPeriod(
  code: string,
  range: string,
  interval: string
): Promise<StockDataByPeriodItems> {
  const res = new Response(JSON.stringify(mockShareDataByPeriod(range)));
  const data = await res.json();
  return data;
}

const getSharesByCode = memoizee(
  async function getSharesByCode(
    code: string
  ): Promise<TotalSharesItem[] | any> {
    const url = `${process.env.STOCK_BUCKET}/dev/api/stock-info`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => data[code])
      .then(async (stockData) =>
        Promise.all(
          stockData.map(async (purchaseStock: TotalSharesItem) => {
            const exchangeRate =
              purchaseStock?.currency === "GBP"
                ? 0.01
                : await getExchangeRate(purchaseStock?.currency);
            return { ...purchaseStock, exchangeRate };
          })
        )
      )
      .catch((err) => console.error("error:" + err));
  },
  {
    maxAge: 21600 * 1000,
    promise: "done:finally",
    profileName: "GET shares by code INTERNAL API",
  }
);

export async function mockGetSharesByCode(
  code: string
): Promise<TotalSharesItem[] | any> {
  const res = new Response(JSON.stringify(mockPurchasedShareDate(code)));

  const data = await res.json();

  return Promise.all(
    data.map(async (purchaseStock: TotalSharesItem) => {
      const exchangeRate =
        purchaseStock?.currency === "GBP"
          ? 0.01
          : await getMockExchangeRates(purchaseStock?.currency);
      return { ...purchaseStock, exchangeRate };
    })
  );
}

export {
  getExchangeRate,
  getShareDataByCode,
  getSharesByCodeAndPeriod,
  getSharesByCode,
};
