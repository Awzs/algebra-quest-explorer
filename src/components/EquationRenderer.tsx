
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
          
          // Render after a delay
          setTimeout(() => {
            if (containerRef.current) {
              katex.default.render(latex, containerRef.current, {
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

// Add this to package.json: "katex": "^0.16.8"
