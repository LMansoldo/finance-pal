import React from 'react';

interface CardInfoItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export const CardInfoItem: React.FC<CardInfoItemProps> = ({ label, value, className = 'text-gray-400' }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}:</span>
      <span className={`text-base font-medium ${className}`}>
        {value}
      </span>
    </div>
  );
};
