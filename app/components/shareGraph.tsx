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
  handleStockPeriod: (period: string) => void;
  handleDisplayMode: (mode: string) => void;
  period: string;
  start: string;
  end: string;
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
        start={props.start}
        end={props.end}
      />
      <div className="px-4 pt-2 text-slate-600">
        <span className="text-xs rounded-lg">Selected period: </span>
        <span className="text-sm rounded-lg text-rose-600">
          {formatDateForDisplay(props.start)} -{" "}
          {formatDateForDisplay(props.end)}
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
