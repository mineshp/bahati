import type {
  StockDataByPeriodItem,
  StockDataByPeriodItems,
} from "../types/shares";
import { formatDateForDisplay } from "../utils/date";

interface Props {
  data: StockDataByPeriodItems;
}

export default function TableData(prop: Props) {
  const { data } = prop;
  const rowData = data.map((shareRecord: StockDataByPeriodItem) => {
    return (
      <tr key={`${shareRecord.timestamp}`}>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          {formatDateForDisplay(shareRecord.timestamp)}
        </td>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          {shareRecord.open.toFixed(3)}
        </td>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          {shareRecord.close.toFixed(3)}
        </td>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          {shareRecord?.gainLossValue}
        </td>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          {shareRecord?.gainLossPercentage}%
        </td>
        <td className="whitespace-no-wrap hidden border-b border-gray-200 px-6 py-4 text-sm text-cyan-800 md:table-cell">
          {shareRecord.high.toFixed(3)}
        </td>
        <td className="whitespace-no-wrap hidden border-b border-gray-200 px-6 py-4 text-sm text-cyan-800 md:table-cell">
          {shareRecord.low.toFixed(3)}
        </td>
      </tr>
    );
  });
  return (
    <div className="flex flex-col p-4">
      <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
          <table className="min-w-full" id="tableFormat">
            <thead>
              <tr className="border-b border-blue-400 bg-indigo-100 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-400">
                <th className="px-6 py-3 ">Date</th>
                <th className="px-6 py-3 ">Open</th>
                <th className="px-6 py-3 ">Close</th>
                <th className="px-6 py-3 ">Daily Change (Value)</th>
                <th className="px-6 py-3 ">Daily Change (%)</th>
                <th className="hidden px-6 py-3 md:table-cell">High</th>
                <th className="hidden px-6 py-3 md:table-cell">Low</th>
              </tr>
            </thead>

            <tbody className="bg-white">{rowData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
