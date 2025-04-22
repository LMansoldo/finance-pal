import React from 'react';
import { BsArrowRight } from "react-icons/bs";
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
        <BsArrowRight className="ml-1" />
      </Link>
    </div>
  );
};
