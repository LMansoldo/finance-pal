export const QUOTATION_TYPE = {
    CURRENCY: 'currency',
    STOCK: 'stock',
    BITCOIN: 'bitcoin',
} as const;

export const QUOTATION_TYPE_LABEL = {
    [QUOTATION_TYPE.CURRENCY]: 'Moeda',
    [QUOTATION_TYPE.STOCK]: 'Ação',
    [QUOTATION_TYPE.BITCOIN]: 'Cripto'
} as const;
