import _ from "lodash";
import type { StockDataByPeriodItems } from "../types/shares";
import {
  calcGainLossDailyPercentage,
  calcGainLossDailyValue,
} from "../utils/shares";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createFakeData(days: number): StockDataByPeriodItems {
  const now = new Date();

  const timestampData = (days: number): Array<number> =>
    console.log(`days is ${days}`) ||
    [...Array(days).keys()].map((k) => {
      let date = now.setDate(now.getDate() - 1);
      return date;
    });

  const closeData = (days: number): Array<number> =>
    [...Array(days).keys()].map((k) => randomNumber(300, 315));

  const openData = (days: number): Array<number> =>
    [...Array(days).keys()].map((k) => randomNumber(300, 315));

  const lowData = (days: number): Array<number> =>
    [...Array(days).keys()].map((k) => randomNumber(300, 315));

  const highData = (days: number): Array<number> =>
    [...Array(days).keys()].map((k) => randomNumber(300, 315));

  const data = {
    chart: {
      result: [
        {
          timestamp: timestampData(days),
          indicators: {
            quote: [
              {
                close: closeData(days),
                low: lowData(days),
                high: highData(days),
                open: openData(days),
              },
            ],
          },
        },
      ],
      error: null,
    },
  };

  const {
    chart: { result },
  } = data;

  const {
    timestamp,
    indicators: { quote },
  } = result[0];

  const stockByPeriod = _.zipWith(
    timestamp,
    quote[0].close,
    quote[0].open,
    quote[0].high,
    quote[0].low,
    (timestamp, close, open, high, low) => ({
      timestamp,
      close,
      open,
      high,
      low,
    })
  );

  return stockByPeriod.map((rec: any, i: number) => {
    const previousDay = stockByPeriod[i - 1];
    let gainLossValue = 0;
    let gainLossPercentage = 0;
    if (previousDay?.close) {
      gainLossValue = calcGainLossDailyValue(
        previousDay?.close as number,
        rec?.open as number
      );
      gainLossPercentage = calcGainLossDailyPercentage(
        previousDay?.close as number,
        rec?.open as number
      );
    }
    return { ...rec, gainLossValue, gainLossPercentage };
  });
}

export function mockShareDataByPeriod(range: string): StockDataByPeriodItems {
  console.log(
    `******************* range IN MOCK IS ${range} *******************`
  );
  switch (range) {
    case "5d":
      return createFakeData(5);
    case "1m":
      return createFakeData(30);
    case "3m":
      return createFakeData(90);
    case "1y":
      return createFakeData(365);
    default:
      return createFakeData(5);
  }
}
