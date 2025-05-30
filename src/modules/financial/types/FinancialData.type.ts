import { FinancialType } from "../enums/financialType.enum";
export interface BaseFinancialItem {
  name: string;
  variation: number;
}

export interface CurrencyItem extends BaseFinancialItem {
  buy: number;
  sell: number;
  source?: string;
  format?: string[];
}

export interface AssetItem extends BaseFinancialItem {
  location: string;
  points: number;
}

export interface FinancialViewProps {
  loading: boolean;
  quotations: FinancialData[];
  error: Error | null;
}

export interface FinancialData {
  id: string;
  name: string;
  type: FinancialType;
  buy?: number;
  sell?: number;
  points?: number;
  variation: number;
  source?: string;
  location?: string;
  timestamp?: number;
}

export interface FinancialResponse {
  by: string;
  valid_key: string;
  execution_time: number;
  from_cache: boolean;
  results: {
    currencies: {
      [key: string]: CurrencyItem;
    };
    stocks: {
      [key: string]: AssetItem;
    };
    bitcoin: {
      [key: string]: CurrencyItem;
    }
  };
}

export interface FinancialQuotationChartProps {
  history: FinancialData[];
  type: FinancialType;
}