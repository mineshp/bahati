import _ from "lodash";
import type { StockDataByPeriodItems } from "../types/shares";
import {
  calcGainLossDailyPercentage,
  calcGainLossDailyValue,
} from "../utils/shares";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createFakeData(
  range: string,
  numberOfIntervals: number,
  daysBetweenDates: number
): StockDataByPeriodItems {
  const now = new Date();

  const timestampData = (numberOfIntervals: number): Array<number> =>
    [...Array(numberOfIntervals).keys()].map((k) => {
      let date = now.setDate(now.getDate() - daysBetweenDates);
      return date;
    });

  const closeData = (numberOfIntervals: number): Array<number> =>
    [...Array(numberOfIntervals).keys()].map((k) => randomNumber(300, 315));

  const openData = (numberOfIntervals: number): Array<number> =>
    [...Array(numberOfIntervals).keys()].map((k) => randomNumber(300, 315));

  const lowData = (numberOfIntervals: number): Array<number> =>
    [...Array(numberOfIntervals).keys()].map((k) => randomNumber(300, 315));

  const highData = (numberOfIntervals: number): Array<number> =>
    [...Array(numberOfIntervals).keys()].map((k) => randomNumber(300, 315));

  const data = {
    chart: {
      result: [
        {
          timestamp: timestampData(numberOfIntervals),
          indicators: {
            quote: [
              {
                close: closeData(numberOfIntervals),
                low: lowData(numberOfIntervals),
                high: highData(numberOfIntervals),
                open: openData(numberOfIntervals),
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
    timestamp.reverse(),
    quote[0].close.reverse(),
    quote[0].open.reverse(),
    quote[0].high.reverse(),
    quote[0].low.reverse(),
    (
      timestamp: number,
      close: number,
      open: number,
      high: number,
      low: number
    ) => ({
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
      gainLossPercentage = Number(
        calcGainLossDailyPercentage(
          previousDay?.close as number,
          rec?.open as number
        )
      );
    }
    return { ...rec, gainLossValue, gainLossPercentage };
  });
}

export function mockShareDataByPeriod(range: string): StockDataByPeriodItems {
  switch (range) {
    case "5d":
      return createFakeData("5d", 5, 1);
    case "1mo":
      return createFakeData("1mo", 31, 7);
    case "3mo":
      return createFakeData("3mo", 12, 7);
    case "1y":
      return createFakeData("1y", 12, 30);
    default:
      return createFakeData("5d", 5, 1);
  }
}
