import React from 'react';
import { Table } from '@shared/components/Table/Table';

interface NameCellProps {
  name: string;
}

export const NameCell: React.FC<NameCellProps> = ({ name }) => {
  return (
    <Table.Cell>
      <div className="font-medium">{name}</div>
    </Table.Cell>
  );
};
