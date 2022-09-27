import { ChartBarIcon, TableIcon } from '@heroicons/react/outline';
import { Form } from "@remix-run/react";

interface Props {
  shareCode: string;
  displayData: string;
  period: string;
  start: string;
  end: string;
  handleStockPeriod: (period: string) => void;
  handleDisplayMode: (mode: string) => void;
}

export default function ShareNav(prop: Props) {
  const { shareCode, displayData, handleStockPeriod, handleDisplayMode, period, start, end} = prop;

  function isActive(buttonVal: string) {
    return period  === buttonVal
  } 

  return (
    <Form method="post">
      <div className="flex items-center h-12 px-4 bg-gray-200 rounded-lg">
        <ul className="flex items-center">
          <li className="mr-4">
            <button type="submit" className={`items-center px-3 py-2 font-bold text-white bg-rose-300 border border-rose-500 rounded hover:bg-rose-500 hover:border-rose-300  ${isActive('1W') ? 'bg-rose-500 border border-rose-300' : ''}`} onClick={() => handleStockPeriod('1W')} name='1W'>1W</button>
          </li>
          <li className="mr-4">
          <button type="submit" className={`items-center px-3 py-2 font-bold text-white bg-rose-300 border border-rose-500 rounded hover:bg-rose-500 hover:border-rose-300 ${isActive('1M') ? 'bg-rose-500' : ''}`} onClick={() => handleStockPeriod('1M')} name='1M'>1M</button>
          </li>
          <li className="mr-4">
          <button type="submit" className={`items-center px-3 py-2 font-bold text-white bg-rose-300 border border-rose-500 rounded hover:bg-rose-500 hover:border-rose-300 ${isActive('3M') ? 'bg-rose-500' : ''}`} onClick={() => handleStockPeriod('3M')} name='3M'>3M</button>
          </li>
          <li className="mr-4">
          <button type="submit" className={`items-center px-4 py-2 mr-4 font-bold text-white bg-rose-300 border border-rose-500 rounded hover:bg-rose-500 hover:border-rose-300 ${isActive('1Y') ? 'bg-rose-500' : ''}`} onClick={() => handleStockPeriod('1Y')} name='1Y'>1Y</button>
          </li>
          <input type="text" name="share_code" value={shareCode} hidden readOnly></input>
          <input type="text" name="start_date" value={start} hidden readOnly></input>
          <input type="text" name="end_date" value={end} hidden readOnly></input>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>

          <li className="justify-end ml-4">
              { displayData === 'chart'
                ? <button type="button" className="items-center justify-center text-indigo-300 w-9 h-9 hover:text-indigo-500" onClick={() => handleDisplayMode('table')}><ChartBarIcon className="w-8 h-8" aria-hidden="true" /></button>
                : <button type="button" className="items-center text-indigo-300 w-9 h-9 hover:text-indigo-500" onClick={() => handleDisplayMode('chart')}><TableIcon className="w-8 h-8" aria-hidden="true"/></button>
              }
          </li>
        </ul>
      </div>
   </Form>
  );
}