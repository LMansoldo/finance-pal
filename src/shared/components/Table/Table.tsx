import { BodyProps, CellProps, HeaderCellProps, HeadProps, RowProps, TableContextProps, TableProps } from '@shared/types/Table.type';
import React, { createContext, useContext } from 'react';

const TableContext = createContext<TableContextProps>({
  striped: false,
  hoverable: false
});

const Table = ({ 
  children, 
  striped = false, 
  hoverable = false, 
  className = '' 
}: TableProps) => {
  return (
    <TableContext.Provider value={{ striped, hoverable }}>
      <div className={`overflow-hidden shadow ring-1 ring-gray-700 ring-opacity-5 sm:rounded-lg ${className}`}>
        <table className="min-w-full divide-y divide-gray-700">
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
};

const Head = ({ children, className = '' }: HeadProps) => {
  return (
    <thead className={`bg-gray-800 ${className}`}>
      {children}
    </thead>
  );
};

const Body = ({ children, className = '' }: BodyProps) => {
  const { striped } = useContext(TableContext);
  
  return (
    <tbody className={`divide-y divide-gray-700 bg-gray-900 ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            isEven: striped && index % 2 === 0
          });
        }
        return child;
      })}
    </tbody>
  );
};

const Row = ({ children, className = '', isEven = false }: RowProps) => {
  const { hoverable } = useContext(TableContext);
  
  return (
    <tr className={`
      ${isEven ? 'bg-gray-800' : ''}
      ${hoverable ? 'hover:bg-gray-700 transition-colors' : ''}
      ${className}
    `}>
      {children}
    </tr>
  );
};

const HeaderCell = ({ 
  children, 
  className = '', 
  align = 'left' 
}: HeaderCellProps) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <th 
      scope="col" 
      className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-300 ${alignClass[align]} ${className}`}
    >
      {children}
    </th>
  );
};

const Cell = ({ 
  children, 
  className = 'text-gray-300', 
  align = 'left' 
}: CellProps) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <td 
      className={`whitespace-nowrap px-6 py-4 text-sm ${alignClass[align]} ${className}`}
    >
      {children}
    </td>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export { Table };
