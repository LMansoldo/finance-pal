import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@shared/components/Table/Table';
import { BsArrowRight } from 'react-icons/bs';

interface ActionCellProps {
  id: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({ id }) => {
  return (
    <Table.Cell>
       <Link 
          to={`/detail/${id}`}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
        >
          Ver detalhes
          <BsArrowRight className="ml-1" />
        </Link>
    </Table.Cell>
  );
};
