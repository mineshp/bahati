import { ChartBarIcon, TableIcon } from "@heroicons/react/outline";
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
  const {
    shareCode,
    displayData,
    handleStockPeriod,
    handleDisplayMode,
    period,
    start,
    end,
  } = prop;

  function isActive(buttonVal: string) {
    return period === buttonVal;
  }

  return (
    <div className="rounded-lg border">
      <Form method="post">
        <div className="flex h-12 items-center rounded-lg bg-gray-200 px-4">
          <ul className="flex items-center">
            <li className="mr-4">
              <button
                type="submit"
                className={`items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm  ${
                  isActive("1W") ? "border border-rose-300 bg-rose-500" : ""
                }`}
                onClick={() => handleStockPeriod("1W")}
                name="1W"
              >
                1W
              </button>
            </li>
            <li className="mr-4">
              <button
                type="submit"
                className={`items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm ${
                  isActive("1M") ? "bg-rose-500" : ""
                }`}
                onClick={() => handleStockPeriod("1M")}
                name="1M"
              >
                1M
              </button>
            </li>
            <li className="mr-4">
              <button
                type="submit"
                className={`items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm ${
                  isActive("3M") ? "bg-rose-500" : ""
                }`}
                onClick={() => handleStockPeriod("3M")}
                name="3M"
              >
                3M
              </button>
            </li>
            <li className="mr-4">
              <button
                type="submit"
                className={`mr-4 items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm ${
                  isActive("1Y") ? "bg-rose-500" : ""
                }`}
                onClick={() => handleStockPeriod("1Y")}
                name="1Y"
              >
                1Y
              </button>
            </li>
            <input
              type="text"
              name="share_code"
              value={shareCode}
              hidden
              readOnly
            ></input>
            <input
              type="text"
              name="start_date"
              value={start}
              hidden
              readOnly
            ></input>
            <input
              type="text"
              name="end_date"
              value={end}
              hidden
              readOnly
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>

            <li className="ml-4 justify-end">
              {displayData === "chart" ? (
                <button
                  type="button"
                  className="h-9 w-9 items-center justify-center text-indigo-300 hover:text-indigo-500"
                  onClick={() => handleDisplayMode("table")}
                >
                  <ChartBarIcon
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="h-9 w-9 items-center text-indigo-300 hover:text-indigo-500"
                  onClick={() => handleDisplayMode("chart")}
                >
                  <TableIcon className="h-8 w-8" aria-hidden="true" />
                </button>
              )}
            </li>
          </ul>
        </div>
      </Form>
    </div>
  );
}
