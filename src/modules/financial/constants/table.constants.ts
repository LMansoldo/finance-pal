export const TRANSACTION_TYPE = {
    CURRENCY: 'currency',
    STOCK: 'stock',
    BITCOIN: 'bitcoin',
} as const;

export const TRANSACTION_TYPE_LABEL = {
    [TRANSACTION_TYPE.CURRENCY]: 'Moeda',
    [TRANSACTION_TYPE.STOCK]: 'Ação',
    [TRANSACTION_TYPE.BITCOIN]: 'Cripto'
} as const;
