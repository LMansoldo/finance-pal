import React from 'react';
import { ButtonProps } from '@shared/types';
import { ButtonSize, ButtonVariant } from '@shared/enums/button';

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  size = 'medium',
}) => {
  const baseClasses = 'font-bold rounded focus:outline-none focus:shadow-outline';
  
  const variantClasses: Record<ButtonVariant, string> = {
    [ButtonVariant.PRIMARY]: 'bg-blue-500 hover:bg-blue-700 text-white',
    [ButtonVariant.SECONDARY]: 'bg-gray-500 hover:bg-gray-700 text-white',
    [ButtonVariant.DANGER]: 'bg-red-500 hover:bg-red-700 text-white',
    [ButtonVariant.SUCCESS]: 'bg-green-500 hover:bg-green-700 text-white',
    [ButtonVariant.WARNING]: 'bg-yellow-500 hover:bg-yellow-700 text-white',
  };
  
  const sizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.SMALL]: 'py-1 px-2 text-sm',
    [ButtonSize.MEDIUM]: 'py-2 px-4',
    [ButtonSize.LARGE]: 'py-3 px-6 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;