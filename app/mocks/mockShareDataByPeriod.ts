import type { StockDataByPeriodItems } from '../types/shares';

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createFakeData(period: number): StockDataByPeriodItems {
  let day;
  console.log(period);
  return [...Array(period).keys()].map((k) => {
    const now = new Date();
    day = period - 1;
    let date = now.setDate(now.getDate()-day)
    console.log(new Date(date));
    return ({
    'Adj Close': randomNumber(300, 315),
      Close: randomNumber(300, 315),
      Date: date,
      High: randomNumber(300, 315),
      Low: randomNumber(300, 315),
      Open: randomNumber(300, 315),
      Volume: 55843347,
      gainLossValue: randomNumber(1, 5),
      gainLossPercentage: randomNumber(2,5)
    })
  });
}

const mockShareDataByPeriodData = {
  '1W': createFakeData(5),
  '1M': createFakeData(30),
  '3M': createFakeData(90),
  '1Y': createFakeData(365)
};

// TODO: Fix typescript error
export function mockShareDataByPeriod(period: string): StockDataByPeriodItems {
  return mockShareDataByPeriodData[period];
}
