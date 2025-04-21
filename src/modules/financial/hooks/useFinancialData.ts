/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { financialRepository } from '@modules/financial/repositories/financialRepository';
import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { Messages } from '@shared/constants/messages';

export const useFinancialData = (quotationId?: string) => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<FinancialData | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const quotations = await financialRepository.getQuotations();
        setData(quotations);
        
        quotations.forEach(quotation => {
          financialRepository.saveQuotationHistory(quotation);
        });
        
        if (quotationId) {
          const current = quotations.find(q => q.id === quotationId) || null;
          setSelectedQuotation(current);
          
          if (current) {
            const quotationHistory = financialRepository.getQuotationHistory(quotationId);
            setHistory(quotationHistory);
          }
        }
      } catch (err) {
        console.error(`${Messages.FINANCIAL_DATA_ERROR}`, err);
        setError(`${Messages.FINANCIAL_DATA_NOT_FOUND}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    const interval = setInterval(
      fetchData, 
      quotationId ? 60000 : 300000
    );
    
    return () => clearInterval(interval);
  }, [quotationId]);

  return { data, selectedQuotation, history, loading, error };
};