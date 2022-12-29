import type { StockData } from "../types/shares";
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/solid';

interface Props {
  data: StockData;
  shareCode: string;
}

export default function CurrentDayShareHeader(prop: Props) {
  const { data, shareCode} = prop;

  const randomBgHeader = [
    { bg: 'from-pink-400 to-blue-400', 'logoBgUrl': "bg-[url('/_static/triangles-blue.svg')]" },
    { bg: 'from-sky-400 to-blue-600', 'logoBgUrl': "bg-[url('/_static/triangles-pink.svg')]" } 
  ]

  const randomHeader = Math.floor(Math.random() * randomBgHeader.length);

  return (
    <div className={`grid grid-cols-3 p-2 bg-gray-200 border-2 rounded-lg bg-gradient-to-r ${randomBgHeader[randomHeader].bg}`}>
      <div className="..."><div className={`${randomBgHeader[randomHeader].logoBgUrl} table-cell p-2 font-bold text-center uppercase align-middle bg-blue-500 border-4 border-pink-200 rounded-full w-16 h-16 text-fuchsia-100 text-sm`}>{shareCode.substring(0,4).replace('.L', '').replace('.', '')}</div></div>
      <div className="row-span-2 ... justify-center items-center self-center justify-items-center content-center text-center"><span className="block text-xs text-red-200 uppercase">Current Price: </span><span className="text-xl sm:text-2xl text-slate-100">{data.currentPrice} {data.currency}</span></div>
      <div className="... flex flex-row justify-end"><ArrowCircleUpIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /> <span className="text-sm sm:text-base text-lime-200">{data.dayHigh} {data.currency}</span></div>
      <div className="..."><span className="items-center text-xs sm:text-sm text-sky-200">{data.longName}:{data.exchange}</span></div>
      <div className="... flex flex-row justify-end"><ArrowCircleDownIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /><span className="text-sm text-yellow-300 sm:text-base">{data.dayLow} {data.currency}</span></div>
    </div>
  );
}