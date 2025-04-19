import React from 'react';
import { Table } from '@shared/components/Table/Table';
import { NameCell } from '@modules/financial/components/FinancialTableCells/NameCell/NameCell';
import { TypeCell } from '@modules/financial/components/FinancialTableCells/TypeCell/TypeCell';
import { ValueCell } from '@modules/financial/components/FinancialTableCells/ValueCell/ValueCell';
import { VariationCell } from '@modules/financial/components/FinancialTableCells/VariationCell/VariationCell';
import { ActionCell } from '@modules/financial/components/FinancialTableCells/ActionCell/ActionCell';
import { FINANCIAL_TABLE_HEADERS } from '@modules/financial/constants/tableHeaders.constants';
import { FinancialViewProps } from '@modules/financial/types/FinancialData.type';
import { Skeleton } from '@shared/components/Skeleton/Skeleton';

export const FinancialTableData: React.FC<FinancialViewProps> = ({ quotations, loading, error }) => {
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
        {loading && (
          <>
            {[...Array(10)].map((_) => (
              <Table.Row>
                <Table.Cell key={_} colSpan={5}>
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
          </>        
        )}

        {error && (
          <Table.Row>
            <Table.Cell colSpan={5}>Erro ao carregar dados.</Table.Cell>
          </Table.Row>
        )}

        {quotations.length === 0 && !error && !loading && (
          <Table.Row>
            <Table.Cell colSpan={5}>Nenhum dado encontrado.</Table.Cell>
          </Table.Row>
        )}

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
