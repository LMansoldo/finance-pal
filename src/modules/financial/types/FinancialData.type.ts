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

export interface FinancialData {
  id: string;
  name: string;
  type: 'currency' | 'stock' | 'bitcoin';
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
