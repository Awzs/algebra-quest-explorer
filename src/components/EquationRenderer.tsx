
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface EquationRendererProps {
  latex: string;
  className?: string;
  displayMode?: boolean;
  delay?: number;
}

const EquationRenderer: React.FC<EquationRendererProps> = ({
  latex,
  className,
  displayMode = false,
  delay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Make sure KaTeX is available
    if (typeof window !== 'undefined' && containerRef.current) {
      const renderEquation = async () => {
        try {
          // Dynamically import KaTeX
          const katex = await import('katex');
          // Import KaTeX CSS
          await import('katex/dist/katex.min.css');
          
          // Clean up potentially invalid LaTeX formatting
          let processedLatex = latex;
          
          // Fix common LaTeX formatting issues
          // 1. Check if we have \frac without proper braces
          if (processedLatex.includes('\\frac') && !processedLatex.match(/\\frac\{.*?\}\{.*?\}/)) {
            // Convert \fraca/x+b = c to \frac{a}{x+b} = c
            processedLatex = processedLatex.replace(/\\frac([a-zA-Z0-9])\/(([a-zA-Z0-9])[+\-]?([a-zA-Z0-9])?)/g, '\\frac{$1}{$2}');
            
            // If the above doesn't catch it, try a more general pattern
            if (processedLatex.includes('\\frac') && !processedLatex.match(/\\frac\{.*?\}\{.*?\}/)) {
              processedLatex = processedLatex.replace(/\\frac([^{])?([^{]*)([^{]*)/g, '\\frac{$1$2}{$3}');
            }
          }
          
          // 2. Fix incomplete fraction notation (just 'frac')
          if (processedLatex.includes('frac') && !processedLatex.includes('\\frac')) {
            processedLatex = processedLatex.replace(/frac/g, '\\frac');
          }
          
          console.log('Original LaTeX:', latex);
          console.log('Processed LaTeX:', processedLatex);
          
          // Render after a delay
          setTimeout(() => {
            if (containerRef.current) {
              katex.default.render(processedLatex, containerRef.current, {
                throwOnError: false,
                displayMode: displayMode,
              });
            }
          }, delay);
        } catch (err) {
          console.error('Error rendering equation:', err);
          // Fallback if KaTeX fails to load or render
          if (containerRef.current) {
            containerRef.current.textContent = latex;
          }
        }
      };
      
      renderEquation();
    }
  }, [latex, displayMode, delay]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-x-auto py-1',
        displayMode ? 'katex-display my-4' : 'inline-block',
        className
      )}
    />
  );
};

export default EquationRenderer;
