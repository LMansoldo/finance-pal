import React from 'react';
import { CardInfoItem } from '@modules/financial/components/FinancialCardComponent/CardInfoItem/CardInfoItem';

interface CardVariationProps {
  variation: number | undefined;
}

export const CardVariation: React.FC<CardVariationProps> = ({ variation }) => {
  const getVariationColorClass = (variation: number | undefined): string => {
    if (!variation) return 'text-gray-600';
    return variation > 0 ? 'text-green-600' : variation < 0 ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <CardInfoItem 
      label="Variação"
      value={
        variation !== undefined ? 
          `${variation > 0 ? '+' : ''}${variation.toFixed(2)}%` : 
          '-'
      }
      className={getVariationColorClass(variation)}
    />
  );
};
