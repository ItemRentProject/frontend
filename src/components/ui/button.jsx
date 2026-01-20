import React from 'react';
import { cn } from '../../utils/helpers';

const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-xl',
    icon: 'p-2 rounded-lg',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="ml-2">Загрузка...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
