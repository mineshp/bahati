import React from 'react';
import type { StockDataByPeriodItems, TotalShareItemsByCode } from "../types/shares";
import { formatDateForDisplay } from '../utils/date';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface Props {
  shareCode: string;
  shareData: StockDataByPeriodItems;
  originalData: TotalShareItemsByCode;
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
  const { shareCode, shareData, originalData } = prop;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: `${shareCode} shares`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Period'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Share Price'
        }
      }
    }
  };

  const labels = shareData.map(({ Date }) => formatDateForDisplay(Date))

  const openingPrices = [
    {
      label: 'Opening price',
      data: shareData.map(({ Open }) => Open),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(224, 174, 185, 0.5)',
      tension: 0.4,
      fill: true
    }
  ];

  const purchaseHistoryLines = originalData.map(({ originalCostPrice, totalShares, purchaseDate }) => ({
      label: `${totalShares} bought on ${purchaseDate}`,
      data: shareData.map(() => originalCostPrice),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      pointRadius: 0
  }));

  const datasets = openingPrices.concat(purchaseHistoryLines);

  const data = {
    labels,
    datasets,
  };

  return <div className="p-4"><Line options={options} data={data} /></div>;
}
