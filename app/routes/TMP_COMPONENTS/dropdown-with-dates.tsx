import type { ActionFunction, LoaderFunction, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useEffect, useRef, useState } from 'react';
import { Form, useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ChartBarIcon, TableIcon } from '@heroicons/react/outline';
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/solid';
import DatePicker from 'react-datepicker';
import datepickerCss from 'react-datepicker/dist/react-datepicker.css';
import { getShareDataByCode } from "~/models/shares.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getShareDataByCode>>;
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: datepickerCss },
]

export const loader: LoaderFunction = async ({params,}) => {
  return json({
    data: await getShareDataByCode(params.shareCode),
  });
};


export default function SharePage() {
  const params = useParams();
  const shareCode = params.shareCode;
  const { data } = useLoaderData() as LoaderData;
  const formRef = useRef<HTMLFormElement>(null)
  const [displayData, setDisplayData] = useState<String>('chart');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
console.log(data);
  function handleDisplayMode(mode: String) {
    setDisplayData(mode);
  }

  return (
    <div>
      <div className="px-4 pt-4">
        <div className="grid grid-cols-3 p-2 bg-gray-200 border-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400">
          <div className="..."><img src={data.logo_url} alt={`${shareCode}-logo`} height="80" width="80" /></div>
          <div className="row-span-2 ... justify-center items-center self-center justify-items-center content-center"><span className="text-sm text-red-200">Current Price: </span><span className="text-xl text-slate-100">{data.currentPrice} {data.currency}</span></div>
          <div className="... flex flex-row justify-end"><ArrowCircleUpIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /> <span className="text-green-900"> {data.dayHigh} {data.currency}</span></div>
          <div className="..."><span className="items-center text-base text-slate-500">{shareCode}</span></div>
          <div className="... flex flex-row justify-end"><ArrowCircleDownIcon className="w-6 h-6 text-zinc-300" aria-hidden="true" /><span className="text-fuchsia-800">{data.dayLow} {data.currency}</span></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-end h-12 px-4 bg-gray-200 rounded-lg">
        <ul className="flex items-center">
        <li className="mr-6">
          <span className="text-slate-400">mode:</span> <span className="text-pink-800">{displayData}</span>
        </li>
        <li>
        <span>From:</span>
        </li>
        <li className="mr-6">
          <div className="flex items-center justify-center">
        <input
          type="hidden"
          name="startDate"
          value={startDate.toISOString().substring(0, 10)}
          id="startDate"
        />
        <DatePicker
          className="p-2 border"
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date)
          }}
        />
          </div>
          </li>
          <li>
        <span>To:</span>
        </li>
        <li className="mr-6">
          <div className="flex items-center justify-center">
        <input
          type="hidden"
          name="endDate"
          value={endDate.toISOString().substring(0, 10)}
          id="endDate"
        />
        <DatePicker
          className="p-2 border"
          selected={endDate}
          onChange={(date: Date) => {
            setEndDate(date)
          }}
        />
          </div>
          </li>
          <li className="mr-6">
            { displayData === 'chart'
              ? <button type="button" className="items-center justify-center text-pink-400 w-9 h-9 hover:text-pink-900" onClick={() => handleDisplayMode('table')}><ChartBarIcon className="w-6 h-6" aria-hidden="true" /></button>
              : <button type="button" className="items-center text-pink-400 w-9 h-9 hover:text-pink-900" onClick={() => handleDisplayMode('chart')}><TableIcon className="w-6 h-6" aria-hidden="true"/></button>
            }
          </li>
        </ul>
        </div>
      </div>
  </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
