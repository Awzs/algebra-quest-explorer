
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Eye, RefreshCw } from 'lucide-react';
import EquationRenderer from './EquationRenderer';
import ProgressBar from './ProgressBar';
import { EquationStep } from '@/utils/equationUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StepByStepSolverProps {
  steps: EquationStep[];
  className?: string;
}

const StepByStepSolver: React.FC<StepByStepSolverProps> = ({ steps, className }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Reset state when steps change
  useEffect(() => {
    setCurrentStep(0);
    setShowExplanation(false);
  }, [steps]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowExplanation(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
  };

  return (
    <div className={cn("equation-container", className)}>
      <div className="mb-4">
        <ProgressBar 
          current={currentStep + 1} 
          total={steps.length} 
          label={`步骤 ${currentStep + 1}/${steps.length}`} 
        />
      </div>
      
      <div className="min-h-[200px] mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-lg font-medium text-foreground">
              {steps[currentStep].instruction}
            </p>
            <div className="p-4 bg-accent rounded-lg">
              <EquationRenderer
                latex={steps[currentStep].latex}
                displayMode={true}
                delay={200}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="p-4 bg-algebra-light-blue rounded-lg">
              <h4 className="font-medium mb-2">解释</h4>
              <p>{steps[currentStep].explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleExplanation}
            className="flex items-center"
          >
            <Eye className="mr-1 h-4 w-4" />
            {showExplanation ? '隐藏解释' : '显示解释'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="flex items-center"
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            重置
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            上一步
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleNextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center"
          >
            下一步
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepByStepSolver;
