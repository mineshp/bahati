import type {
  StockData,
  StockDataByPeriodItem,
  StockDataByPeriodItems,
  TotalSharesItem,
  ExchangeRate,
  LastDayHighAndDayLow,
} from "../types/shares";
import {
  calcGainLossDailyPercentage,
  calcGainLossDailyValue,
} from "../utils/shares";
import { retrieveStartAndEndDates } from "../utils/date";
import { mockShareData } from "../mocks/mockShareData";
import { mockShareDataByPeriod } from "../mocks/mockShareDataByPeriod";
import { mockExchangeRates } from "../mocks/mockExchangeRates";
import { mockPurchasedShareDate } from "~/mocks/mockPurchasedShareDataByCode";

async function getLastDayHighAndDayLow(
  code: string
): Promise<LastDayHighAndDayLow> {
  const { start, end } = retrieveStartAndEndDates("1W");
  const data = await getSharesByCodeAndPeriod(code, start, end);

  let dayHigh = 0;
  let dayLow = 0;
  data.forEach(({ High, Low }) => {
    if (!High && !Low) return;
    dayHigh = Number(High.toFixed(2));
    dayLow = Number(Low.toFixed(2));
  });
  return {
    dayHigh,
    dayLow,
  };
}

export async function getMockExchangeRates(
  baseCurrency: string
): Promise<ExchangeRate> {
  const res = new Response(JSON.stringify(mockExchangeRates(baseCurrency)));
  const data = await res.json();

  return new Promise((resolve, reject) => resolve(data.rates["GBP"]));
}

export async function getExchangeRate(
  baseCurrency: string
): Promise<ExchangeRate> {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a302ddd933msheaa6a723d9bad7dp14c6c2jsn47db43bc1b5f",
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
}

export async function getShareDataByCode(code: string): Promise<StockData> {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a302ddd933msheaa6a723d9bad7dp14c6c2jsn47db43bc1b5f",
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
}

export async function mockGetShareDataByCode(code: string): Promise<StockData> {
  const res = new Response(JSON.stringify(mockShareData(code)));
  const data = await res.json();

  return { ...data };
}

export async function getSharesByCodeAndPeriod(
  code: string,
  start: string,
  end: string
): Promise<StockDataByPeriodItems> {
  const encodedParams = new URLSearchParams();
  encodedParams.append("end", end);
  encodedParams.append("symbol", code);
  encodedParams.append("start", start);

  const url = "https://yahoo-finance97.p.rapidapi.com/price-customdate";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "a302ddd933msheaa6a723d9bad7dp14c6c2jsn47db43bc1b5f",
      "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
    },
    body: encodedParams,
  };

  const { data } = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));

  return data.map((rec: StockDataByPeriodItem, i: number) => {
    const previousDay = data[i - 1];
    let gainLossValue = 0;
    let gainLossPercentage = 0;
    if (previousDay?.Close) {
      gainLossValue = calcGainLossDailyValue(previousDay?.Close, rec?.Open);
      gainLossPercentage = calcGainLossDailyPercentage(
        previousDay?.Close,
        rec?.Open
      );
    }
    return { ...rec, gainLossValue, gainLossPercentage };
  });
}

export async function mockGetSharesByCodeAndPeriod(
  code: string,
  start: string,
  end: string
): Promise<StockDataByPeriodItems> {
  const res = new Response(JSON.stringify(mockShareDataByPeriod("1W")));

  const data = await res.json();

  return data.map((rec: StockDataByPeriodItem, i: number) => {
    const previousDay = data[i - 1];
    let gainLossValue = 0;
    let gainLossPercentage = 0;
    if (previousDay?.Close) {
      gainLossValue = calcGainLossDailyValue(previousDay?.Close, rec?.Open);
      gainLossPercentage = calcGainLossDailyPercentage(
        previousDay?.Close,
        rec?.Open
      );
    }
    return { ...rec, gainLossValue, gainLossPercentage };
  });
}

export async function getSharesByCode(
  code: string
): Promise<TotalSharesItem[] | any> {
  const url =
    "https://o9x8jijxn1.execute-api.eu-west-1.amazonaws.com/dev/api/stock-info";

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
}

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
