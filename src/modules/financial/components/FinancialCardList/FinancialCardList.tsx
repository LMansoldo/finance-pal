import React from 'react';
import { FinancialCard } from '@modules/financial/components/FinancialCardComponent/FinancialCard';
import { FinancialViewProps } from '@modules/financial/types/FinancialData.type';
import { Skeleton } from '@shared/components/Skeleton/Skeleton';
import { Messages } from '@shared/constants/messages';

export const FinancialCardList: React.FC<FinancialViewProps> = ({ quotations, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-4 bg-secondary-800 rounded shadow w-full">
            <Skeleton height="150px" className="mb-4" />
            <Skeleton height="20px" width="60%" />
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="40%" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">{Messages.DATA_NOT_FOUND}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
      {quotations.map((quotation) => (
        <FinancialCard
          key={quotation.id}
          quotation={quotation}
        />
      ))}
    </div>
  );
};