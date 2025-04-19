/**
 * Formata um preço de ação para exibição
 * Similar ao formato usado no app Stocks da Apple
 * 
 * @param price Preço da ação como número de ponto flutuante
 * @param locale Localidade para formatação (padrão: 'en-US')
 * @returns String formatada do preço
 */
export const formatStockPrice = (price: number = 0, locale: string = 'en-US'): string => {
    let fractionDigits = 2;
    
    if (price >= 1000) {
      fractionDigits = 2;
    } else if (price >= 100) {
      fractionDigits = 2;
    } else if (price >= 10) {
      fractionDigits = 3;
    } else {
      fractionDigits = 4;
    }
    
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(price);
  };
  
  /**
   * Formata a variação de preço (absoluta)
   * 
   * @param priceChange Variação de preço como número de ponto flutuante
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada da variação de preço com sinal
   */
  export const formatPriceChange = (priceChange: number, locale: string = 'en-US'): string => {
    const sign = priceChange > 0 ? '+' : '';
    const fractionDigits = Math.abs(priceChange) < 10 ? 2 : 2;
    
    return `${sign}${new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(priceChange)}`;
  };
  
  /**
   * Formata a variação percentual
   * 
   * @param percentChange Variação percentual como número de ponto flutuante
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada da variação percentual com sinal e símbolo %
   */
  export const formatPercentChange = (percentChange: number, locale: string = 'en-US'): string => {
    const sign = percentChange > 0 ? '+' : '';
    
    return `${sign}${new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(percentChange)}%`;
  };
  
  /**
   * Formata um valor de índice de mercado (como S&P 500, Dow Jones, etc.)
   * 
   * @param indexValue Valor do índice como número de ponto flutuante
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada do valor do índice
   */
  export const formatMarketIndex = (indexValue: number, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(indexValue);
  };
  
  /**
   * Formata um valor de volume de negociação
   * Exibe em K (milhares), M (milhões) ou B (bilhões) dependendo do tamanho
   * 
   * @param volume Volume como número inteiro
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada do volume
   */
  export const formatVolume = (volume: number, locale: string = 'en-US'): string => {
    if (volume >= 1_000_000_000) {
      return `${new Intl.NumberFormat(locale, { 
        maximumFractionDigits: 2 
      }).format(volume / 1_000_000_000)}B`;
    } else if (volume >= 1_000_000) {
      return `${new Intl.NumberFormat(locale, { 
        maximumFractionDigits: 2 
      }).format(volume / 1_000_000)}M`;
    } else if (volume >= 1_000) {
      return `${new Intl.NumberFormat(locale, { 
        maximumFractionDigits: 1 
      }).format(volume / 1_000)}K`;
    } else {
      return new Intl.NumberFormat(locale).format(volume);
    }
  };
  
  /**
   * Formata um valor de market cap (capitalização de mercado)
   * Exibe em M (milhões), B (bilhões) ou T (trilhões) dependendo do tamanho
   * 
   * @param marketCap Capitalização de mercado como número
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada da capitalização de mercado
   */
  export const formatMarketCap = (marketCap: number, locale: string = 'en-US'): string => {
    if (marketCap >= 1_000_000_000_000) {
      return `${new Intl.NumberFormat(locale, { 
        maximumFractionDigits: 2 
      }).format(marketCap / 1_000_000_000_000)}T`;
    } else if (marketCap >= 1_000_000_000) {
      return `${new Intl.NumberFormat(locale, { 
        maximumFractionDigits: 2 
      }).format(marketCap / 1_000_000_000)}B`;
    } else if (marketCap >= 1_000_000) {
      return `${new Intl.NumberFormat(locale, { 
        maximumFractionDigits: 2 
      }).format(marketCap / 1_000_000)}M`;
    } else {
      return new Intl.NumberFormat(locale).format(marketCap);
    }
  };
  
  /**
   * Determina a cor a ser usada para exibir uma variação de preço
   * 
   * @param change Variação (pode ser preço ou percentual)
   * @returns String com nome da cor CSS (para uso com Tailwind ou styled-components)
   */
  export const getChangeColor = (change: number): string => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };
  
  /**
   * Formata um par de valores de alta/baixa do dia
   * 
   * @param low Valor mais baixo do dia
   * @param high Valor mais alto do dia
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada no estilo "L: X.XX - H: Y.YY"
   */
  export const formatDayRange = (low: number, high: number, locale: string = 'en-US'): string => {
    const formattedLow = formatStockPrice(low, locale);
    const formattedHigh = formatStockPrice(high, locale);
    
    return `L: ${formattedLow} - H: ${formattedHigh}`;
  };
  
  /**
   * Formata um valor de rendimento de dividendos
   * 
   * @param yield Rendimento como número de ponto flutuante (ex: 2.5 para 2.5%)
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada do rendimento com símbolo %
   */
  export const formatDividendYield = (yield_: number, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(yield_) + '%';
  };
  
  /**
   * Formata um valor de P/E (Price to Earnings ratio)
   * 
   * @param pe Valor de P/E como número de ponto flutuante
   * @param locale Localidade para formatação (padrão: 'en-US')
   * @returns String formatada do P/E
   */
  export const formatPE = (pe: number, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(pe);
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