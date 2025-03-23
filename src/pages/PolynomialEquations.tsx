
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StepByStepSolver from '@/components/StepByStepSolver';
import PracticeQuestion from '@/components/PracticeQuestion';
import EquationRenderer from '@/components/EquationRenderer';
import { Button } from '@/components/ui/button';
import { Function, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import { 
  generatePolynomialEquation, 
  Equation 
} from '@/utils/equationUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PolynomialEquations = () => {
  const [currentTab, setCurrentTab] = useState("learn");
  const [practiceEquation, setPracticeEquation] = useState<Equation>(
    generatePolynomialEquation('basic')
  );
  const [isExampleCompleted, setIsExampleCompleted] = useState(false);

  const handleSolve = (isCorrect: boolean) => {
    if (isCorrect) {
      setIsExampleCompleted(true);
    }
  };

  const generateNewEquation = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
    setPracticeEquation(generatePolynomialEquation(difficulty));
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
          <div className="inline-block rounded-lg bg-algebra-blue/10 px-3 py-1 text-sm text-algebra-blue">
            整式方程
          </div>
          <h1 className="text-3xl font-bold mt-2">整式方程基础</h1>
          <p className="text-xl text-muted-foreground mt-2">
            了解整式方程的定义、分类和基本解法
          </p>
        </div>

        <Tabs defaultValue="learn" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="learn" className="text-base">
              <BookOpen className="h-4 w-4 mr-2" />
              方程讲解
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-base">
              <Function className="h-4 w-4 mr-2" />
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
                        什么是整式方程？
                      </motion.h2>
                      
                      <motion.div variants={itemVariants}>
                        <p className="mb-4">
                          <strong>整式方程</strong>是代数方程的一种，其中变量只出现在分子中，且不包含根号形式。最常见的整式方程是<strong>一元一次方程</strong>。
                        </p>
                        
                        <div className="p-4 bg-accent rounded-lg mb-4">
                          <EquationRenderer
                            latex="ax + b = c"
                            displayMode={true}
                          />
                        </div>
                        
                        <p className="mb-4">
                          其中，a、b、c是常数，a ≠ 0，x是未知数。解这类方程的基本步骤包括移项、合并同类项和系数化简。
                        </p>
                      </motion.div>
                      
                      <motion.h3 variants={itemVariants} className="text-xl font-semibold mt-6 mb-4">
                        整式方程的解法步骤
                      </motion.h3>

                      <motion.div variants={itemVariants} className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-blue text-white font-bold flex-shrink-0 mr-3 mt-0.5">1</div>
                          <div>
                            <p className="font-medium">移项</p>
                            <p className="text-muted-foreground">将含有未知数的项移到等式一边，常数项移到另一边</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-blue text-white font-bold flex-shrink-0 mr-3 mt-0.5">2</div>
                          <div>
                            <p className="font-medium">合并同类项</p>
                            <p className="text-muted-foreground">将等式两边的同类项进行合并</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-blue text-white font-bold flex-shrink-0 mr-3 mt-0.5">3</div>
                          <div>
                            <p className="font-medium">系数化简</p>
                            <p className="text-muted-foreground">将未知数的系数化为1，得到方程的解</p>
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
                            latex: '3x - 5 = 10',
                            explanation: '这是一个一元一次方程，我们需要解出x的值。'
                          },
                          {
                            stepNumber: 2,
                            instruction: '移项',
                            latex: '3x = 10 + 5',
                            explanation: '将常数项-5移到等式右边，移项时要改变符号。'
                          },
                          {
                            stepNumber: 3,
                            instruction: '计算右边',
                            latex: '3x = 15',
                            explanation: '计算右边的表达式：10 + 5 = 15。'
                          },
                          {
                            stepNumber: 4,
                            instruction: '两边同除以系数',
                            latex: 'x = \\frac{15}{3}',
                            explanation: '为了求解x，我们需要将等式两边同除以x的系数3。'
                          },
                          {
                            stepNumber: 5,
                            instruction: '得出结果',
                            latex: 'x = 5',
                            explanation: '计算得到x的值为5。'
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
                      <h3 className="text-xl font-semibold mb-4">整式方程的应用</h3>
                      <p className="mb-4">
                        整式方程在实际生活中有广泛的应用，比如：
                      </p>
                      <ul className="space-y-2 list-disc pl-5 mb-4">
                        <li>计算未知数量</li>
                        <li>确定价格和成本</li>
                        <li>解决与时间、速度和距离相关的问题</li>
                        <li>分析简单的经济模型</li>
                      </ul>
                      <p>
                        通过学习整式方程的解法，你将掌握解决这类实际问题的基本技能。
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
                        <div className="bg-algebra-blue/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-blue">整理方程</p>
                          <p className="text-sm">先将方程整理为标准形式，有助于更清晰地解题</p>
                        </div>
                        <div className="bg-algebra-blue/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-blue">注意符号</p>
                          <p className="text-sm">移项时要注意符号变化，避免常见错误</p>
                        </div>
                        <div className="bg-algebra-blue/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-blue">检验结果</p>
                          <p className="text-sm">解出结果后，将其代入原方程进行验证</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-gradient-to-br from-algebra-blue/20 to-algebra-blue/5 p-6 rounded-xl"
                    >
                      <h3 className="text-xl font-semibold mb-2">准备好练习了吗？</h3>
                      <p className="mb-4">
                        尝试解决一些实际例题，巩固你的学习成果。
                      </p>
                      <Button onClick={() => setCurrentTab("practice")}>
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
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: isExampleCompleted ? '100%' : '0%' }}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            variant="outline" 
                            asChild 
                            className="w-full mt-2"
                          >
                            <Link to="/fractional-equations">
                              下一章：分式方程
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

export default PolynomialEquations;
