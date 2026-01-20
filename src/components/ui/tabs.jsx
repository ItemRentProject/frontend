import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/helpers';

const TabsContext = createContext({});

const Tabs = ({ defaultValue, children, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(({ 
  className, 
  value, 
  children, 
  ...props 
}, ref) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      ref={ref}
      onClick={() => setActiveTab(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5',
        'text-sm font-medium ring-offset-white transition-all focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        activeTab === value
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div
      ref={ref}
      className={cn('mt-2 ring-offset-white focus-visible:outline-none', className)}
      {...props}
    >
      {children}
    </div>
  );
});

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, TabsList, TabsTrigger };
