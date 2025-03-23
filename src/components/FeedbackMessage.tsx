
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface FeedbackMessageProps {
  type: FeedbackType;
  message: string;
  description?: string;
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
  className?: string;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  message,
  description,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
  className,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, autoCloseTime, onClose]);

  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
        };
      case 'error':
        return {
          icon: <XCircle className="h-5 w-5" />,
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200',
        };
      case 'info':
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
        };
    }
  };

  const { icon, bgColor, textColor, borderColor } = getIconAndColors();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "p-4 rounded-lg border flex items-start",
            bgColor,
            textColor,
            borderColor,
            className
          )}
        >
          <div className="flex-shrink-0 mr-3">{icon}</div>
          <div className="flex-1">
            <h4 className="font-medium">{message}</h4>
            {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black/5 transition-colors"
              aria-label="关闭提示"
            >
              <XCircle className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackMessage;
