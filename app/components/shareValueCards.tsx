import { calcTotalShareValue } from "../utils/shares";
import type { TotalShareItemsByCode } from "../types/shares";
import { useState } from "react";
interface Props {
  currentPrice: number;
  shareData: TotalShareItemsByCode;
}

export default function ValueCard(props: Props) {
  const { currentPrice, shareData } = props;
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showProfitLoss, setShowProfitLoss] = useState<boolean>(false);

  function handleToggleCurrent() {
    setShowCurrent(!showCurrent);
  }

  function handleToggleProfitLoss() {
    setShowProfitLoss(!showProfitLoss);
  }

  const totalValueSpent = shareData?.reduce((acc, shareData) => {
    const valueSpent = Number(
      calcTotalShareValue(
        shareData.totalShares,
        shareData.originalCostPrice,
        shareData.purchaseExchangeRate
      )
    );
    return acc + valueSpent;
  }, 0);

  const totalCurrentValue = shareData?.reduce((acc, shareData) => {
    const valueSpent = Number(
      calcTotalShareValue(
        shareData.totalShares,
        currentPrice,
        shareData.exchangeRate
      )
    );
    return acc + valueSpent;
  }, 0);

  const totalGainLoss = Number(
    (Number(totalCurrentValue) - Number(totalValueSpent)).toFixed(2)
  );

  return (
    <div className="flex justify-center p-4">
      <div className="container grid items-center gap-8 pb-8 sm:grid-cols-2 sm:gap-16 md:gap-24">
        <div
          className={`items-center justify-center rounded-lg border border-rose-600 bg-gradient-to-r from-rose-100 to-rose-200 p-8 text-center ${
            showCurrent ? "" : "blur-sm"
          }`}
          onClick={handleToggleCurrent}
          data-cy="currentValue"
        >
          <div className="text-2xl text-rose-500 sm:text-3xl">
            £{showCurrent ? totalCurrentValue?.toLocaleString("en-GB") : "shh"}
          </div>
          <div className="text-xs uppercase text-rose-400">Current Value</div>
        </div>
        <div
          className={`items-center justify-center rounded-lg border border-indigo-500 bg-gradient-to-r  from-indigo-100 to-indigo-200 p-8 text-center ${
            showProfitLoss ? "" : "blur-sm"
          }`}
          onClick={handleToggleProfitLoss}
          data-cy="profitLoss"
        >
          <div className="text-2xl text-indigo-500 sm:text-3xl">
            £{showProfitLoss ? totalGainLoss?.toLocaleString("en-GB") : "shh"}
          </div>
          <div className="text-xs uppercase text-indigo-400">Profit/Loss</div>
        </div>
      </div>
    </div>
  );
}
