import ShareNav from "./shareNav";
import Chart from "./chart";
import Table from "./table";
import { formatDateForDisplay } from "../utils/date";
import type {
  StockDataByPeriodItems,
  TotalShareItemsByCode,
} from "../types/shares";

interface Props {
  shareCode: string;
  displayData: string;
  handleStockPeriod: (range: string, interval: string) => void;
  handleDisplayMode: (mode: string) => void;
  interval: string;
  shareDataByPeriod: StockDataByPeriodItems;
  totalSharesByCode: TotalShareItemsByCode;
}

export default function ShareGraph(props: Props) {
  return props.shareDataByPeriod.length > 0 ? (
    <div className="px-4">
      <ShareNav
        shareCode={props.shareCode as string}
        displayData={props.displayData}
        handleStockPeriod={props.handleStockPeriod}
        handleDisplayMode={props.handleDisplayMode}
      />
      <div className="flex flex-row px-4 pt-2 text-slate-600">
        <div className="rounded-lg text-xs">Selected period: </div>
        <div className="rounded-lg text-xs text-rose-600">
          {`${formatDateForDisplay(
            props.shareDataByPeriod[0]?.timestamp
          )} - ${formatDateForDisplay(
            props.shareDataByPeriod?.slice(-1)[0]?.timestamp
          )}`}
        </div>
      </div>
      {props.displayData === "table" ? (
        <Table data={props.shareDataByPeriod} />
      ) : (
        <Chart
          shareData={props.shareDataByPeriod}
          shareCode={props.shareCode as string}
          shareInfoHeld={props.totalSharesByCode}
          interval={props.interval}
        />
      )}
    </div>
  ) : null;
}
