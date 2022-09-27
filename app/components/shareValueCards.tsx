import { calcTotalShareValue, calcGainLossPrice } from '../utils/shares';
import type { TotalShareItemsByCode } from '../types/shares';
import { useEffect, useState } from 'react';

interface Props {
  currentPrice: number;
  shareData: TotalShareItemsByCode
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
    const valueSpent = Number(calcTotalShareValue(shareData.totalShares, shareData.originalCostPrice));
    return acc + valueSpent;
  }, 0);

  const totalCurrentValue = shareData?.reduce((acc, shareData) => {
    const valueSpent = Number(calcTotalShareValue(shareData.totalShares, currentPrice));
    return acc + valueSpent;
  }, 0);

  const totalGainLoss = Number((Number(totalCurrentValue) - Number(totalValueSpent)).toFixed(2));

  return (
    <div className="container grid items-center justify-center grid-rows-1 gap-8 sm:grid-cols-2 sm:gap-16 md:gap-24">
      <div className={`items-center justify-center p-8 text-center bg-rose-100 border border-rose-600 rounded-lg ${showCurrent ? "" : "blur-sm"}`} onClick={handleToggleCurrent}>
        <div className="text-3xl text-rose-500">£{showCurrent ? totalCurrentValue?.toLocaleString('en-GB') : 'shh'}</div>
        <div className="text-xs uppercase text-rose-400">Current Value</div>
      </div>
      <div className={`items-center justify-center p-8 text-center bg-indigo-100 border border-indigo-500 rounded-lg ${showProfitLoss ? "" : "blur-sm"}`} onClick={handleToggleProfitLoss}>
        <div className="text-3xl text-indigo-500">£{showProfitLoss ? totalGainLoss?.toLocaleString('en-GB') : 'shh'}</div>
        <div className="text-xs text-indigo-400 uppercase">Profit/Loss</div>
      </div>
    </div>
  );
}