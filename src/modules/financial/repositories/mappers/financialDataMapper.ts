import { AssetItem, CurrencyItem, FinancialData, FinancialResponse } from '@modules/financial/types/FinancialData.type';

export class FinancialDataMapper {
  mapResponseToFinancialData(response: FinancialResponse): FinancialData[] {
    const results = response.results;
    const { source = 'USD' } = results.currencies || {};
    
    const currencies = this.mapCurrencies(results.currencies || {}, source.toString());
    const stocks = this.mapStocks(results.stocks || {});
    const bitcoin = this.mapBitcoin(results.bitcoin || {}, source.toString());
    
    return [...currencies, ...stocks, ...bitcoin];
  }
  
  private mapCurrencies(currencies: Record<string, CurrencyItem>, source: string): FinancialData[] {
    return Object.entries(currencies)
      .filter(([key]) => key !== 'source')
      .map(([key, value]: [string, CurrencyItem]) => ({
        id: key,
        source: source,
        name: value.name,
        buy: value.buy,
        sell: value.sell,
        variation: value.variation,
        type: 'currency' as const
      })).slice(0, 3);
  }
  
  private mapStocks(stocks: Record<string, AssetItem>): FinancialData[] {
    return Object.entries(stocks)
      .map(([key, value]: [string, AssetItem]) => ({
        id: key,
        name: value.name,
        location: value.location,
        points: value.points,
        variation: value.variation,
        type: 'stock' as const
      })).slice(0, 3);
  }
  
  private mapBitcoin(bitcoin: Record<string, CurrencyItem>, source: string): FinancialData[] {
    return Object.entries(bitcoin)
      .map(([key, value]: [string, CurrencyItem]) => ({
        id: key,
        name: value.name,
        source: source,
        buy: value.buy,
        sell: value.sell,
        variation: value.variation,
        type: 'bitcoin' as const
      })).slice(0, 4);
  }
}

export const financialDataMapper = new FinancialDataMapper();
