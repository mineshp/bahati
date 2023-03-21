import { ChartBarIcon, TableIcon } from "@heroicons/react/outline";
import { Form } from "@remix-run/react";
import { useState } from "react";
import Dropdown from "./library/dropdown";

interface Props {
  shareCode: string;
  displayData: string;
  handleStockPeriod: (range: string, interval: string) => void;
  handleDisplayMode: (mode: string) => void;
}

export default function ShareNav(prop: Props) {
  const { shareCode, displayData, handleStockPeriod, handleDisplayMode } = prop;

  const [range, setRange] = useState<string>("5d");
  const [graphInterval, setGraphInterval] = useState<string>("1d");

  function updateStockPeriod(range: string, interval: string) {
    setRange(range);
    setGraphInterval(interval);
    return handleStockPeriod(range, interval);
  }

  const intervalData = [
    {
      id: 1,
      name: "5 Days",
      value: "5d",
      interval: "1d",
    },
    {
      id: 2,
      name: "1 Month",
      value: "1m",
      interval: "1w",
    },
    {
      id: 3,
      name: "3 Months",
      value: "3m",
      interval: "1w",
    },
    {
      id: 4,
      name: "1 Year",
      value: "1y",
      interval: "1m",
    },
  ];

  return (
    <div className="rounded-lg border">
      <Form method="post">
        <div className="flex h-12 items-center rounded-lg bg-indigo-100 px-4">
          <Dropdown options={intervalData} handleSelect={updateStockPeriod} />
          <ul className="flex items-center">
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

            <li className="justify-start">
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
            <input
              type="text"
              name="shareCode"
              value={shareCode}
              hidden
              readOnly
            ></input>
            <input
              type="text"
              name="range"
              value={range}
              hidden
              readOnly
            ></input>
            <input
              type="text"
              name="interval"
              value={graphInterval}
              hidden
              readOnly
            ></input>
          </ul>
        </div>
      </Form>
    </div>
  );
}
