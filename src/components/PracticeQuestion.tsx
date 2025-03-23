
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EquationRenderer from './EquationRenderer';
import { Equation, checkSolution } from '@/utils/equationUtils';
import { cn } from '@/lib/utils';

interface PracticeQuestionProps {
  equation: Equation;
  onSolve?: (isCorrect: boolean) => void;
  showHints?: boolean;
  className?: string;
}

const PracticeQuestion: React.FC<PracticeQuestionProps> = ({
  equation,
  onSolve,
  showHints = true,
  className,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'hint' | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when equation changes
  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setHintIndex(0);
    setAttempts(0);
    setErrorMessage('');
  }, [equation]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
    setFeedback(null);
    setErrorMessage('');
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setErrorMessage('请输入答案');
      return;
    }

    const trimmedAnswer = userAnswer.trim();
    const isCorrect = checkSolution(trimmedAnswer, equation.solution);

    if (isCorrect) {
      setFeedback('correct');
      if (onSolve) onSolve(true);
    } else {
      setFeedback('incorrect');
      setAttempts(prev => prev + 1);
      
      // After 3 failed attempts, show a hint
      if (attempts + 1 >= 3 && showHints) {
        setFeedback('hint');
      }
      
      if (onSolve) onSolve(false);
    }
  };

  const handleShowHint = () => {
    setFeedback('hint');
    // Cycle through steps as hints
    setHintIndex(prev => (prev + 1) % equation.steps.length);
  };

  return (
    <div className={cn("equation-container", className)}>
      <h3 className="text-xl font-semibold mb-4">解答以下方程</h3>
      
      <div className="p-4 bg-accent rounded-lg mb-6">
        <EquationRenderer
          latex={equation.latex}
          displayMode={true}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="answer" className="block text-sm font-medium mb-1">
            你的答案
          </label>
          <div className="flex space-x-2">
            <Input
              id="answer"
              value={userAnswer}
              onChange={handleAnswerChange}
              placeholder="输入你的答案"
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            />
            <Button onClick={checkAnswer}>
              检查
            </Button>
          </div>
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {feedback === 'correct' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">回答正确！</p>
                    <p className="text-sm mt-1">恭喜你，答案是正确的。</p>
                  </div>
                </div>
              )}

              {feedback === 'incorrect' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                  <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">回答错误</p>
                    <p className="text-sm mt-1">
                      请再试一次。这是你的第 {attempts} 次尝试
                      {attempts >= 2 && showHints && (
                        <Button 
                          variant="link" 
                          className="text-red-700 p-0 h-auto font-medium"
                          onClick={handleShowHint}
                        >
                          需要提示吗？
                        </Button>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {feedback === 'hint' && (
                <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-start">
                  <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">提示</p>
                    <p className="text-sm mt-1">{equation.steps[hintIndex].explanation}</p>
                    {hintIndex < equation.steps.length - 1 && (
                      <Button 
                        variant="link" 
                        className="text-blue-700 p-0 h-auto font-medium mt-2"
                        onClick={handleShowHint}
                      >
                        下一个提示
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PracticeQuestion;
