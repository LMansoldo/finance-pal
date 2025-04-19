import React from 'react';
import { Link } from 'react-router-dom';

interface CardFooterProps {
  id: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ id }) => {
  return (
    <div className="mt-4 pt-3 border-t border-secondary-700 flex justify-end">
      <Link 
        to={`/detail/${id}`}
        className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center"
      >
        Ver detalhes
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  );
};
