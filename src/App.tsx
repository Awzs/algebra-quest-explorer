
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EquationExplorer from "./pages/EquationExplorer";
import PolynomialEquations from "./pages/PolynomialEquations";
import FractionalEquations from "./pages/FractionalEquations";
import RadicalEquations from "./pages/RadicalEquations";
import QuadraticEquations from "./pages/QuadraticEquations";
import WordProblems from "./pages/WordProblems";
import Practice from "./pages/Practice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equation-explorer" element={<EquationExplorer />} />
          <Route path="/polynomial-equations" element={<PolynomialEquations />} />
          <Route path="/fractional-equations" element={<FractionalEquations />} />
          <Route path="/radical-equations" element={<RadicalEquations />} />
          <Route path="/quadratic-equations" element={<QuadraticEquations />} />
          <Route path="/word-problems" element={<WordProblems />} />
          <Route path="/practice" element={<Practice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
