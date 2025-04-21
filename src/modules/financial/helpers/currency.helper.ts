import { Messages } from "@shared/constants/messages";

/**
 * Formata um valor em centavos para uma moeda específica
 * @param source Código da moeda (USD, BRL, EUR, etc)
 * @param cents Valor em centavos
 * @returns String formatada com o valor e símbolo da moeda
 */
export const formatCurrency = (source: string = 'USD', cents: number = 0): string => {
    const value = floatToCents(cents) / 100;
    
    const currencyConfig: Record<string, { locale: string, currency: string, symbol?: string }> = {
      USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
      BRL: { locale: 'pt-BR', currency: 'BRL', symbol: 'R$' },
      EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
      GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
      JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
      CNY: { locale: 'zh-CN', currency: 'CNY', symbol: '¥' },
      AUD: { locale: 'en-AU', currency: 'AUD', symbol: 'A$' },
      CAD: { locale: 'en-CA', currency: 'CAD', symbol: 'C$' },
      CHF: { locale: 'de-CH', currency: 'CHF', symbol: 'CHF' },
      INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
    };
    
    const config = currencyConfig[source] || { locale: 'en-US', currency: source };
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
        console.error(`${Messages.FORMAT_CURRENCY_ERROR} ${source}: ${error}`);
        const symbol = config.symbol || source;
        return `${symbol} ${value.toFixed(2)}`;
    }
  };  
  /**
   * Formata um valor em centavos para uma moeda específica sem o símbolo
   * @param source Código da moeda (USD, BRL, EUR, etc)
   * @param cents Valor em centavos
   * @returns String formatada apenas com o valor numérico
   */
  export const formatCurrencyValue = (source: string = 'USD', cents: number = 0): string => {
    const value = floatToCents(cents) / 100;
    
    const currencyConfig: Record<string, { locale: string, decimalSeparator: string, thousandsSeparator: string }> = {
      USD: { locale: 'en-US', decimalSeparator: '.', thousandsSeparator: ',' },
      BRL: { locale: 'pt-BR', decimalSeparator: ',', thousandsSeparator: '.' },
      EUR: { locale: 'de-DE', decimalSeparator: ',', thousandsSeparator: '.' },
      GBP: { locale: 'en-GB', decimalSeparator: '.', thousandsSeparator: ',' },
      JPY: { locale: 'ja-JP', decimalSeparator: '.', thousandsSeparator: ',' },
      CNY: { locale: 'zh-CN', decimalSeparator: '.', thousandsSeparator: ',' },
      AUD: { locale: 'en-AU', decimalSeparator: '.', thousandsSeparator: ',' },
      CAD: { locale: 'en-CA', decimalSeparator: '.', thousandsSeparator: ',' },
      CHF: { locale: 'de-CH', decimalSeparator: '.', thousandsSeparator: '\'' },
      INR: { locale: 'en-IN', decimalSeparator: '.', thousandsSeparator: ',' },
    };
    
    const config = currencyConfig[source] || { locale: 'en-US', decimalSeparator: '.', thousandsSeparator: ',' };
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
        console.error(`${Messages.FORMAT_CURRENCY_ERROR} ${source}: ${error}`);
        return value.toFixed(2).replace('.', config.decimalSeparator);
    }
  };
  
  /**
   * Retorna apenas o símbolo da moeda
   * @param source Código da moeda (USD, BRL, EUR, etc)
   * @returns Símbolo da moeda
   */
  export const getCurrencySymbol = (source: string): string => {
    const symbolMap: Record<string, string> = {
      USD: '$',
      BRL: 'R$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CNY: '¥',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'CHF',
      INR: '₹',
    };
    
    return symbolMap[source] || source;
  };
  
  /**
   * Converte centavos para a unidade principal da moeda
   * @param cents Valor em centavos
   * @returns Valor na unidade principal
   */
  export const centsToUnit = (cents: number): number => {
    return cents / 100;
  };
  
  /**
   * Converte unidade principal para centavos
   * @param unit Valor na unidade principal
   * @returns Valor em centavos (inteiro)
   */
  export const unitToCents = (unit: number): number => {
    return Math.round(unit * 100);
  };

  /**
 * Converte um valor em ponto flutuante para inteiro (centavos)
 * Útil para converter valores de entrada do usuário para armazenamento
 * @param floatValue Valor em ponto flutuante (ex: 125.99)
 * @returns Valor em centavos como inteiro (ex: 12599)
 */
export const floatToCents = (floatValue: number): number => {
    return Math.round(floatValue * 100);
  };
  