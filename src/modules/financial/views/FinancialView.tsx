import React, { useEffect, useState, useLayoutEffect, useMemo } from 'react';
import { financialRepository } from '@modules/financial/repositories/financialRepository';
import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { useAuth } from '@modules/auth/context/AuthContext';
import { FinancialTableData } from '@modules/financial/components/FinancialTableData/FinancialTableData';
import { FinancialCard } from '@modules/financial/components/FinancialCardComponent/FinancialCard';

export const FinancialView: React.FC = () => {
  const [quotations, setQuotations] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  useLayoutEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
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

  const mobileView = useMemo(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {quotations.map((quotation) => (
        <FinancialCard key={quotation.id} quotation={quotation} />
      ))}
    </div>
  ), [quotations]);

  const desktopView = useMemo(() => (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <FinancialTableData quotations={quotations} /> 
    </div>
  ), [quotations]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Cotações Financeiras</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">Olá, {user?.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="loader">Carregando...</div>
          </div>
        ) : (
          <>
            {isMobile ? mobileView : desktopView}
          </>
        )}
      </main>
    </div>
  );
};
