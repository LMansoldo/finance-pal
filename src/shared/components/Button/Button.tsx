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
    [ButtonVariant.PRIMARY]: 'bg-primary-500 hover:bg-primary-700 text-white',
    [ButtonVariant.SECONDARY]: 'bg-secondary-500 hover:bg-secondary-700 text-white',
    [ButtonVariant.DANGER]: 'bg-danger-500 hover:bg-danger-700 text-white',
    [ButtonVariant.SUCCESS]: 'bg-success-500 hover:bg-success-700 text-white',
    [ButtonVariant.WARNING]: 'bg-info-500 hover:bg-info-700 text-white',
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