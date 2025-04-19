import React from 'react';
import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { CardInfoItem } from '@modules/financial/components/FinancialCardComponent/CardInfoItem/CardInfoItem';
import { CardVariation } from '@modules/financial/components/FinancialCardComponent/CardVariation/CardVariation';
import { TRANSACTION_TYPE } from '@modules/financial/constants/table.constants';
import { formatCurrency } from '@modules/financial/helpers/currency.helper';
import { formatStockPrice } from '@modules/financial/helpers/stock.helper';

interface CardBodyProps {
  quotation: FinancialData;
}

export const CardBody: React.FC<CardBodyProps> = ({ quotation }) => {
  const formatValue = (quotation: FinancialData): string => {
    if (quotation.type !== TRANSACTION_TYPE.STOCK) {
      return quotation.buy ? formatCurrency(quotation.source, quotation.buy) : '-';
    } else {
      return quotation.points ? formatStockPrice(quotation.points) : '-';
    }
  };

  return (
    <div className="flex-grow space-y-2">
      <CardInfoItem 
        label="Valor"
        value={formatValue(quotation)}
      />
      
      {(quotation.type === TRANSACTION_TYPE.CURRENCY || quotation.type === TRANSACTION_TYPE.BITCOIN) && (
        <CardInfoItem 
          label="Venda"
          value={quotation.sell ? formatCurrency(quotation.source, quotation.sell) : '-'}
        />
      )}
      
      {quotation.type === TRANSACTION_TYPE.STOCK && quotation.location && (
        <CardInfoItem 
          label="Local"
          value={quotation.location}
        />
      )}
      
      <CardVariation variation={quotation.variation} />
    </div>
  );
};
