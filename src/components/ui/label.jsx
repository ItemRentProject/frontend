import React from 'react';
import { cn } from '../../utils/helpers';

const Label = React.forwardRef(({ className, children, required, ...props }, ref) => {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed',
        'peer-disabled:opacity-70 text-gray-700',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

Label.displayName = 'Label';

export { Label };
