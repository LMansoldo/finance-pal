import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { cacheService } from './cache';
import { financialApiService } from './api';
import { historyService } from './history';
import { financialDataMapper } from './mappers';
import { Messages } from '@shared/constants/messages';

export const financialRepository = {
  async getQuotations(): Promise<FinancialData[]> {
    const cacheKey = 'quotations';
    
    try {
      const cachedData = cacheService.get<FinancialData[]>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      
      const response = await financialApiService.fetchQuotations();
      const processedData = financialDataMapper.mapResponseToFinancialData(response);
      
      cacheService.set(cacheKey, processedData);
      
      return processedData;
    } catch (error) {
      console.error(`${Messages.QUOTATION_ERROR}`, error);
      
      const expiredCache = cacheService.getExpired<FinancialData[]>(cacheKey);
      if (expiredCache) {
        return expiredCache;
      }
      
      return [];
    }
  },
  
  clearCache(key?: string): void {
    cacheService.clear(key);
  },
  
  saveQuotationHistory(quotation: FinancialData): void {
    historyService.saveQuotationHistory(quotation);
  },
  
  getQuotationHistory(quotationId: string) {
    return historyService.getQuotationHistory(quotationId);
  }
};
