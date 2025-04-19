import React from 'react';
import { TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '@modules/financial/constants/table.constants';
import { Table } from '@shared/components/Table/Table';

interface TypeCellProps {
    type: typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];
}

export const TypeCell: React.FC<TypeCellProps> = ({ type }) => {
  return (
    <Table.Cell>
      {TRANSACTION_TYPE_LABEL[type]}
    </Table.Cell>
  );
};
