
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StepByStepSolver from '@/components/StepByStepSolver';
import PracticeQuestion from '@/components/PracticeQuestion';
import EquationRenderer from '@/components/EquationRenderer';
import { Button } from '@/components/ui/button';
import { FileText, ChevronRight, CheckCircle, BookOpen, Lightbulb } from 'lucide-react';
import { 
  generateWordProblem, 
  Equation 
} from '@/utils/equationUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WordProblems = () => {
  const [currentTab, setCurrentTab] = useState("learn");
  const [practiceEquation, setPracticeEquation] = useState<Equation>(
    generateWordProblem('basic')
  );
  const [isExampleCompleted, setIsExampleCompleted] = useState(false);

  const handleSolve = (isCorrect: boolean) => {
    if (isCorrect) {
      setIsExampleCompleted(true);
    }
  };

  const generateNewEquation = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
    setPracticeEquation(generateWordProblem(difficulty));
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
          <div className="inline-block rounded-lg bg-algebra-yellow/10 px-3 py-1 text-sm text-algebra-yellow">
            应用题
          </div>
          <h1 className="text-3xl font-bold mt-2">列方程解应用题</h1>
          <p className="text-xl text-muted-foreground mt-2">
            学习如何通过列方程解决实际问题
          </p>
        </div>

        <Tabs defaultValue="learn" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="learn" className="text-base">
              <BookOpen className="h-4 w-4 mr-2" />
              方法讲解
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-base">
              <FileText className="h-4 w-4 mr-2" />
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
                        如何用方程解决应用题
                      </motion.h2>
                      
                      <motion.div variants={itemVariants}>
                        <p className="mb-4">
                          应用题是将实际问题转化为数学模型并求解的过程。通过列方程解应用题，我们需要将文字描述转化为数学表达式，然后运用前面学习的方程解法技巧求解。
                        </p>
                        
                        <div className="p-4 bg-accent rounded-lg mb-4">
                          <p className="italic text-muted-foreground mb-2">应用题例子：</p>
                          <p>小明的年龄是小红的5倍，两人年龄之和是36岁。求小明和小红各多少岁？</p>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex space-x-3 my-4">
                        <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">解题思路</p>
                          <p className="text-blue-700">解决应用题的关键是找出未知量，并根据题目条件建立方程或方程组。通常需要仔细分析题目中的数量关系，特别是"相等"、"倍数"、"和差"等关系。</p>
                        </div>
                      </motion.div>
                      
                      <motion.h3 variants={itemVariants} className="text-xl font-semibold mt-6 mb-4">
                        解应用题的步骤
                      </motion.h3>

                      <motion.div variants={itemVariants} className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-3 mt-0.5">1</div>
                          <div>
                            <p className="font-medium">审题</p>
                            <p className="text-muted-foreground">仔细阅读题目，明确已知条件和求解目标</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-3 mt-0.5">2</div>
                          <div>
                            <p className="font-medium">设未知数</p>
                            <p className="text-muted-foreground">为题目中的未知量设置变量，如x、y等</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-3 mt-0.5">3</div>
                          <div>
                            <p className="font-medium">列方程</p>
                            <p className="text-muted-foreground">根据题目条件，用数学语言表达数量关系，建立方程或方程组</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-3 mt-0.5">4</div>
                          <div>
                            <p className="font-medium">解方程</p>
                            <p className="text-muted-foreground">运用之前学过的方程解法求解</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-3 mt-0.5">5</div>
                          <div>
                            <p className="font-medium">检验结果</p>
                            <p className="text-muted-foreground">将解代入原题，验证是否满足所有条件</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-3 mt-0.5">6</div>
                          <div>
                            <p className="font-medium">答题</p>
                            <p className="text-muted-foreground">根据题目要求，完整地写出答案</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold mb-4">应用题示例解析</h3>
                      <StepByStepSolver 
                        steps={[
                          {
                            stepNumber: 1,
                            instruction: '审题',
                            latex: `\\text{小明的年龄是小红的5倍，两人年龄之和是36岁。}`,
                            explanation: '这是一个基本的年龄问题，需要求出小明和小红各自的年龄。'
                          },
                          {
                            stepNumber: 2,
                            instruction: '设未知数',
                            latex: `\\text{设小红的年龄为}x\\text{岁，则小明的年龄为}5x\\text{岁}`,
                            explanation: '根据题目，小明的年龄是小红的5倍，所以如果设小红的年龄为x，则小明的年龄为5x。'
                          },
                          {
                            stepNumber: 3,
                            instruction: '列方程',
                            latex: `x + 5x = 36`,
                            explanation: '根据题目条件"两人年龄之和是36岁"，可以列出方程：小红的年龄 + 小明的年龄 = 36岁。'
                          },
                          {
                            stepNumber: 4,
                            instruction: '解方程',
                            latex: `6x = 36`,
                            explanation: '合并同类项：x + 5x = 6x。'
                          },
                          {
                            stepNumber: 5,
                            instruction: '计算',
                            latex: `x = 6`,
                            explanation: '两边同除以6，得到x = 6。'
                          },
                          {
                            stepNumber: 6,
                            instruction: '求小明的年龄',
                            latex: `5x = 5 \\times 6 = 30`,
                            explanation: '小明的年龄是小红的5倍，即5x = 5 × 6 = 30岁。'
                          },
                          {
                            stepNumber: 7,
                            instruction: '检验',
                            latex: `6 + 30 = 36`,
                            explanation: '验证：小红的年龄 + 小明的年龄 = 6 + 30 = 36岁，符合题目条件。'
                          },
                          {
                            stepNumber: 8,
                            instruction: '答题',
                            latex: `\\text{小红6岁，小明30岁。}`,
                            explanation: '根据解得的结果，写出完整答案：小红6岁，小明30岁。'
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
                      <h3 className="text-xl font-semibold mb-4">常见应用题类型</h3>
                      <div className="space-y-3">
                        <div className="p-3 border border-border rounded-lg">
                          <p className="font-medium">数字问题</p>
                          <p className="text-sm text-muted-foreground">如求两数之和、差、积、商等</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="font-medium">年龄问题</p>
                          <p className="text-sm text-muted-foreground">涉及现在、过去或将来的年龄关系</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="font-medium">工作问题</p>
                          <p className="text-sm text-muted-foreground">涉及工作效率、完成时间等</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="font-medium">运动问题</p>
                          <p className="text-sm text-muted-foreground">涉及速度、时间、距离等</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="font-medium">浓度问题</p>
                          <p className="text-sm text-muted-foreground">涉及混合物的浓度变化</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="font-medium">几何问题</p>
                          <p className="text-sm text-muted-foreground">涉及几何图形的周长、面积等</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="equation-container"
                    >
                      <h3 className="text-xl font-semibold mb-4">解题技巧</h3>
                      <div className="space-y-3">
                        <div className="bg-algebra-yellow/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-yellow">设未知数技巧</p>
                          <p className="text-sm">选择合适的未知数可以简化方程，通常选择题目中最基本的量</p>
                        </div>
                        <div className="bg-algebra-yellow/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-yellow">画图辅助</p>
                          <p className="text-sm">对于几何问题或运动问题，画图可以帮助理清关系</p>
                        </div>
                        <div className="bg-algebra-yellow/10 p-3 rounded-lg">
                          <p className="font-medium text-algebra-yellow">列表分析</p>
                          <p className="text-sm">对于复杂问题，可以用表格整理各个量之间的关系</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-gradient-to-br from-algebra-yellow/20 to-algebra-yellow/5 p-6 rounded-xl"
                    >
                      <h3 className="text-xl font-semibold mb-2">准备好练习了吗？</h3>
                      <p className="mb-4">
                        尝试解决一些实际例题，巩固你的学习成果。
                      </p>
                      <Button 
                        onClick={() => setCurrentTab("practice")}
                        className="bg-algebra-yellow hover:bg-algebra-yellow/90 text-black"
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
                            className="h-full bg-algebra-yellow rounded-full transition-all duration-500"
                            style={{ width: isExampleCompleted ? '100%' : '0%' }}
                          />
                        </div>
                        
                        <div className="pt-4 flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            asChild 
                          >
                            <Link to="/quadratic-equations">
                              上一章：二元二次方程
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            asChild 
                            className="bg-algebra-yellow/10 text-algebra-yellow border-algebra-yellow/20 hover:bg-algebra-yellow/20"
                          >
                            <Link to="/practice">
                              进入综合练习
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

export default WordProblems;
