import React, { useEffect, useRef } from 'react';
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
  TooltipModel,
  TooltipItem,
} from 'chart.js';

import { FinancialType } from '@modules/financial/enums/financialType.enum';
import { FinancialQuotationChartProps } from '@modules/financial/types/FinancialData.type';
import { formatCurrency, getCurrencySymbol } from '@modules/financial/helpers/currency.helper';
import { Messages } from '@shared/constants/messages';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, PointElement, Legend);


export const FinancialQuotationChart: React.FC<FinancialQuotationChartProps> = ({ history, type }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentChart = chartRef.current;
    const resizeObserver = new ResizeObserver(() => {
    
      if (currentChart) {
        window.dispatchEvent(new Event('resize'));
      }
    });

    if (currentChart) {
      resizeObserver.observe(currentChart);
    }

    return () => {
      if (currentChart) {
        resizeObserver.unobserve(currentChart);
      }
    };
  }, []);

  if (history.length === 0) {
    return (
      <div className="p-6 rounded text-center">
        <p className="text-gray-100">{Messages.INSUFICIENT_CHART_DATA}</p>
      </div>
    );
  }

  const labels = history.map((item) => {
    const date = new Date(item.timestamp || 0);
    return date.toLocaleDateString();
  });

  const dataValues = history.map((item) => item.sell || item.buy || 0);
  
  const getCurrencyID = () => {
    if (type === FinancialType.CURRENCY && history.length > 0 && history[0].id) {
      return history[0].id;
    } else if (type === FinancialType.BITCOIN) {
      return 'BTC';
    } else if (type === FinancialType.STOCK) {
      return 'USD';
    }
    return 'USD';
  };
  
  const currencyID = getCurrencyID();

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(this: TooltipModel<"line">, tooltipItem: TooltipItem<"line">) {
            const value = tooltipItem.raw;
            if (type === FinancialType.CURRENCY) {
              return formatCurrency(currencyID, value as number);
            } else if (type === FinancialType.BITCOIN) {
              return `${value} BTC`;
            } else if (type === FinancialType.STOCK) {
              return `${getCurrencySymbol('USD')} ${value}`;
            }
            return value?.toString();
          }
        }
      }
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
        type: 'linear' as const,
        ticks: {
          color: '#f2f3f5',
          callback: function(value: string | number) {
            if (type === FinancialType.CURRENCY) {
              return `${getCurrencySymbol(currencyID)} ${value}`;
            } else if (type === FinancialType.BITCOIN) {
              return `${value} BTC`;
            } else if (type === FinancialType.STOCK) {
              return `${getCurrencySymbol('USD')} ${value}`;
            }
            return value.toString();
          }
        },
        grid: {
          color: '#444',
        },
      },
    },
  };

  const getChartTitle = () => {
    if (type === FinancialType.CURRENCY) {
      return `Cotação ${currencyID}`;
    } else if (type === FinancialType.BITCOIN) {
      return 'Cotação Bitcoin';
    } else if (type === FinancialType.STOCK) {
      return 'Cotação de Ações';
    }
    return 'Cotação';
  };

  return (
    <div ref={chartRef} className="w-full h-64 md:h-96 max-w-full overflow-hidden">
      <h3 className="text-center text-gray-100 mb-2">{getChartTitle()}</h3>
      <Line data={data} options={options} />
    </div>
  );
};