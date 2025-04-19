import React from 'react';
import { Table } from '@shared/components/Table/Table';
import { QUOTATION_TYPE } from '@modules/financial/constants/table.constants';
import { formatCurrency } from '@modules/financial/helpers/currency.helper';
import { formatStockPrice } from '@modules/financial/helpers/stock.helper';

interface ValueCellProps {
  type: string;
  buy?: number;
  points?: number;
  source?: string;
}

export const ValueCell: React.FC<ValueCellProps> = ({ type, source, buy, points }) => {
  console.log('ValueCell - type:', source);
  return (
    <Table.Cell>
      {type !== QUOTATION_TYPE.STOCK
        ? `${formatCurrency(source, buy) || '-'}`
        : formatStockPrice(points) || '-'}
    </Table.Cell>
  );
};
