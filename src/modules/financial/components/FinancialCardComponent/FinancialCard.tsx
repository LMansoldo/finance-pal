import React from 'react';
import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { CardHeader } from '@modules/financial/components/FinancialCardComponent/CardHeader/CardHeader';
import { CardBody } from '@modules/financial/components/FinancialCardComponent/CardBody/CardBody';
import { CardFooter } from '@modules/financial/components/FinancialCardComponent/CardFooter/CardFooter';
import { withFinancialCard } from '@modules/financial/components/FinancialCardComponent/WithFinancialCard/WithFinancialCard';
import { CardInfoItem } from '@modules/financial/components/FinancialCardComponent/CardInfoItem/CardInfoItem';

interface FinancialCardProps {
  quotation: FinancialData;
}

const FinancialCardBase: React.FC<FinancialCardProps> = ({ quotation }) => {
  return (
    <>
      <CardHeader name={quotation.name} type={quotation.type} />
      <CardBody quotation={quotation} />
      <CardFooter id={quotation.id} />
    </>
  );
};

export const FinancialCard = withFinancialCard(FinancialCardBase);

export { CardHeader, CardBody, CardFooter, CardInfoItem, withFinancialCard };
