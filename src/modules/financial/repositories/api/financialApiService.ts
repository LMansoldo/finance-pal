import financeApi from '@shared/services/api';
import { FinancialResponse } from '@modules/financial/types/FinancialData.type';

const financialRoutes = {
  getQuotations: () => '/finance',
};

export class FinancialApiService {
  async fetchQuotations(): Promise<FinancialResponse> {
    const response = await financeApi.get<FinancialResponse>(financialRoutes.getQuotations());
    return response;
  }
}

export const financialApiService = new FinancialApiService();
