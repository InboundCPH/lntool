import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  active = false,
  icon,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 font-semibold text-sm shadow-sm hover:shadow-md active:scale-95';
  
  const variantStyles = {
    primary: disabled
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none hover:shadow-none active:scale-100'
      : 'bg-[#1da1f2] text-white hover:bg-[#1a91da]',
    secondary: active
      ? 'bg-[#1da1f2] text-white'
      : disabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none hover:shadow-none active:scale-100'
        : 'bg-[#e8f5fd] text-[#1da1f2] hover:bg-[#d8eefb]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </button>
  );
}