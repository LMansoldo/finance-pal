import React from 'react';
import { FinancialData } from '@modules/financial/types/FinancialData.type';
import { Table } from '@shared/components/Table/Table';
import { NameCell } from '@modules/financial/components/FinancialTableCells/NameCell/NameCell';
import { TypeCell } from '@modules/financial/components/FinancialTableCells/TypeCell/TypeCell';
import { ValueCell } from '@modules/financial/components/FinancialTableCells/ValueCell/ValueCell';
import { VariationCell } from '@modules/financial/components/FinancialTableCells/VariationCell/VariationCell';
import { ActionCell } from '@modules/financial/components/FinancialTableCells/ActionCell/ActionCell';
import { FINANCIAL_TABLE_HEADERS } from '@modules/financial/constants/tableHeaders.constants';

interface FinancialTableDataProps {
  quotations: FinancialData[];
}

export const FinancialTableData: React.FC<FinancialTableDataProps> = ({ quotations }) => {
  return (
    <Table striped hoverable>
      <Table.Head>
        <Table.Row>
          {FINANCIAL_TABLE_HEADERS.map(header => (
            <Table.HeaderCell key={header.id}>
              {header.label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {quotations.map((quotation) => (
          <Table.Row key={quotation.id}>
            <NameCell name={quotation.name} />
            <TypeCell type={quotation.type} />
            <ValueCell 
              type={quotation.type} 
              buy={quotation.buy} 
              points={quotation.points}
              source={quotation.source}
            />
            <VariationCell variation={quotation.variation} />
            <ActionCell id={quotation.id} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
