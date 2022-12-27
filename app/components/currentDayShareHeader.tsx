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
      return 'w-8 h-10 sm:w-12 sm:h-18'
    } else if (shareCode === 'SPCE' || shareCode === 'VOW3.DE' || shareCode === 'ENR') {
      return 'w-12 h-12 sm:w-16 sm:h-16'
    } else if (shareCode === 'ROO.L') {
      return 'h-6 sm:h-8'
    }
    else {
      // BP.L
      // BABA
      // NFLX
      return 'w-16 h-10 sm:w-20 sm:h-12'
    }
  }

  /* SPCE logo background is black, display different background */
  function backgroundNav() {
    if (shareCode === 'SPCE') {
      return 'from-pink-400 to-blue-400';
    } else {
      return 'from-sky-400 to-blue-600';
    }
  }

  return (
    <div className={`grid grid-cols-3 p-2 bg-gray-200 border-2 rounded-lg bg-gradient-to-r ${backgroundNav()}`}>
      <div className="..."><img className={`${customLogoClass()}`} src={data.logo_url} alt={`${shareCode}-logo`} height="80" width="80" /></div>
      <div className="row-span-2 ... justify-center items-center self-center justify-items-center content-center text-center"><span className="block text-xs text-red-200 uppercase">Current Price: </span><span className="text-xl sm:text-2xl text-slate-100">{data.currentPrice} {data.currency}</span></div>
      <div className="... flex flex-row justify-end"><ArrowCircleUpIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /> <span className="text-sm sm:text-base text-lime-200">{data.dayHigh} {data.currency}</span></div>
      <div className="..."><span className="items-center text-xs sm:text-sm text-sky-200">{shareCode}</span></div>
      <div className="... flex flex-row justify-end"><addArrowCircleDownIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /><span className="text-sm text-yellow-300 sm:text-base">{data.dayLow} {data.currency}</span></div>
    </div>
  );
}