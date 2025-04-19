import React from 'react';
import { TextFieldProps } from '@shared/types';

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
  error,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-secondary-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        className={`shadow appearance-none border ${
          error ? 'border-red-500' : ''
        } rounded w-full py-2 px-3 text-secondary-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default TextField;