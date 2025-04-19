import React from 'react';
import { QUOTATION_TYPE_LABEL } from '@modules/financial/constants/table.constants';

interface CardHeaderProps {
  name: string;
  type: keyof typeof QUOTATION_TYPE_LABEL;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ name, type }) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-secondary-100 truncate">{name}</h3>
      <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary-500 text-secondary-200">
        {QUOTATION_TYPE_LABEL[type] || type}
      </span>
    </div>
  );
};
