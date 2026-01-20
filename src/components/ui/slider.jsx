import React from 'react';
import { cn } from '../../utils/helpers';

const Slider = React.forwardRef(({
  className,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  ...props
}, ref) => {
  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    onValueChange?.([value]);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('relative flex items-center', className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full',
          'bg-gray-200 accent-blue-600',
          'disabled:cursor-not-allowed disabled:opacity-50',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2',
          '[&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white',
          '[&::-moz-range-thumb]:shadow-lg'
        )}
        ref={ref}
        {...props}
      />
      
      {/* Трек прогресса */}
      <div 
        className="absolute h-2 rounded-full bg-blue-600 pointer-events-none"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };
