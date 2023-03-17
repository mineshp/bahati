import _ from "lodash";
import type { StockDataByPeriodItems } from "../types/shares";
import {
  calcGainLossDailyPercentage,
  calcGainLossDailyValue,
} from "../utils/shares";

type intervalDataType = {
  numberOfIntervals: number;
  daysBetweenDates: number;
};

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const getIntervalsForRange: { [key: string]: intervalDataType } = {
  "5d": {
    numberOfIntervals: 5,
    daysBetweenDates: 1,
  },
  "1m": {
    numberOfIntervals: 4,
    daysBetweenDates: 7,
  },
  "3m": {
    numberOfIntervals: 12,
    daysBetweenDates: 7,
  },
  "1y": {
    numberOfIntervals: 12,
    daysBetweenDates: 30,
  },
};

function createFakeData(range: string): StockDataByPeriodItems {
  const now = new Date();
  const { numberOfIntervals, daysBetweenDates } = getIntervalsForRange[range];

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

export function mockShareDataByPeriod(
  range: string,
  interval: string
): StockDataByPeriodItems {
  console.log(
    `******************* range IN MOCK IS ${range} ${interval} *******************`
  );

  switch (range) {
    case "5d":
      return createFakeData("5d");
    case "1m":
      return createFakeData("1m");
    case "3m":
      return createFakeData("3m");
    case "1y":
      return createFakeData("1y");
    default:
      return createFakeData("5d");
  }
}
