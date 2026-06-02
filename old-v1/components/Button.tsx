import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ease-out focus:outline-none";
  
  const variants = {
    primary: "bg-datum-black text-white hover:bg-datum-slate border border-transparent",
    secondary: "bg-datum-sage text-white hover:bg-datum-slate border border-transparent",
    outline: "bg-transparent text-datum-black border border-datum-black hover:bg-datum-black hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};