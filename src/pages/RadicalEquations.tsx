
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StepByStepSolver from '@/components/StepByStepSolver';
import PracticeQuestion from '@/components/PracticeQuestion';
import EquationRenderer from '@/components/EquationRenderer';
import { Button } from '@/components/ui/button';
import { Square, ChevronRight, CheckCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { 
  generateRadicalEquation, 
  Equation 
} from '@/utils/equationUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RadicalEquations = () => {
  const [currentTab, setCurrentTab] = useState("learn");
  const [practiceEquation, setPracticeEquation] = useState<Equation>(
    generateRadicalEquation('basic')
  );
  const [isExampleCompleted, setIsExampleCompleted] = useState(false);

  const handleSolve = (isCorrect: boolean) => {
    if (isCorrect) {
      setIsExampleCompleted(true);
    }
  };

  const generateNewEquation = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
    setPracticeEquation(generateRadicalEquation(difficulty));
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="mb-8">
          <div className="inline-block rounded-lg bg-algebra-pink/10 px-3 py-1 text-sm text-algebra-pink">
            无理方程
          </div>
          <h1 className="text-3xl font-bold mt-2">无理方程基础</h1>
          <p className="text-xl text-muted-foreground mt-2">
            掌握无理方程的定义和解法技巧
          </p>
        </div>

        <Tabs defaultValue="learn" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="learn" className="text-base">
              <BookOpen className="h-4 w-4 mr-2" />
              方程讲解
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-base">
              <Square className="h-4 w-4 mr-2" />
              应用实例
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <TabsContent value="learn" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-8 lg:grid-cols-5">
                  <div className="lg:col-span-3 space-y-6">
                    <motion.div
                      variants={staggerVariants}
                      initial="hidden"
                      animate="visible"
                      className="equation-container"
                    >
                      <motion.h2 variants={itemVariants} className="text-2xl font-semibold mb-4">
                        什么是无理方程？
                      </motion.h2>
                      
                      <motion.div variants={itemVariants}>
                        <p className="mb-4">
                          <strong>无理方程</strong>是含有未知数的根式（如平方根、立方根等）的方程。解这类方程通常需要通过平方或适当乘方来消除根号。
                        </p>
                        
                        <div className="p-4 bg-accent rounded-lg mb-4">
                          <EquationRenderer
                            latex="\\sqrt{ax + b} = c"
                            displayMode={true}
                          />
                        </div>
                        
                        <p className="mb-4">
                          其中，a、b、c是常数，x是未知数。解无理方程时，需要注意根号内的表达式必须非负，且平方可能会引入外来解。
                        </p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex space-x-3 my-4">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">注意事项</p>
                          <p className="text-amber-700">解无理方程时，必须注意两点：一是根号内的表达式必须非负；二是通过平方消除根号可能会引入外来解，因此求解后必须进行检验。</p>
                        </div>
                      </motion.div>
                      
                      <motion.h3 variants={itemVariants} className="text-xl font-semibold mt-6 mb-4">
                        无理方程的解法步骤
                      </motion.h3>

                      <motion.div variants={itemVariants} className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-pink text-white font-bold flex-shrink-0 mr-3 mt-0.5">1</div>
                          <div>
                            <p className="font-medium">找出约束条件</p>
                            <p className="text-muted-foreground">确定根号内表达式非负的条件</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-pink text-white font-bold flex-shrink-0 mr-3 mt-0.5">2</div>
                          <div>
                            <p className="font-medium">整理方程</p>
                            <p className="text-muted-foreground">将方程整理为标准形式，使根号项在等式一边</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-pink text-white font-bold flex-shrink-0 mr-3 mt-0.5">3</div>
                          <div>
                            <p className="font-medium">消除根号</p>
                            <p className="text-muted-foreground">通过平方或适当乘方消除根号</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-pink text-white font-bold flex-shrink-0 mr-3 mt-0.5">4</div>
                          <div>
                            <p className="font-medium">解整式方程</p>
                            <p className="text-muted-foreground">解消除根号后得到的整式方程</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-pink text-white font-bold flex-shrink-0 mr-3 mt-0.5">5</div>
                          <div>
                            <p className="font-medium">检验</p>
                            <p className="text-muted-foreground">将解代入原方程，验证是否满足约束条件，排除外来解</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold mb-4">解题演示</h3>
                      <StepByStepSolver 
                        steps={[
                          {
                            stepNumber: 1,
                            instruction: '观察方程',
                            latex: '\\sqrt{x + 3} = 2',
                            explanation: '这是一个无理方程，含有一个根号。首先需要确定约束条件：x + 3 ≥ 0，即 x ≥ -3。'
                          },
                          {
                            stepNumber: 2,
                            instruction: '消除根号',
                            latex: '(\\sqrt{x + 3})^2 = 2^2',
                            explanation: '等式两边同时平方，以消除根号。'
                          },
                          {
                            stepNumber: 3,
                            instruction: '化简',
                            latex: 'x + 3 = 4',
                            explanation: '左边的平方根平方后得到原表达式 x + 3，右边 2² = 4。'
                          },
                          {
                            stepNumber: 4,
                            instruction: '解方程',
                            latex: 'x = 4 - 3',
                            explanation: '将 3 移到等式右边。'
                          },
                          {
                            stepNumber: 5,
                            instruction: '得出结果',
                            latex: 'x = 1',
                            explanation: '计算得到 x = 1。'
                          },
                          {
                            stepNumber: 6,
                            instruction: '检验约束条件',
                            latex: 'x = 1 > -3',
                            explanation: '检查约束条件：x = 1 > -3，满足 x ≥ -3，根号内表达式为正数。'
                          },
                          {
                            stepNumber: 7,
                            instruction: '代入验证',
                            latex: '\\sqrt{1 + 3} = \\sqrt{4} = 2',
                            explanation: '将 x = 1 代入原方程，验证等式成立。因此，x = 1 是方程的解。'
                          }
                        ]} 
                      />
                    </motion.div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="equation-container"
                    >
                      <h3 className="text-xl font-semibold mb-4">无理方程的应用</h3>
                      <p className="mb-4">
                        无理方程在实际生活和科学中有许多应用，例如：
                      </p>
                      <ul className="space-y-2 list-disc pl-5 mb-4">
                        <li>几何问题（计算三角形的边长）</li>
                        <li>物理学（自由落体运动时间）</li>
                        <li>工程学（测量问题）</li>
                        <li>优化问题（最短路径计算）</li>
                      </ul>
                      <p>
                        通过掌握无理方程的解法，你将能够解决这类实际问题。
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="equation-container"
                    >
                      <h3 className="text-xl font-semibold mb-4">解题技巧</h3>
                      <div className="space-y-3">
                        <div className="bg-algebra-pink/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-pink">隔离根号</p>
                          <p className="text-sm">将方程整理为"一个根号 = 常数或表达式"的形式再平方</p>
                        </div>
                        <div className="bg-algebra-pink/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-pink">多次平方</p>
                          <p className="text-sm">对于含多个根号的方程，可能需要多次平方来消除所有根号</p>
                        </div>
                        <div className="bg-algebra-pink/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-pink">检验很重要</p>
                          <p className="text-sm">必须检验解是否满足原方程，因为平方可能引入外来解</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-gradient-to-br from-algebra-pink/20 to-algebra-pink/5 p-6 rounded-xl"
                    >
                      <h3 className="text-xl font-semibold mb-2">准备好练习了吗？</h3>
                      <p className="mb-4">
                        尝试解决一些实际例题，巩固你的学习成果。
                      </p>
                      <Button 
                        onClick={() => setCurrentTab("practice")}
                        className="bg-algebra-pink hover:bg-algebra-pink/90"
                      >
                        开始练习
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="practice" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <PracticeQuestion 
                      equation={practiceEquation}
                      onSolve={handleSolve}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="equation-container">
                      <h3 className="text-xl font-semibold mb-4">难度选择</h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => generateNewEquation('basic')}
                        >
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">基础</span>
                          基础练习
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => generateNewEquation('intermediate')}
                        >
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium mr-2">中等</span>
                          提高练习
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => generateNewEquation('advanced')}
                        >
                          <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium mr-2">进阶</span>
                          挑战练习
                        </Button>
                      </div>
                    </div>

                    <div className="equation-container">
                      <h3 className="text-xl font-semibold mb-4">学习进度</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>基础实例</span>
                          {isExampleCompleted ? (
                            <span className="flex items-center text-green-600 text-sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              已完成
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">未完成</span>
                          )}
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-algebra-pink rounded-full transition-all duration-500"
                            style={{ width: isExampleCompleted ? '100%' : '0%' }}
                          />
                        </div>
                        
                        <div className="pt-4 flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            asChild 
                          >
                            <Link to="/fractional-equations">
                              上一章：分式方程
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            asChild 
                            className="bg-algebra-pink/10 text-algebra-pink border-algebra-pink/20 hover:bg-algebra-pink/20"
                          >
                            <Link to="/quadratic-equations">
                              下一章：二元二次方程
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RadicalEquations;
