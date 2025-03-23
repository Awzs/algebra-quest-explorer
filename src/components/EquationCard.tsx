
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EquationType } from '@/utils/equationUtils';

interface EquationCardProps {
  type: EquationType;
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  isCompleted?: boolean;
  className?: string;
}

const EquationCard: React.FC<EquationCardProps> = ({
  type,
  title,
  description,
  icon,
  to,
  isCompleted = false,
  className,
}) => {
  // Define colors based on equation type
  const getTypeColor = () => {
    switch (type) {
      case 'polynomial':
        return 'bg-algebra-blue/10 text-algebra-blue border-algebra-blue/20';
      case 'fractional':
        return 'bg-algebra-purple/10 text-algebra-purple border-algebra-purple/20';
      case 'radical':
        return 'bg-algebra-pink/10 text-algebra-pink border-algebra-pink/20';
      case 'quadratic':
        return 'bg-algebra-green/10 text-algebra-green border-algebra-green/20';
      case 'wordProblem':
        return 'bg-algebra-yellow/10 text-algebra-yellow border-algebra-yellow/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "equation-card group cursor-pointer",
        className
      )}
    >
      <Link to={to} className="block p-6">
        <div className="flex items-start justify-between">
          <div className={cn(
            "p-3 rounded-lg",
            getTypeColor()
          )}>
            {icon}
          </div>
          
          {isCompleted && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-1" />
              已完成
            </div>
          )}
        </div>
        
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
        
        <p className="mt-2 text-muted-foreground text-sm">
          {description}
        </p>
        
        <div className="mt-6 flex items-center text-sm font-medium text-primary">
          开始学习
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
};

export default EquationCard;
