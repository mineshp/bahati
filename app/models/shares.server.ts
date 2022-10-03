import type { StockData, StockDataByPeriodItem, StockDataByPeriodItems, TotalSharesItem, ExchangeRate } from '../types/shares';
import { calcGainLossDailyPercentage, calcGainLossDailyValue, calcTotalShareValue, calcGainLossPrice } from '../utils/shares';
import { mockShareData } from '../mocks/mockShareData';
import { mockShareDataByPeriod } from '../mocks/mockShareDataByPeriod';

export async function mockGetShareDataByCode(code: string): Promise<StockData> {
  const res = new Response(
    JSON.stringify(mockShareData(code))
  );
  const data = await res.json();

  return {...data};
}

export async function getExchangeRate(baseCurrency: string): Promise<ExchangeRate> {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a302ddd933msheaa6a723d9bad7dp14c6c2jsn47db43bc1b5f',
      'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com'
    }
  };
  
  return fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/${baseCurrency} `, options)
    .then(response => response.json())
    .then(({rates}) => rates['GBP'])
    .catch(err => console.error(err));
}

export async function getShareDataByCode(code: string): Promise<StockData> {
  const encodedParams = new URLSearchParams();
  encodedParams.append("symbol", code);

  const url = 'https://yahoo-finance97.p.rapidapi.com/stock-info';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'a302ddd933msheaa6a723d9bad7dp14c6c2jsn47db43bc1b5f',
      'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
    },
    body: encodedParams
  };

  const { data } = await fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));

  return {
    currentPrice: data.currentPrice,
    currency: data.currency,
    dayHigh: data.dayHigh,
    dayLow: data.dayLow,
    logo_url: data.logo_url,
    longName: data.longName,
    exchange: data.exchange
  };
}

export async function mockGetSharesByCodeAndPeriod(code: string, start: string, end: string): Promise<StockDataByPeriodItems> {
  const res = new Response(
    JSON.stringify(mockShareDataByPeriod('1W')) 
  )

  const data = await res.json();

  return data.map((rec: StockDataByPeriodItem, i: number) => {
    const previousDay = data[i-1];
    let gainLossValue = 0;
    let gainLossPercentage = 0;
    if (previousDay?.Close) {
      gainLossValue = calcGainLossDailyValue(previousDay?.Close, rec?.Open);
      gainLossPercentage = calcGainLossDailyPercentage(previousDay?.Close, rec?.Open);
    }
    return {...rec, gainLossValue, gainLossPercentage}
  })
}

export async function getSharesByCodeAndPeriod(code: string, start: string, end: string): Promise<StockDataByPeriodItems> {
  const encodedParams = new URLSearchParams();
  encodedParams.append("end", end);
  encodedParams.append("symbol", code);
  encodedParams.append("start", start);

  const url = 'https://yahoo-finance97.p.rapidapi.com/price-customdate';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'a302ddd933msheaa6a723d9bad7dp14c6c2jsn47db43bc1b5f',
      'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
    },
    body: encodedParams
  };

  const { data } = await fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));

  return data.map((rec: StockDataByPeriodItem, i: number) => {
    const previousDay = data[i-1];
    let gainLossValue = 0;
    let gainLossPercentage = 0;
    if (previousDay?.Close) {
      gainLossValue = calcGainLossDailyValue(previousDay?.Close, rec?.Open);
      gainLossPercentage = calcGainLossDailyPercentage(previousDay?.Close, rec?.Open);
    }
    return {...rec, gainLossValue, gainLossPercentage}
  })
};

export async function getSharesByCode(code: string): Promise<TotalSharesItem[]> {
  const url = 'https://o9x8jijxn1.execute-api.eu-west-1.amazonaws.com/dev/api/stock-info';

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  };

  const data = await fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));

  return data[code];
}