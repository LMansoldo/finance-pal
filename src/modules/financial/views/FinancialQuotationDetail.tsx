import React from 'react';
import { Table } from '@shared/components/Table/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useFinancialData } from '@modules/financial/hooks/useFinancialData';
import { FinancialQuotationChart } from '@modules/financial/components/FinancialQuotationChart/FinancialQuotationChart';
import { TypeCell } from '../components/FinancialTableCells/TypeCell/TypeCell';
import { ValueCell } from '../components/FinancialTableCells/ValueCell/ValueCell';
import { VariationCell } from '../components/FinancialTableCells/VariationCell/VariationCell';
import { LoadingSpinner } from '@shared/components/LoadingSpinner/LoadingSpinner';

export const FinancialQuotationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedQuotation, history, loading, error } = useFinancialData(id);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-secondary-700">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !selectedQuotation) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-secondary-800">
        <div className="text-xl mb-4">{error || "Cotação não encontrada"}</div>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary-500 hover:bg-primary-700 text-secondary-200 font-bold py-2 px-4 rounded"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="border-t border-secondary-700">
            <Table striped hoverable>
              <Table.Head>
                <Table.Row>
                  <Table.Cell colSpan={2}>
                    <h3 className="text-lg font-medium">
                      Informações da Cotação
                    </h3>
                  </Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Nome</Table.Cell>
                  <Table.Cell>{selectedQuotation.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Tipo</Table.Cell>
                  <TypeCell type={selectedQuotation.type} />
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Valor de Compra</Table.Cell>
                    <ValueCell 
                      type={selectedQuotation.type} 
                      buy={selectedQuotation.buy} 
                      points={selectedQuotation.points}
                      source={selectedQuotation.source}
                    />
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Valor de Venda</Table.Cell>
                    <ValueCell 
                      type={selectedQuotation.type} 
                      buy={selectedQuotation.sell} 
                      points={selectedQuotation.points}
                      source={selectedQuotation.source}
                    />
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Variação</Table.Cell>
                  <VariationCell variation={selectedQuotation.variation} />
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>

        <div className="bg-secondary-700 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-100">
              Histórico de Valores
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Evolução da cotação desde o início da sessão
            </p>
          </div>
          
          <div className="p-6">
            <div className="bg-secondary-800 p-4 rounded text-center">
              <FinancialQuotationChart history={history} type={selectedQuotation.type} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};