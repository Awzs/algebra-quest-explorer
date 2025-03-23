
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-algebra-blue text-white font-bold text-xl">
                代
              </div>
              <span className="text-lg font-semibold tracking-tight">代数方程探索之旅</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn("nav-link", isActive("/") && "active")}
            >
              首页
            </Link>
            <Link 
              to="/equation-explorer" 
              className={cn("nav-link", isActive("/equation-explorer") && "active")}
            >
              方程探索
            </Link>
            <Link 
              to="/practice" 
              className={cn("nav-link", isActive("/practice") && "active")}
            >
              巩固练习
            </Link>
            <Link 
              to="/polynomial-equations" 
              className={cn(
                "bg-primary text-white px-4 py-2 rounded-full font-medium transition-all hover:bg-primary/90 shadow-sm"
              )}
            >
              开始学习
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E8ED]">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className={cn(
                "block py-2 text-foreground/70 hover:text-foreground",
                isActive("/") && "text-primary font-medium"
              )}
            >
              首页
            </Link>
            <Link 
              to="/equation-explorer" 
              className={cn(
                "block py-2 text-foreground/70 hover:text-foreground",
                isActive("/equation-explorer") && "text-primary font-medium"
              )}
            >
              方程探索
            </Link>
            <Link 
              to="/practice" 
              className={cn(
                "block py-2 text-foreground/70 hover:text-foreground",
                isActive("/practice") && "text-primary font-medium"
              )}
            >
              巩固练习
            </Link>
            <div className="pt-2">
              <Link 
                to="/polynomial-equations" 
                className="block w-full bg-primary text-white px-4 py-2 rounded-full font-medium text-center transition-all hover:bg-primary/90 shadow-sm"
              >
                开始学习
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
