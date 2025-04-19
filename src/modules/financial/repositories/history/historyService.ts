import { FinancialData, FinancialResponse } from '@modules/financial/types/FinancialData.type';

export class HistoryService {
  saveQuotationHistory(quotation: FinancialData): void {
    const now = new Date();
    const history = JSON.parse(localStorage.getItem(`history_${quotation.id}`) || '[]');
    
    history.push({
      ...quotation,
      timestamp: now.getTime()
    });
    
    localStorage.setItem(`history_${quotation.id}`, JSON.stringify(history));
  }
  
  getQuotationHistory(quotationId: string): FinancialResponse[] {
    return JSON.parse(localStorage.getItem(`history_${quotationId}`) || '[]');
  }
}

export const historyService = new HistoryService();
