export interface FinancialData {
    id: string;
    name: string;
    type: 'currency' | 'stock';
    buy?: number;
    sell?: number;
    points?: number;
    variation: number;
    location?: string;
    timestamp?: number;
  }