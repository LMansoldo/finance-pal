import financeApi from '@shared/services/api';
import { AssetItem, CurrencyItem, FinancialData, FinancialResponse } from '@modules/financial/types/FinancialData.type';

const financialRoutes = {
  getQuotations: () => '/finance',
};

export const financialRepository = {
  async getQuotations(): Promise<FinancialData[]> {
    try {
      const response = await financeApi.get<FinancialResponse>(financialRoutes.getQuotations());
      const results = response.results;
      
      const currencies = Object.entries(results.currencies || {})
        .filter(([key]) => key !== 'source')
        .map(([key, value]: [string, CurrencyItem]) => ({
          id: key,
          name: value.name,
          buy: value.buy,
          sell: value.sell,
          variation: value.variation,
          type: 'currency' as const
        }));        
      
      const stocks = Object.entries(results.stocks || {})
        .map(([key, value]: [string, AssetItem]) => ({
          id: key,
          name: value.name,
          location: value.location,
          points: value.points,
          variation: value.variation,
          type: 'stock' as const
        }));

      const bitcoins = Object.entries(results.bitcoins || {})
        .map(([key, value]: [string, AssetItem]) => ({
          id: key,
          name: value.name,
          location: value.location,
          points: value.points,
          variation: value.variation,
          type: 'bitcoin' as const
        }));        
      return [...currencies, ...stocks, ...bitcoins];
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
      return [];
    }
  },
  
  saveQuotationHistory(quotation: FinancialData): void {
    const now = new Date();
    const history = JSON.parse(localStorage.getItem(`history_${quotation.id}`) || '[]');
    
    history.push({
      ...quotation,
      timestamp: now.getTime()
    });
    
    localStorage.setItem(`history_${quotation.id}`, JSON.stringify(history));
  },
  
  getQuotationHistory(quotationId: string): FinancialResponse[] {
    return JSON.parse(localStorage.getItem(`history_${quotationId}`) || '[]');
  }
};
