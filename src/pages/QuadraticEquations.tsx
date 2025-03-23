
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StepByStepSolver from '@/components/StepByStepSolver';
import PracticeQuestion from '@/components/PracticeQuestion';
import EquationRenderer from '@/components/EquationRenderer';
import { Button } from '@/components/ui/button';
import { Grid, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import { 
  generateQuadraticEquation, 
  Equation 
} from '@/utils/equationUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuadraticEquations = () => {
  const [currentTab, setCurrentTab] = useState("learn");
  const [practiceEquation, setPracticeEquation] = useState<Equation>(
    generateQuadraticEquation('basic')
  );
  const [isExampleCompleted, setIsExampleCompleted] = useState(false);

  const handleSolve = (isCorrect: boolean) => {
    if (isCorrect) {
      setIsExampleCompleted(true);
    }
  };

  const generateNewEquation = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
    setPracticeEquation(generateQuadraticEquation(difficulty));
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
          <div className="inline-block rounded-lg bg-algebra-green/10 px-3 py-1 text-sm text-algebra-green">
            二元二次方程
          </div>
          <h1 className="text-3xl font-bold mt-2">二元二次方程基础</h1>
          <p className="text-xl text-muted-foreground mt-2">
            掌握二元二次方程和方程组的解法
          </p>
        </div>

        <Tabs defaultValue="learn" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="learn" className="text-base">
              <BookOpen className="h-4 w-4 mr-2" />
              方程讲解
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-base">
              <Grid className="h-4 w-4 mr-2" />
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
                        什么是二元二次方程？
                      </motion.h2>
                      
                      <motion.div variants={itemVariants}>
                        <p className="mb-4">
                          <strong>二元二次方程</strong>是含有两个未知数的二次方程。在八年级，我们主要学习二元一次方程组和简单的二元二次方程。
                        </p>
                        
                        <div className="p-4 bg-accent rounded-lg mb-4">
                          <EquationRenderer
                            latex="\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}"
                            displayMode={true}
                          />
                        </div>
                        
                        <p className="mb-4">
                          上面是一个二元一次方程组的例子，其中a、b、c、d、e、f是常数，x和y是未知数。
                        </p>
                        
                        <div className="p-4 bg-accent rounded-lg mb-4">
                          <EquationRenderer
                            latex="\\begin{cases} x + y = a \\\\ xy = b \\end{cases}"
                            displayMode={true}
                          />
                        </div>
                        
                        <p className="mb-4">
                          这是一个简单的二元二次方程组，其中一个方程是线性的，另一个包含未知数的乘积。
                        </p>
                      </motion.div>
                      
                      <motion.h3 variants={itemVariants} className="text-xl font-semibold mt-6 mb-4">
                        二元方程组的解法
                      </motion.h3>

                      <motion.div variants={itemVariants} className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-green text-white font-bold flex-shrink-0 mr-3 mt-0.5">1</div>
                          <div>
                            <p className="font-medium">代入法</p>
                            <p className="text-muted-foreground">从一个方程中解出一个未知数，代入另一个方程</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-green text-white font-bold flex-shrink-0 mr-3 mt-0.5">2</div>
                          <div>
                            <p className="font-medium">消元法</p>
                            <p className="text-muted-foreground">通过适当倍数相加减，消去一个未知数</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-green text-white font-bold flex-shrink-0 mr-3 mt-0.5">3</div>
                          <div>
                            <p className="font-medium">换元法</p>
                            <p className="text-muted-foreground">引入新的未知数，简化方程组</p>
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
                            instruction: '观察方程组',
                            latex: '\\begin{cases} x + y = 5 \\\\ xy = 6 \\end{cases}',
                            explanation: '这是一个二元二次方程组，第一个方程是线性的，第二个方程包含未知数的乘积。我们可以使用代入法求解。'
                          },
                          {
                            stepNumber: 2,
                            instruction: '从第一个方程解出y',
                            latex: 'y = 5 - x',
                            explanation: '从第一个方程中解出y，准备代入第二个方程。'
                          },
                          {
                            stepNumber: 3,
                            instruction: '代入第二个方程',
                            latex: 'x(5-x) = 6',
                            explanation: '将y = 5 - x代入第二个方程xy = 6。'
                          },
                          {
                            stepNumber: 4,
                            instruction: '展开方程',
                            latex: '5x - x^2 = 6',
                            explanation: '展开左边的乘积。'
                          },
                          {
                            stepNumber: 5,
                            instruction: '标准化为一元二次方程',
                            latex: 'x^2 - 5x + 6 = 0',
                            explanation: '将方程整理为标准形式。'
                          },
                          {
                            stepNumber: 6,
                            instruction: '因式分解',
                            latex: '(x-2)(x-3) = 0',
                            explanation: '对左边进行因式分解。'
                          },
                          {
                            stepNumber: 7,
                            instruction: '求解x',
                            latex: 'x = 2 \\text{ 或 } x = 3',
                            explanation: '根据零因子法则，得到x的两个值。'
                          },
                          {
                            stepNumber: 8,
                            instruction: '求解y',
                            latex: '\\text{当}x=2\\text{时，}y=5-2=3\\text{；当}x=3\\text{时，}y=5-3=2',
                            explanation: '根据x的值，利用y = 5 - x计算对应的y值。'
                          },
                          {
                            stepNumber: 9,
                            instruction: '整理结果',
                            latex: '\\text{解得：}(x,y)=(2,3)\\text{或}(x,y)=(3,2)',
                            explanation: '整理得到两组解。'
                          },
                          {
                            stepNumber: 10,
                            instruction: '检验',
                            latex: '\\begin{align}2+3&=5\\\\2\\times3&=6\\end{align} \\text{ 或 } \\begin{align}3+2&=5\\\\3\\times2&=6\\end{align}',
                            explanation: '将这两组解分别代入原方程组，验证它们都满足方程组的条件。'
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
                      <h3 className="text-xl font-semibold mb-4">二元方程的应用</h3>
                      <p className="mb-4">
                        二元方程组在实际生活中有广泛的应用，例如：
                      </p>
                      <ul className="space-y-2 list-disc pl-5 mb-4">
                        <li>混合问题（不同价格商品的组合）</li>
                        <li>几何问题（计算长方形的长和宽）</li>
                        <li>运动问题（涉及速度、时间和距离）</li>
                        <li>工作效率问题（多人合作完成工作）</li>
                      </ul>
                      <p>
                        通过掌握二元方程组的解法，你将能够解决这类实际问题。
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
                        <div className="bg-algebra-green/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-green">选择合适的方法</p>
                          <p className="text-sm">根据方程的特点选择代入法、消元法或换元法</p>
                        </div>
                        <div className="bg-algebra-green/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-green">简化计算</p>
                          <p className="text-sm">选择简单的方程进行变形，减少计算量</p>
                        </div>
                        <div className="bg-algebra-green/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-green">特殊方程组</p>
                          <p className="text-sm">对于形如"和与积"的方程组，可以使用韦达定理简化解法</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-gradient-to-br from-algebra-green/20 to-algebra-green/5 p-6 rounded-xl"
                    >
                      <h3 className="text-xl font-semibold mb-2">准备好练习了吗？</h3>
                      <p className="mb-4">
                        尝试解决一些实际例题，巩固你的学习成果。
                      </p>
                      <Button 
                        onClick={() => setCurrentTab("practice")}
                        className="bg-algebra-green hover:bg-algebra-green/90"
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
                            className="h-full bg-algebra-green rounded-full transition-all duration-500"
                            style={{ width: isExampleCompleted ? '100%' : '0%' }}
                          />
                        </div>
                        
                        <div className="pt-4 flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            asChild 
                          >
                            <Link to="/radical-equations">
                              上一章：无理方程
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            asChild 
                            className="bg-algebra-green/10 text-algebra-green border-algebra-green/20 hover:bg-algebra-green/20"
                          >
                            <Link to="/word-problems">
                              下一章：应用题
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

export default QuadraticEquations;
