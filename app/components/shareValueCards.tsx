import { calcTotalShareValue, calcGainLossPrice } from '../utils/shares';
import type { TotalShareItemsByCode } from '../types/shares';

interface Props {
  currentPrice: number;
  shareData: TotalShareItemsByCode
}

export default function ValueCard(props: Props) {
  const { currentPrice, shareData } = props;

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
    <div className="container flex flex-row items-center justify-center gap-24">
      <div className="items-center justify-center p-8 mr-8 text-center bg-pink-100 border border-pink-600 rounded-lg basis-1/2">
        <div className="text-3xl text-pink-500">£{totalCurrentValue?.toLocaleString('en-GB')}</div>
        <div className="text-xs text-pink-400 uppercase">Current Value</div>
      </div>
      <div className="items-center justify-center p-8 text-center bg-blue-100 border border-blue-500 rounded-lg basis-1/2">
        <div className="text-3xl text-blue-500">£{totalGainLoss?.toLocaleString('en-GB')}</div>
        <div className="text-xs text-blue-400 uppercase">Profit/Loss</div>
      </div>
    </div>
  );
}