import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@shared/components/Table/Table';

interface ActionCellProps {
  id: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({ id }) => {
  return (
    <Table.Cell>
      <Link 
        to={`/detail/${id}`}
        className="text-green-500 hover:text-green-800"
      >
        Ver Detalhes
      </Link>
    </Table.Cell>
  );
};
