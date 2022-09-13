import type { ActionFunction, LoaderFunction, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useEffect, useRef, useState } from 'react';
import { Form, useCatch, useLoaderData, useActionData, useFetcher, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import datepickerCss from 'react-datepicker/dist/react-datepicker.css';
import type { getShareDataByCode, getSharesByCodeAndPeriod} from "~/models/shares.server";
import { mockGetShareDataByCode, mockGetSharesByCodeAndPeriod , getSharesByCode} from "~/models/shares.server";
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
  const {start, end} = retrieveStartAndEndDates('1M');
  return json({
    // shareHeaderData: await getShareDataByCode(params?.shareCode as string),
    // shareData: await getSharesByCodeAndPeriod(params?.shareCode as string, start, end),
    // totalSharesByCode: await getSharesByCode(params?.shareCode as string)
    shareHeaderData: await mockGetShareDataByCode(params?.shareCode as string),
    shareData: await mockGetSharesByCodeAndPeriod(params?.shareCode as string, start, end),
    totalSharesByCode: await getSharesByCode(params?.shareCode as string)
  });
};

export const action: ActionFunction = async ({
  request,
}) => {
  console.log('ACTION FUNTION CALLED');
  const formData = await request.formData();
  // console.log(formData);
  const start = formData.get('start_date');
  const end = formData.get('end_date');
  const shareCode = formData.get('shareCode');
  // console.log(`start is now ${start}`);
  // console.log(`end is not ${end}`)
  // const project = await createProject(formData);
  // return redirect(`/projects/${project.id}`);
  return json({
    shareData: await mockGetSharesByCodeAndPeriod(shareCode as string, start as string, end as string)
  });
};

export default function SharePage() {
  const params = useParams();
  // const shareCode = params.shareCode;
  const { shareHeaderData, shareData, totalSharesByCode } = useLoaderData() as LoaderData;
  const actionData = useActionData();
  // const formRef = useRef<HTMLFormElement>(null)
  const [displayData, setDisplayData] = useState<string>('chart');
  const [period, setPeriod] = useState('1W');
  const [start, setStart] = useState<string>(new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState<string>(new Date().toISOString().slice(0, 10));
  // const [stockHeaderData, setStockHeaderData] = useState(null);
  // const [stockData, setStockData] = useState(null);
  const [shareCode, setShareCode] = useState<string>('');
// console.log('ActionData is ');
// console.log(actionData);
  useEffect(() => {
    if (!params.shareCode) return;
    setShareCode(params?.shareCode as string);
  }, [params])

  useEffect(() => {
    // console.log(period);
    const data = retrieveStartAndEndDates(period);
    // console.log('Calculated Dates');
    // console.log(data);
    setEnd(data?.end);
    setStart(data?.start);
  }, [period]);

  function handleDisplayMode(mode: string) {
    setDisplayData(mode);
  }

  function handleStockPeriod(period: string) {
    console.log(`period is ${period}`);
    setPeriod(period);
  }

  return (
    <div>
      <div className="px-4 pt-4">
        <CurrentDayShareHeader shareCode={shareCode} data={shareHeaderData} />
      </div>
      <div className="p-4">
        <div className="border rounded-lg">
         <ShareNav shareCode={shareCode} displayData={displayData} handleStockPeriod={handleStockPeriod} handleDisplayMode={handleDisplayMode} period={period} start={start} end={end} />
         <div className="px-4 pt-2 text-slate-600"><span className="text-xs">Selected period: </span><span className="text-sm">{formatDateForDisplay(start)} - {formatDateForDisplay(end)}</span></div>
          { displayData === 'table'
            ? <Table data={shareData} />
            : <Chart shareData={shareData} shareCode={shareCode} originalData={totalSharesByCode} />
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
