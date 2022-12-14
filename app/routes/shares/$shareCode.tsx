import type {
  ActionFunction,
  LoaderFunction,
  LinksFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  useCatch,
  useLoaderData,
  useFetcher,
  useParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import datepickerCss from "react-datepicker/dist/react-datepicker.css";
import {
  mockGetShareDataByCode,
  mockGetSharesByCodeAndPeriod,
  mockGetSharesByCode,
  getSharesByCode,
  getShareDataByCode,
  getSharesByCodeAndPeriod,
} from "~/models/shares.server";
import type { StockDataByPeriodItems } from "../../types/shares";
import { retrieveStartAndEndDates } from "../../utils/date";
import CurrentDayShareHeader from "../../components/currentDayShareHeader";
import ShareValueCard from "../../components/shareValueCards";
import InformationBar from "../../components/information";
import ShareGraph from "../../components/shareGraph";

type LoaderData = {
  shareHeaderData: Awaited<ReturnType<typeof getShareDataByCode>>;
  shareData: Awaited<ReturnType<typeof getSharesByCodeAndPeriod>>;
  totalSharesByCode: Awaited<ReturnType<typeof getSharesByCode>>;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: datepickerCss },
];

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.shareCode, "Expected params.shareCode");
  const { start, end } = retrieveStartAndEndDates("1W");

  let shareHeaderData;
  let shareData;
  let totalSharesByCode;

  if (process.env.NODE_ENV === "development") {
    console.log("Dev mode: using mocks");
    shareHeaderData = await mockGetShareDataByCode(params?.shareCode as string);
    shareData = await mockGetSharesByCodeAndPeriod(
      params?.shareCode as string,
      start,
      end
    );
    totalSharesByCode = await mockGetSharesByCode(params?.shareCode as string);
  } else {
    shareHeaderData = await getShareDataByCode(params?.shareCode as string);
    shareData = await getSharesByCodeAndPeriod(
      params?.shareCode as string,
      start,
      end
    );
    totalSharesByCode = await getSharesByCode(params?.shareCode as string);
  }

  return json({
    shareHeaderData,
    shareData,
    totalSharesByCode,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const start = formData.get("start_date");
  const end = formData.get("end_date");
  const shareCode = formData.get("shareCode");

  let shareData;

  if (process.env.NODE_ENV === "development") {
    shareData = await mockGetSharesByCodeAndPeriod(
      shareCode as string,
      start as string,
      end as string
    );
  } else {
    shareData = await getSharesByCodeAndPeriod(
      shareCode as string,
      start as string,
      end as string
    );
  }

  return json({ shareData });
};

export default function SharePage() {
  const params = useParams();
  const { shareHeaderData, shareData, totalSharesByCode } =
    useLoaderData() as LoaderData;
  const [displayData, setDisplayData] = useState<string>("chart");
  const [period, setPeriod] = useState("1W");
  const [start, setStart] = useState<string>(
    retrieveStartAndEndDates("1W").start
  );
  const [end, setEnd] = useState<string>(retrieveStartAndEndDates("1W").end);
  const [shareDataByPeriod, setShareDataByPeriod] =
    useState<StockDataByPeriodItems>([]);
  const fetcher = useFetcher();

  // TODO: This does not look like the remix way of doing things
  // set graph/table share data by period to shareDataByPeriod from loader
  useEffect(() => {
    if (shareDataByPeriod.length !== 0) {
      setShareDataByPeriod(shareDataByPeriod);
    } else {
      setShareDataByPeriod(shareData);
    }
  }, [shareDataByPeriod, shareData]);

  function handleDisplayMode(mode: string) {
    setDisplayData(mode);
  }

  function handleStockPeriod(period: string) {
    const data = retrieveStartAndEndDates(period);
    setEnd(data?.end);
    setStart(data?.start);
    setPeriod(period);
    fetcher.load(
      `/shares/query-share-data?shareCode=${params.shareCode}&start=${data?.start}&end=${data?.end}`
    );
  }

  useEffect(() => {
    if (fetcher.data) {
      setShareDataByPeriod(fetcher.data);
    }
  }, [fetcher]);

  return (
    shareDataByPeriod && (
      <div>
        <CurrentDayShareHeader
          shareCode={params.shareCode as string}
          data={shareHeaderData}
        />
        <InformationBar
          exchangeData={totalSharesByCode}
          shareData={shareHeaderData}
        />
        <ShareGraph
          shareCode={params.shareCode as string}
          displayData={displayData}
          handleDisplayMode={handleDisplayMode}
          handleStockPeriod={handleStockPeriod}
          period={period}
          start={start}
          end={end}
          shareDataByPeriod={shareDataByPeriod}
          totalSharesByCode={totalSharesByCode}
        />
        <ShareValueCard
          currentPrice={Number(shareHeaderData.currentPrice)}
          shareData={totalSharesByCode}
        />
      </div>
    )
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
