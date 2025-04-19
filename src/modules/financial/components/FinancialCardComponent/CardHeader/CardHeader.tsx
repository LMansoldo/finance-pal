import React from 'react';
import { TRANSACTION_TYPE_LABEL } from '@modules/financial/constants/table.constants';

interface CardHeaderProps {
  name: string;
  type: keyof typeof TRANSACTION_TYPE_LABEL;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ name, type }) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-gray-200 truncate">{name}</h3>
      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-700 text-gray-300">
        {TRANSACTION_TYPE_LABEL[type] || type}
      </span>
    </div>
  );
};
