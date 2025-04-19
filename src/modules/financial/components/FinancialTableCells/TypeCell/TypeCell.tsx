import React from 'react';
import { QUOTATION_TYPE, QUOTATION_TYPE_LABEL } from '@modules/financial/constants/table.constants';
import { Table } from '@shared/components/Table/Table';

interface TypeCellProps {
    type: typeof QUOTATION_TYPE[keyof typeof QUOTATION_TYPE];
}

export const TypeCell: React.FC<TypeCellProps> = ({ type }) => {
  return (
    <Table.Cell>
      {QUOTATION_TYPE_LABEL[type]}
    </Table.Cell>
  );
};
