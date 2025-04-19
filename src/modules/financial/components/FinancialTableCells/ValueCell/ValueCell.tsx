import React from 'react';
import { Table } from '@shared/components/Table/Table';
import { TRANSACTION_TYPE } from '@modules/financial/constants/table.constants';

interface ValueCellProps {
  type: string;
  buy?: number;
  points?: number;
}

export const ValueCell: React.FC<ValueCellProps> = ({ type, buy, points }) => {
  return (
    <Table.Cell>
      {type !== TRANSACTION_TYPE.STOCK
        ? `R$ ${buy?.toFixed(2) || '-'}`
        : points?.toFixed(2) || '-'}
    </Table.Cell>
  );
};
