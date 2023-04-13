import React from "react";
import type {
  StockDataByPeriodItems,
  TotalShareItemsByCode,
} from "../types/shares";
import { formatDateForDisplay } from "../utils/date";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface Props {
  shareCode: string;
  shareData: StockDataByPeriodItems;
  shareInfoHeld: TotalShareItemsByCode;
  interval: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Chart(prop: Props) {
  const { shareCode, shareData, shareInfoHeld, interval } = prop;

  const graphPeriod: { [key: string]: string } = {
    "1d": "days",
    "1wk": "weeks",
    "1mo": "months",
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: `${shareCode} shares`,
        color: "rgb(129, 140, 248)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: `Period (${graphPeriod[interval]})`,
          color: "rgb(251, 113, 133)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Share Price",
          color: "rgb(251, 113, 133)",
        },
      },
    },
  };

  const labels = shareData.map(({ timestamp }) =>
    formatDateForDisplay(timestamp)
  );

  const openingPrices = [
    {
      label: "Opening price",
      data: shareData.map(({ open }) => open),
      borderColor: "rgb(251, 113, 133)",
      backgroundColor: "rgba(254, 205, 211, 0.5)",
      tension: 0.4,
      fill: true,
    },
  ];

  const purchaseHistoryLines = shareInfoHeld.map(
    ({ originalCostPrice, totalShares, purchaseDate }) => ({
      label: `${totalShares} bought on ${purchaseDate}`,
      data: shareData.map(() => originalCostPrice),
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(199, 210, 254, 0.5)",
      pointRadius: 0,
    })
  );

  // @ts-ignore
  const datasets = openingPrices.concat(purchaseHistoryLines);

  const data = {
    labels,
    datasets,
  };

  return (
    <div className="w-200 h-80 p-4">
      <Line options={options} data={data} />
    </div>
  );
}
