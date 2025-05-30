import React from 'react';
import { Table } from '@shared/components/Table/Table';

interface VariationCellProps {
  variation: number;
}

export const VariationCell: React.FC<VariationCellProps> = ({ variation }) => {
  const getVariationColorClass = (value: number): string => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-secondary-300';
  };

  return (
    <Table.Cell className={getVariationColorClass(variation)}>
      {variation.toFixed(2)}%
    </Table.Cell>
  );
};
