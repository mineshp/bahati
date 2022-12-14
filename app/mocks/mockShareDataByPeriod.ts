import type { StockDataByPeriodItems } from '../types/shares';

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createFakeData(period: number): StockDataByPeriodItems {
  const now = new Date();
  return [...Array(period).keys()].map((k) => {
    let date = now.setDate(now.getDate()-1)
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

const mockShareDataByPeriodData: {[key:string]: StockDataByPeriodItems} = {
  '1W': createFakeData(5),
  '1M': createFakeData(30),
  '3M': createFakeData(90),
  '1Y': createFakeData(365)
};

export function mockShareDataByPeriod(period: string): StockDataByPeriodItems {
  return mockShareDataByPeriodData[period];
}
