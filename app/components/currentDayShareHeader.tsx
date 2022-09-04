import type { StockData } from "../types/shares";
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/solid';

interface Props {
  data: StockData;
  shareCode: string;
}

export default function CurrentDayShareHeader(prop: Props) {
  const { data, shareCode} = prop;

  /* Logos are different dimensions */
  function customLogoClass() {
    if (shareCode === 'TSLA') {
      return 'w-12 h-18'
    } else if (shareCode === 'SPCE' || shareCode === 'VOW3.DE' || shareCode === 'ENR') {
      return 'w-16 h-16'
    } else if (shareCode === 'ROO.L') {
      return 'h-12'
    }
    else {
      // BP.L
      // BABA
      // NFLX
      return 'w-20 h-12'
    }
  }

  /* SPCE logo background is black, display different background */
  function backgroundNav() {
    if (shareCode === 'SPCE') {
      return 'from-pink-400 to-blue-400';
    } else {
      return 'from-cyan-400 to-blue-400';
    }
  }

  return (
    <div className={`grid grid-cols-3 p-2 bg-gray-200 border-2 rounded-lg bg-gradient-to-r ${backgroundNav()}`}>
      <div className="..."><img className={`${customLogoClass()}`} src={data.logo_url} alt={`${shareCode}-logo`} height="80" width="80" /></div>
      <div className="row-span-2 ... justify-center items-center self-center justify-items-center content-center"><span className="block text-xs text-red-200 uppercase">Current Price: </span><span className="text-2xl text-slate-100">{data.currentPrice} {data.currency}</span></div>
      <div className="... flex flex-row justify-end"><ArrowCircleUpIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /> <span className="text-lime-200"> {data.dayHigh} {data.currency}</span></div>
      <div className="..."><span className="items-center text-base text-slate-500">{shareCode}</span></div>
      <div className="... flex flex-row justify-end"><ArrowCircleDownIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /><span className="text-yellow-300">{data.dayLow} {data.currency}</span></div>
    </div>
  );
}