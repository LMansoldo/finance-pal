import { useState, useEffect, useRef } from 'react';
import { financialRepository } from '../repositories/financialRepository';
import { FinancialData } from '../types/FinancialData.type';

export const useFinancialQuotations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [quotations, setQuotations] = useState<FinancialData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await financialRepository.getQuotations();
      setQuotations(data);
      data.forEach(quotation => {
        financialRepository.saveQuotationHistory(quotation);
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, 300000); 

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { loading, quotations, error };
};