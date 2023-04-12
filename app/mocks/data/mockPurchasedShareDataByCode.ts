import type { TotalShareItemsByCodeFromAPI } from "../../types/shares";
import * as mockPurchasedShareData from "./mockCurrentStocks.json";

export function mockPurchasedShareDate(
  code: string
): TotalShareItemsByCodeFromAPI {
  const allStocks: { [key: string]: TotalShareItemsByCodeFromAPI } = {
    ...mockPurchasedShareData,
  };

  return allStocks[code];
}
