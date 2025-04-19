import React, { useEffect, useState, useLayoutEffect } from 'react';
import { financialRepository } from '@modules/financial/repositories/financialRepository';
import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { FinancialTableData } from '@modules/financial/components/FinancialTableData/FinancialTableData';
import { FinancialCard } from '@modules/financial/components/FinancialCardComponent/FinancialCard';

const MobileView = React.memo(({ quotations }: { quotations: FinancialData[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {quotations.map((quotation) => (
      <FinancialCard key={quotation.id} quotation={quotation} />
    ))}
  </div>
));

const DesktopView = React.memo(({ quotations }: { quotations: FinancialData[] }) => (
  <div className="bg-white shadow overflow-x sm:rounded-lg mb-6">
    <FinancialTableData quotations={quotations} /> 
  </div>
));

export const FinancialView: React.FC = () => {
  const [quotations, setQuotations] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await financialRepository.getQuotations();
        setQuotations(data);
        
        data.forEach(quotation => {
          financialRepository.saveQuotationHistory(quotation);
        });
      } catch (error) {
        console.error("Erro ao buscar cotações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="loader">Carregando...</div>
          </div>
        ) : (
          <>
            {isMobile 
              ? <MobileView quotations={quotations} />
              : <DesktopView quotations={quotations} />
            }
          </>
        )}
      </main>
    </div>
  );
};
