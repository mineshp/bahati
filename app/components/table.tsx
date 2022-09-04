
import type { StockDataByPeriodItem, StockDataByPeriodItems } from "../types/shares";
import { formatDateForDisplay } from '../utils/date';

interface Props {
  data: StockDataByPeriodItems;
}

export default function TableData(prop: Props) {
  const { data } = prop;
  const rowData = data.map((shareRecord: StockDataByPeriodItem) => {
    return (
      <tr key={`${shareRecord.Date}`}>
        <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800">{formatDateForDisplay(shareRecord.Date)}</td>
        <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800">{shareRecord.Open.toFixed(3)}</td>
        <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800">{shareRecord.Close.toFixed(3)}</td>
        <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800">{shareRecord.gainLossValue}</td>
        <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800">{shareRecord.gainLossPercentage.toFixed(1)}%</td>
        <td className="hidden px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800 md:table-cell">{shareRecord.High.toFixed(3)}</td>
        <td className="hidden px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-800 md:table-cell">{shareRecord.Low.toFixed(3)}</td>
      </tr>
    );
  });
  return (
    <div className="flex flex-col p-4">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400">
                            Date</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400">
                            Open</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400">
                            Close</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400">
                            Daily Change (Value)</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400">
                            Daily Change (%)</th>
                        <th
                            className="hidden px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400 md:table-cell">
                            High</th>
                        <th
                            className="hidden px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-blue-100 border-b border-blue-400 md:table-cell">
                            Low</th>
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {rowData}
                </tbody>
            </table>
        </div>
    </div>
</div>
  );
}