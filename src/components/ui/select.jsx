import { Check, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../../utils/helpers';

const Select = React.forwardRef(({ 
  className, 
  children, 
  value, 
  onValueChange,
  placeholder = "Выберите...",
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-gray-300',
          'bg-white px-3 py-2 text-sm ring-offset-white',
          'placeholder:text-gray-500 focus:outline-none focus:ring-2',
          'focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {children.find(child => child.props.value === value)?.props.children || placeholder}
        </span>
        <ChevronDown className={cn('h-4 w-4 text-gray-500 transition-transform', isOpen && 'rotate-180')} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {children.map((child) => (
              <button
                key={child.props.value}
                type="button"
                onClick={() => handleSelect(child.props.value)}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-sm',
                  'hover:bg-gray-100',
                  value === child.props.value && 'bg-blue-50 text-blue-600'
                )}
              >
                <span>{child.props.children}</span>
                {value === child.props.value && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

Select.displayName = 'Select';

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('hidden', className)}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  );
});

SelectItem.displayName = 'SelectItem';

export { Select, SelectItem };
