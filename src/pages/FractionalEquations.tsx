import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StepByStepSolver from '@/components/StepByStepSolver';
import PracticeQuestion from '@/components/PracticeQuestion';
import EquationRenderer from '@/components/EquationRenderer';
import { Button } from '@/components/ui/button';
import { Divide, ChevronRight, CheckCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { 
  generateFractionalEquation, 
  Equation 
} from '@/utils/equationUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FractionalEquations = () => {
  const [currentTab, setCurrentTab] = useState("learn");
  const [practiceEquation, setPracticeEquation] = useState<Equation>(
    generateFractionalEquation('basic')
  );
  const [isExampleCompleted, setIsExampleCompleted] = useState(false);

  const handleSolve = (isCorrect: boolean) => {
    if (isCorrect) {
      setIsExampleCompleted(true);
    }
  };

  const generateNewEquation = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
    setPracticeEquation(generateFractionalEquation(difficulty));
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
          <div className="inline-block rounded-lg bg-algebra-purple/10 px-3 py-1 text-sm text-algebra-purple">
            分式方程
          </div>
          <h1 className="text-3xl font-bold mt-2">分式方程基础</h1>
          <p className="text-xl text-muted-foreground mt-2">
            掌握分式方程的定义和解法技巧
          </p>
        </div>

        <Tabs defaultValue="learn" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="learn" className="text-base">
              <BookOpen className="h-4 w-4 mr-2" />
              方程讲解
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-base">
              <Divide className="h-4 w-4 mr-2" />
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
                        什么是分式方程？
                      </motion.h2>
                      
                      <motion.div variants={itemVariants}>
                        <p className="mb-4">
                          <strong>分式方程</strong>是一种有理方程，等号两边至少有一个分母含有未知数。分式方程的解法主要是通过去分母转化为整式方程。
                        </p>
                        
                        <div className="p-4 bg-accent rounded-lg mb-4">
                          <EquationRenderer
                            latex="\frac{a}{x + b} = c"
                            displayMode={true}
                          />
                        </div>
                        
                        <p className="mb-4">
                          其中，a、b、c是常数，x是未知数。由于分母中含有未知数，解这类方程时需要特别注意分母不能为零的约束条件。
                        </p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex space-x-3 my-4">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">注意事项</p>
                          <p className="text-amber-700">解分式方程时，必须注意分母不能为零的约束条件，否则可能会引入外来解。因此，求解后必须进行检验。</p>
                        </div>
                      </motion.div>
                      
                      <motion.h3 variants={itemVariants} className="text-xl font-semibold mt-6 mb-4">
                        分式方程的解法步骤
                      </motion.h3>

                      <motion.div variants={itemVariants} className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-purple text-white font-bold flex-shrink-0 mr-3 mt-0.5">1</div>
                          <div>
                            <p className="font-medium">找出约束条件</p>
                            <p className="text-muted-foreground">确定使分母为零的x值，这些值不是方程的解</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-purple text-white font-bold flex-shrink-0 mr-3 mt-0.5">2</div>
                          <div>
                            <p className="font-medium">去分母</p>
                            <p className="text-muted-foreground">通过等式两边同乘以所有分母的最小公倍数来消去分母</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-purple text-white font-bold flex-shrink-0 mr-3 mt-0.5">3</div>
                          <div>
                            <p className="font-medium">解整式方程</p>
                            <p className="text-muted-foreground">去分母后，按照整式方程的解法步骤求解</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-purple text-white font-bold flex-shrink-0 mr-3 mt-0.5">4</div>
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
                            latex: '\\frac{2}{x-1} = 4',
                            explanation: '这是一个分式方程，分母中含有未知数x。首先需要确定约束条件：x ≠ 1。'
                          },
                          {
                            stepNumber: 2,
                            instruction: '去分母',
                            latex: '\\frac{2}{x-1} \\cdot (x-1) = 4 \\cdot (x-1)',
                            explanation: '等式两边同乘以分母(x-1)，以消去分母。注意，这里要求x ≠ 1。'
                          },
                          {
                            stepNumber: 3,
                            instruction: '化简',
                            latex: '2 = 4(x-1)',
                            explanation: '左边的分式化简为2。'
                          },
                          {
                            stepNumber: 4,
                            instruction: '展开右边',
                            latex: '2 = 4x - 4',
                            explanation: '展开右边的括号。'
                          },
                          {
                            stepNumber: 5,
                            instruction: '移项',
                            latex: '2 + 4 = 4x',
                            explanation: '将常数项移到等式左边。'
                          },
                          {
                            stepNumber: 6,
                            instruction: '合并同类项',
                            latex: '6 = 4x',
                            explanation: '计算左边的值：2 + 4 = 6。'
                          },
                          {
                            stepNumber: 7,
                            instruction: '两边同除以系数',
                            latex: '\\frac{6}{4} = x',
                            explanation: '等式两边同除以x的系数4。'
                          },
                          {
                            stepNumber: 8,
                            instruction: '得出结果',
                            latex: 'x = \\frac{3}{2}',
                            explanation: '计算得到x = 3/2 = 1.5。'
                          },
                          {
                            stepNumber: 9,
                            instruction: '检验',
                            latex: 'x = \\frac{3}{2} \\neq 1',
                            explanation: '检查约束条件：x = 3/2 ≠ 1，满足约束条件。'
                          },
                          {
                            stepNumber: 10,
                            instruction: '代入验证',
                            latex: '\\frac{2}{\\frac{3}{2}-1} = \\frac{2}{\\frac{1}{2}} = 2 \\cdot 2 = 4',
                            explanation: '将x = 3/2代入原方程，验证等式成立。因此，x = 3/2是方程的解。'
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
                      <h3 className="text-xl font-semibold mb-4">分式方程的应用</h3>
                      <p className="mb-4">
                        分式方程在实际生活中有许多应用场景，例如：
                      </p>
                      <ul className="space-y-2 list-disc pl-5 mb-4">
                        <li>工作效率问题（多人合作完成同一工作）</li>
                        <li>配比问题（混合不同浓度的溶液）</li>
                        <li>电路分析（并联电路中的电阻计算）</li>
                        <li>运动问题（速度与时间的关系）</li>
                      </ul>
                      <p>
                        通过掌握分式方程的解法，你将能够解决这类实际问题。
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
                        <div className="bg-algebra-purple/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-purple">通分技巧</p>
                          <p className="text-sm">对于多个分式相加减的情况，先通分再去分母更高效</p>
                        </div>
                        <div className="bg-algebra-purple/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-purple">约束条件</p>
                          <p className="text-sm">始终记录并检查约束条件，避免引入无意义的解</p>
                        </div>
                        <div className="bg-algebra-purple/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-purple">因式分解</p>
                          <p className="text-sm">对于复杂的分母，可以先因式分解再去分母</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-gradient-to-br from-algebra-purple/20 to-algebra-purple/5 p-6 rounded-xl"
                    >
                      <h3 className="text-xl font-semibold mb-2">准备好练习了吗？</h3>
                      <p className="mb-4">
                        尝试解决一些实际例题，巩固你的学习成果。
                      </p>
                      <Button 
                        onClick={() => setCurrentTab("practice")}
                        className="bg-algebra-purple hover:bg-algebra-purple/90"
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
                            className="h-full bg-algebra-purple rounded-full transition-all duration-500"
                            style={{ width: isExampleCompleted ? '100%' : '0%' }}
                          />
                        </div>
                        
                        <div className="pt-4 flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            asChild 
                          >
                            <Link to="/polynomial-equations">
                              上一章：整式方程
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            asChild 
                            className="bg-algebra-purple/10 text-algebra-purple border-algebra-purple/20 hover:bg-algebra-purple/20"
                          >
                            <Link to="/radical-equations">
                              下一章：无理方程
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

export default FractionalEquations;
