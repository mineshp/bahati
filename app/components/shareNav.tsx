import { ChartBarIcon, TableIcon } from "@heroicons/react/outline";
import { Form, Link } from "@remix-run/react";
import { useEffect, useState } from "react";

interface Props {
  shareCode: string;
  displayData: string;
  period: string;
  handleStockPeriod: (range: string, interval: string) => void;
  handleDisplayMode: (mode: string) => void;
}

export default function ShareNav(prop: Props) {
  const {
    shareCode,
    displayData,
    handleStockPeriod,
    handleDisplayMode,
    period,
  } = prop;

  const [range, setRange] = useState<string>("5d");
  const [graphInterval, setGraphInterval] = useState<string>("1d");

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
                  isActive("5d") ? "border border-rose-300 bg-rose-500" : ""
                }`}
                onClick={() => {
                  // setRange("5d");
                  // setGraphInterval("1d");
                  handleStockPeriod("5d", "1d");
                }}
                name="5d"
              >
                5d
              </button>
            </li>
            <li className="mr-4">
              <button
                type="submit"
                className={`items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm ${
                  isActive("1m") ? "bg-rose-500" : ""
                }`}
                onClick={() => {
                  // console.log("CLICKING BTN WITH 1m");
                  // setRange("1m");
                  // setGraphInterval("1d");
                  handleStockPeriod("1m", "1w");
                }}
                name="1m"
              >
                1m
              </button>
            </li>
            <li className="mr-4">
              <button
                type="submit"
                className={`items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm ${
                  isActive("3m") ? "bg-rose-500" : ""
                }`}
                onClick={() => {
                  // setRange("3m");
                  // setGraphInterval("1d");
                  handleStockPeriod("3m", "1w");
                }}
                name="3m"
              >
                3m
              </button>
            </li>
            <li className="mr-4">
              <button
                type="submit"
                className={`mr-4 items-center rounded border border-rose-500 bg-rose-300 px-2 py-2 text-xs font-bold text-white hover:border-rose-300 hover:bg-rose-500 sm:px-3 sm:py-2.5 sm:text-sm ${
                  isActive("1y") ? "bg-rose-500" : ""
                }`}
                onClick={() => {
                  // setRange("1y");
                  // setGraphInterval("1d");
                  handleStockPeriod("1y", "1m");
                }}
                name="1y"
              >
                1y
              </button>
            </li>
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
