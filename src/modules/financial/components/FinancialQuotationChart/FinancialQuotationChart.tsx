import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  PointElement,
  Legend,
} from 'chart.js';

import { FinancialData } from '@modules/financial/types/FinancialData.type';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, PointElement, Legend);

interface FinancialQuotationChartProps {
  history: FinancialData[];
  type: 'currency' | 'stock' | 'bitcoin';
}

export const FinancialQuotationChart: React.FC<FinancialQuotationChartProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="p-6 rounded text-center">
        <p className="text-gray-100">Não há dados suficientes para exibir o gráfico.</p>
      </div>
    );
  }

  const labels = history.map((item) => {
    const date = new Date(item.timestamp || 0);
    return date.toLocaleDateString();
  });

  const dataValues = history.map((item) => item.sell || item.buy || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Valor ao longo do tempo',
        data: dataValues,
        fill: false,
        borderColor: '#727cf5',
        
        color: '#f2f3f5',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#f2f3f5',
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        ticks: {
          color: '#f2f3f5'
        },
        grid: {
          color: '#444',
        },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-96">
      <Line data={data} options={options} />
    </div>
  );
};
