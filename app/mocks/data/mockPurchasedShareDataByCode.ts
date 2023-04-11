import type { TotalShareItemsByCodePre } from "../../types/shares";
import * as mockPurchasedShareData from "./mockCurrentStocks.json";

export function mockPurchasedShareDate(code: string): TotalShareItemsByCodePre {
  const allStocks: { [key: string]: any } = {
    ...mockPurchasedShareData,
  };
  return allStocks[code];
}
