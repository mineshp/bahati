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

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.shareCode, "Expected params.shareCode");
  console.log(params);
  const url = new URL(request.url);
  console.log(url);
  // const query = url.searchParams.get("q") ;

  let shareHeaderData;
  let shareData;
  let totalSharesByCode;

  if (process.env.NODE_ENV === "development") {
    console.log("Dev mode: using mocks");
    console.log("LOADER FUNCTION FIRES");
    shareHeaderData = await mockGetShareDataByCode(params?.shareCode as string);
    shareData = await mockGetSharesByCodeAndPeriod(
      params?.shareCode as string,
      "5d",
      "1d"
    );
    // shareData = await getSharesByCodeAndPeriod(
    //   params?.shareCode as string,
    //   "5d",
    //   "1d"
    // );
    totalSharesByCode = await mockGetSharesByCode(params?.shareCode as string);
  } else {
    shareHeaderData = await getShareDataByCode(params?.shareCode as string);
    shareData = await getSharesByCodeAndPeriod(
      params?.shareCode as string,
      "5d",
      "1d"
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
  const range = formData.get("range");
  const interval = formData.get("interval");
  const shareCode = formData.get("shareCode");

  console.log("IN ACTION FUNCTION");
  console.log("range", "interval", "shareCode");
  console.log(range, interval, shareCode);

  let shareData;

  if (process.env.NODE_ENV === "development") {
    console.log("IN DEVELOPMENT MODE");
    shareData = await mockGetSharesByCodeAndPeriod(
      shareCode as string,
      range as string,
      interval as string
    );
  } else {
    shareData = await getSharesByCodeAndPeriod(
      shareCode as string,
      range as string,
      interval as string
    );
  }

  // console.log(shareData);
  return json({ shareData });
};

export default function SharePage() {
  const params = useParams();
  const { shareHeaderData, shareData, totalSharesByCode } =
    useLoaderData() as LoaderData;
  const [displayData, setDisplayData] = useState<string>("chart");
  const [period, setPeriod] = useState("5d");
  // const [start, setStart] = useState<string>(
  //   retrieveStartAndEndDates("1W").start
  // );
  // const [end, setEnd] = useState<string>(retrieveStartAndEndDates("1W").end);
  const [shareDataByPeriod, setShareDataByPeriod] =
    useState<StockDataByPeriodItems>([]);
  const fetcher = useFetcher();

  // // TODO: This does not look like the remix way of doing things
  // // set graph/table share data by period to shareDataByPeriod from loader
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

  function handleStockPeriod(range: string, interval: string = "1d") {
    console.log("handleStockPeriod");
    console.log("range", "interval");
    console.log(range, interval);
    setPeriod(range);
    fetcher.load(
      `/shares/query-share-data?shareCode=${params.shareCode}&range=${range}&interval=${interval}`
    );
  }

  useEffect(() => {
    if (fetcher.data) {
      // console.log("calling fetcher data");
      console.log("fetcher");
      console.log(fetcher.data);
      // setShareDataByPeriod(fetcher.data);
    }
  }, [fetcher]);
  // console.log("SHARE DATA BY PERIOD");
  // console.log(shareDataByPeriod);
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
