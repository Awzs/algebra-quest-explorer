
import React from 'react';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  showNavigation = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFF] flex flex-col">
      {showNavigation && <Navigation />}
      <main className={cn(
        "flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-16",
        className
      )}>
        {children}
      </main>
      <footer className="py-6 border-t border-[#E8E8ED] bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 代数方程探索之旅 - 沪教版八年级下册
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                关于我们
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                使用指南
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                联系方式
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
