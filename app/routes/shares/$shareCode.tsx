import type { ActionFunction, LoaderFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useState } from 'react';
import { useCatch, useLoaderData, useFetcher, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import datepickerCss from 'react-datepicker/dist/react-datepicker.css';
import type { getShareDataByCode} from "~/models/shares.server";
import type { getSharesByCodeAndPeriod} from "~/models/shares.server";
import { mockGetShareDataByCode, mockGetSharesByCodeAndPeriod , getSharesByCode} from "~/models/shares.server";
import type { StockDataByPeriodItems } from '../../types/shares';
import { formatDateForDisplay, retrieveStartAndEndDates } from '../../utils/date';
import Chart from '../../components/chart';
import Table from '../../components/table';
import CurrentDayShareHeader from '../../components/currentDayShareHeader';
import ShareNav from '../../components/shareNav';
import ShareValueCard from '../../components/shareValueCards';

type LoaderData = {
  shareHeaderData: Awaited<ReturnType<typeof getShareDataByCode>>;
  shareData: Awaited<ReturnType<typeof getSharesByCodeAndPeriod>>;
  totalSharesByCode: Awaited<ReturnType<typeof getSharesByCode>>;
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: datepickerCss },
]

export const loader: LoaderFunction = async ({params,}) => {
  invariant(params.shareCode, "Expected params.shareCode");
  const {start, end} = retrieveStartAndEndDates('1W');
  return json({
    // shareHeaderData: await getShareDataByCode(params?.shareCode as string),
    // shareData: await getSharesByCodeAndPeriod(params?.shareCode as string, start, end),
    // totalSharesByCode: await getSharesByCode(params?.shareCode as string),
    shareHeaderData: await mockGetShareDataByCode(params?.shareCode as string),
    shareData: await mockGetSharesByCodeAndPeriod(params?.shareCode as string, start, end),
    totalSharesByCode: await getSharesByCode(params?.shareCode as string)
  });
};

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const start = formData.get('start_date');
  const end = formData.get('end_date');
  const shareCode = formData.get('shareCode');

  return json({
    shareData: await mockGetSharesByCodeAndPeriod(shareCode as string, start as string, end as string)
    // shareData: await getSharesByCodeAndPeriod(shareCode as string, start as string, end as string),
  });
};

export default function SharePage() {
  const params = useParams();
  const { shareHeaderData, shareData, totalSharesByCode } = useLoaderData() as LoaderData;
  const [displayData, setDisplayData] = useState<string>('chart');
  const [period, setPeriod] = useState('1W');
  const [start, setStart] = useState<string>(retrieveStartAndEndDates('1W').start);
  const [end, setEnd] = useState<string>(retrieveStartAndEndDates('1W').end);
  const [shareDataByPeriod, setShareDataByPeriod] = useState<StockDataByPeriodItems>([])
  const fetcher = useFetcher()

  // TODO: This does not look like the remix way of doing things
  // set graph/table share data by period to shareDataByPeriod from loader
  useEffect(() => {
     if (shareDataByPeriod.length !== 0) {
       setShareDataByPeriod(shareDataByPeriod);
     } else {
      setShareDataByPeriod(shareData)
     }
  }, [shareDataByPeriod, shareData]);

  // useEffect(() => {
  //   console.log(params);
  //   console.log(shareCode)
  //   if (!params.shareCode || params.shareCode === shareCode) return;
  //   console.log('SHARECODE PARAM CHANGED')
  //   console.log(params);
  //   setShareCode(params?.shareCode as string);
  // }, [params, shareCode])

  function handleDisplayMode(mode: string) {
    setDisplayData(mode);
  }

  function handleStockPeriod(period: string) {
    const data = retrieveStartAndEndDates(period);
    setEnd(data?.end);
    setStart(data?.start);
    setPeriod(period);
    fetcher.load(`/shares/query-share-data?shareCode=${params.shareCode}&start=${data?.start}&end=${data?.end}`)
  }

  useEffect(() => {
    if (fetcher.data) {
      setShareDataByPeriod(fetcher.data);
    }
  }, [fetcher]);

  return shareDataByPeriod && (
    <div>
      <div className="px-4 pt-4">
        <CurrentDayShareHeader shareCode={params.shareCode as string} data={shareHeaderData} />
      </div>
      <div className="p-4">
        <div className="border rounded-lg">
         <ShareNav shareCode={params.shareCode as string} displayData={displayData} handleStockPeriod={handleStockPeriod} handleDisplayMode={handleDisplayMode} period={period} start={start} end={end} />
         <div className="px-4 pt-2 text-slate-600"><span className="text-xs rounded-lg">Selected period: </span><span className="text-sm rounded-lg text-rose-600">{formatDateForDisplay(start)} - {formatDateForDisplay(end)}</span></div>
          { displayData === 'table'
            ? <Table data={shareDataByPeriod} />
            : <Chart shareData={shareDataByPeriod} shareCode={params.shareCode as string} originalData={totalSharesByCode} />
          }
        </div>
      </div>
      <div className="flex justify-center p-4">
        <ShareValueCard currentPrice={Number(shareHeaderData.currentPrice)} shareData={totalSharesByCode} />
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
    return <div>Share not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
