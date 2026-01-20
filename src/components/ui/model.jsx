import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Modal = ({ isOpen, onClose, children, className, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative z-50 w-full rounded-2xl bg-white shadow-2xl',
        sizeClasses[size],
        'max-h-[90vh] overflow-y-auto',
        className
      )}>
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children, onClose, className }) => {
  return (
    <div className={cn('flex items-center justify-between p-6 border-b', className)}>
      <div className="text-xl font-bold">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

const ModalContent = ({ children, className }) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};

const ModalFooter = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-end gap-3 p-6 border-t', className)}>
      {children}
    </div>
  );
};

export { Modal, ModalContent, ModalFooter, ModalHeader };
