import React, { useState, useLayoutEffect } from 'react';
import { FinancialTableData } from '@modules/financial/components/FinancialTableData/FinancialTableData';
import { FinancialCardList } from '@modules/financial/components/FinancialCardList/FinancialCardList';
import { useFinancialQuotations } from '@modules/financial/hooks/useFinancialQuotations';
import { FinancialViewProps } from '@modules/financial/types/FinancialData.type';

const MobileView = React.memo(({ loading, quotations, error }: FinancialViewProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FinancialCardList
        quotations={quotations}
        loading={loading}
        error={error}
      />
  </div>
));

const DesktopView = React.memo(({ loading, quotations, error }: FinancialViewProps) => (
  <div className="bg-white shadow overflow-x sm:rounded-lg mb-6">
    <FinancialTableData quotations={quotations} loading={loading} error={error} /> 
  </div>
));

export const FinancialView: React.FC = () => {
  const { loading, quotations, error } = useFinancialQuotations();
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();

    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkIsMobile, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">   
          {isMobile 
            ? <MobileView quotations={quotations} loading={loading} error={error} />
            : <DesktopView quotations={quotations} loading={loading} error={error} />
          }
      </main>
    </div>
  );
};
