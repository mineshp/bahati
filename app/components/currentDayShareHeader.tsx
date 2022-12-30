import type { StockData } from "../types/shares";
import Pill from "./library/pill";

interface Props {
  data: StockData;
  shareCode: string;
}

export default function CurrentDayShareHeader(prop: Props) {
  const { data, shareCode } = prop;

  const randomBgHeader = [
    {
      bg: "from-pink-400 to-blue-400",
      logoBgUrl: "bg-[url('/_static/triangles-blue.svg')]",
    },
    {
      bg: "from-sky-400 to-blue-600",
      logoBgUrl: "bg-[url('/_static/triangles-pink.svg')]",
    },
  ];

  const randomHeader = Math.floor(Math.random() * randomBgHeader.length);

  function extractStockName(data: StockData): string {
    return data.longName
      .substring(0, 15)
      .replace(",", "")
      .replace("Inc.", "")
      .trim()
      .split(" ")[0];
  }

  return (
    <div
      className={`grid grid-cols-3 rounded-lg border-2 bg-gray-200 bg-gradient-to-r p-2 ${randomBgHeader[randomHeader].bg}`}
    >
      <div className="...">
        <div
          className={`${randomBgHeader[randomHeader].logoBgUrl} table-cell h-16 w-16 rounded-full border-4 border-pink-200 bg-blue-500 p-2 text-center align-middle text-sm font-bold uppercase text-fuchsia-100`}
        >
          {shareCode.substring(0, 4).replace(".L", "").replace(".", "")}
        </div>
      </div>
      <div className="... row-span-2 content-center items-center justify-center justify-items-center self-center text-center">
        <span className="block text-xs text-red-200 uppercase">
          Current Price:{" "}
        </span>
        <span className="text-xl text-slate-100 sm:text-2xl">
          {data.currentPrice} {data.currency}
        </span>
      </div>
      <div className="... flex flex-row justify-end">
        <Pill data={data.dayHigh} currency={data.currency} type="high" />
      </div>
      <div className="... relative">
        <span className="absolute inset-x-0 bottom-0 items-center text-xs text-sky-200 sm:text-sm">
          {extractStockName(data)}:{data.exchange}
        </span>
      </div>
      <div className="... flex flex-row justify-end">
        <Pill data={data.dayLow} currency={data.currency} type="low" />
      </div>
    </div>
  );
}
