import React from 'react';
import { cn } from '../../utils/helpers';

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
        'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus-visible:ring-red-500',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const InputGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex relative', className)}
      {...props}
    >
      {children}
    </div>
  );
});

InputGroup.displayName = 'InputGroup';

const InputLeftAddon = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-l-lg border border-r-0 border-gray-300',
        'bg-gray-100 px-3 text-sm text-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

InputLeftAddon.displayName = 'InputLeftAddon';

const InputRightAddon = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-r-lg border border-l-0 border-gray-300',
        'bg-gray-100 px-3 text-sm text-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

InputRightAddon.displayName = 'InputRightAddon';

export { Input, InputGroup, InputLeftAddon, InputRightAddon };
