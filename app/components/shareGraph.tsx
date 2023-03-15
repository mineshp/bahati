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
  period: string;
  shareDataByPeriod: StockDataByPeriodItems;
  totalSharesByCode: TotalShareItemsByCode;
}

export default function ShareGraph(props: Props) {
  return (
    <div className="px-4">
      <ShareNav
        shareCode={props.shareCode as string}
        displayData={props.displayData}
        handleStockPeriod={props.handleStockPeriod}
        handleDisplayMode={props.handleDisplayMode}
        period={props.period}
      />
      <div className="px-4 pt-2 text-slate-600">
        <span className="rounded-lg text-xs">Selected period: </span>
        <span className="rounded-lg text-sm text-rose-600">
          "DO WE STILL WANT TO DISPLAY A DATE HERE"
        </span>
      </div>
      {props.displayData === "table" ? (
        <Table data={props.shareDataByPeriod} />
      ) : (
        <Chart
          shareData={props.shareDataByPeriod}
          shareCode={props.shareCode as string}
          originalData={props.totalSharesByCode}
        />
      )}
    </div>
  );
}
