import React from 'react';
import type { StockDataByPeriodItems } from "../types/shares";
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface Props {
  shareCode: string;
  shareData: StockDataByPeriodItems;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart(prop: Props) {
  const { shareCode, shareData } = prop;

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
  };

  const labels = shareData.map(({ Date }) => formatDateForDisplay(Date))

  const data = {
    labels,
    datasets: [
      {
        label: 'Opening price',
        data: shareData.map(({ Open }) => Open),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => [1,4,8,3,5,2,5,2,5,7,8,5,,5,6]),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return <Line options={options} data={data} />;
}
