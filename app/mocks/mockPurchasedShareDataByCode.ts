import type { TotalShareItemsByCodePre } from "../types/shares";
import * as mockPurchasedShareData from "./currentStocks.json";

export function mockPurchasedShareDate(code: string): TotalShareItemsByCodePre {
  const allStocks: { [key: string]: any } = {
    ...mockPurchasedShareData,
  };
  return allStocks[code];
}
