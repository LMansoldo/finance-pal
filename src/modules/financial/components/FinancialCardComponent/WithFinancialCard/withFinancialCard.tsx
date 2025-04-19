import React from 'react';
import { FinancialData } from '@modules/financial/types/FinancialData.type';

interface WithFinancialCardProps {
  quotation: FinancialData;
}

export const withFinancialCard = <P extends object>(
  Component: React.ComponentType<P & WithFinancialCardProps>
) => {
  return (props: P & WithFinancialCardProps) => {
    return (
      <div className="bg-secondary-800 rounded-lg shadow-md p-4 flex flex-col h-full border border-secondary-600 hover:border-secondary-500 transition-colors">
        <Component {...props} />
      </div>
    );
  };
};
