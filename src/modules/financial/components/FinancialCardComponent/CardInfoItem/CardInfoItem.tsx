import React from 'react';

interface CardInfoItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export const CardInfoItem: React.FC<CardInfoItemProps> = ({ label, value, className = 'text-secondary-100' }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-secondary-200">{label}:</span>
      <span className={`text-base font-medium ${className}`}>
        {value}
      </span>
    </div>
  );
};
