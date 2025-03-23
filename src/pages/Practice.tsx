import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PracticeQuestion from '@/components/PracticeQuestion';
import FeedbackMessage from '@/components/FeedbackMessage';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  Star, 
  ChevronRight,
  ChevronLeft,
  BrainCircuit,
  Divide,
  Square,
  Grid,
  FileText
} from 'lucide-react';
import { 
  generatePolynomialEquation, 
  generateFractionalEquation, 
  generateRadicalEquation, 
  generateQuadraticEquation, 
  generateWordProblem,
  Equation, 
  EquationType 
} from '@/utils/equationUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const Practice = () => {
  const [selectedType, setSelectedType] = useState<EquationType>('polynomial');
  const [difficulty, setDifficulty] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [currentQuestion, setCurrentQuestion] = useState<Equation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solvedCount, setSolvedCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [currentMode, setCurrentMode] = useState<'practice' | 'challenge'>('practice');
  
  // Challenge mode states
  const [challengeQuestions, setChallengeQuestions] = useState<Equation[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Load question based on selected type and difficulty
  useEffect(() => {
    if (currentMode === 'practice') {
      setIsLoading(true);
      generateQuestion();
      setIsLoading(false);
    }
  }, [selectedType, difficulty, currentMode]);
  
  // For challenge mode, generate all questions at once
  useEffect(() => {
    if (currentMode === 'challenge') {
      generateChallengeQuestions();
    }
  }, [currentMode]);
  
  const generateQuestion = () => {
    let newQuestion: Equation;
    
    switch (selectedType) {
      case 'polynomial':
        newQuestion = generatePolynomialEquation(difficulty);
        break;
      case 'fractional':
        newQuestion = generateFractionalEquation(difficulty);
        break;
      case 'radical':
        newQuestion = generateRadicalEquation(difficulty);
        break;
      case 'quadratic':
        newQuestion = generateQuadraticEquation(difficulty);
        break;
      case 'wordProblem':
        newQuestion = generateWordProblem(difficulty);
        break;
      default:
        newQuestion = generatePolynomialEquation(difficulty);
    }
    
    setCurrentQuestion(newQuestion);
  };
  
  const generateChallengeQuestions = () => {
    const questions: Equation[] = [
      generatePolynomialEquation('intermediate'),
      generateFractionalEquation('intermediate'),
      generateRadicalEquation('intermediate'),
      generateQuadraticEquation('intermediate'),
      generateWordProblem('intermediate'),
      // Two advanced questions as bonus challenges
      generatePolynomialEquation('advanced'),
      generateWordProblem('advanced'),
    ];
    
    setChallengeQuestions(questions);
    setCurrentChallengeIndex(0);
    setChallengeCompleted(false);
    setCorrectAnswers(0);
  };
  
  const handleSolve = (isCorrect: boolean) => {
    setAttemptCount(prev => prev + 1);
    
    if (isCorrect) {
      // Show success feedback
      setFeedbackType('success');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
      
      // Update stats
      setSolvedCount(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      
      if (currentMode === 'practice') {
        // Generate a new question after a short delay
        setTimeout(() => {
          generateQuestion();
        }, 2000);
      } else {
        // Update challenge progress
        setCorrectAnswers(prev => prev + 1);
        
        // Move to next question or complete challenge
        if (currentChallengeIndex < challengeQuestions.length - 1) {
          setTimeout(() => {
            setCurrentChallengeIndex(prev => prev + 1);
          }, 2000);
        } else {
          setChallengeCompleted(true);
        }
      }
    } else {
      // Show error feedback
      setFeedbackType('error');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
      
      // Reset streak
      setStreakCount(0);
    }
  };
  
  const restartChallenge = () => {
    generateChallengeQuestions();
  };
  
  const getEquationTypeIcon = (type: EquationType) => {
    switch (type) {
      case 'polynomial':
        return <BrainCircuit className="h-5 w-5" />;
      case 'fractional':
        return <Divide className="h-5 w-5" />;
      case 'radical':
        return <Square className="h-5 w-5" />;
      case 'quadratic':
        return <Grid className="h-5 w-5" />;
      case 'wordProblem':
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const getTypeColor = (type: EquationType) => {
    switch (type) {
      case 'polynomial':
        return 'text-algebra-blue';
      case 'fractional':
        return 'text-algebra-purple';
      case 'radical':
        return 'text-algebra-pink';
      case 'quadratic':
        return 'text-algebra-green';
      case 'wordProblem':
        return 'text-algebra-yellow';
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">方程练习</h1>
          <p className="text-xl text-muted-foreground mt-2">
            通过练习巩固所学的方程解法
          </p>
        </div>

        <Tabs defaultValue="practice" value={currentMode} onValueChange={(value) => setCurrentMode(value as 'practice' | 'challenge')}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="practice" className="text-base">
              <RefreshCw className="h-4 w-4 mr-2" />
              自由练习
            </TabsTrigger>
            <TabsTrigger value="challenge" className="text-base">
              <Trophy className="h-4 w-4 mr-2" />
              挑战模式
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <TabsContent value="practice" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    {isLoading ? (
                      <div className="equation-container flex items-center justify-center min-h-[300px]">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <>
                        {currentQuestion && (
                          <PracticeQuestion 
                            equation={currentQuestion}
                            onSolve={handleSolve}
                          />
                        )}
                        
                        {/* Feedback message */}
                        <div className="mt-4">
                          <FeedbackMessage 
                            type={feedbackType === 'success' ? 'success' : 'error'}
                            message={feedbackType === 'success' ? '答案正确！' : '答案错误，再试一次'}
                            description={feedbackType === 'success' ? '做得好！即将为你生成新题目。' : '仔细检查你的解题步骤，找出错误所在。'}
                            isVisible={showFeedback}
                            onClose={() => setShowFeedback(false)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="equation-container">
                      <h3 className="text-xl font-semibold mb-4">练习设置</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            方程类型
                          </label>
                          <Select 
                            value={selectedType} 
                            onValueChange={(value) => setSelectedType(value as EquationType)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="选择方程类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="polynomial">整式方程</SelectItem>
                              <SelectItem value="fractional">分式方程</SelectItem>
                              <SelectItem value="radical">无理方程</SelectItem>
                              <SelectItem value="quadratic">二元二次方程</SelectItem>
                              <SelectItem value="wordProblem">应用题</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            难度级别
                          </label>
                          <Select 
                            value={difficulty} 
                            onValueChange={(value) => setDifficulty(value as 'basic' | 'intermediate' | 'advanced')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="选择难度" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">基础</SelectItem>
                              <SelectItem value="intermediate">中等</SelectItem>
                              <SelectItem value="advanced">进阶</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button 
                          onClick={generateQuestion}
                          className="w-full"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          生成新题目
                        </Button>
                      </div>
                    </div>

                    <div className="equation-container">
                      <h3 className="text-xl font-semibold mb-4">练习统计</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-algebra-blue">{solvedCount}</div>
                          <div className="text-sm text-muted-foreground">已解决</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-algebra-green">{attemptCount > 0 ? Math.round((solvedCount / attemptCount) * 100) : 0}%</div>
                          <div className="text-sm text-muted-foreground">正确率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-algebra-purple">{streakCount}</div>
                          <div className="text-sm text-muted-foreground">连续正确</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="challenge" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!challengeCompleted ? (
                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      {challengeQuestions.length > 0 && (
                        <>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">进度: {currentChallengeIndex + 1}/{challengeQuestions.length}</span>
                              <span className="text-sm font-medium">正确: {correctAnswers}/{currentChallengeIndex}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${((currentChallengeIndex) / challengeQuestions.length) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="mb-4 flex items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getTypeColor(challengeQuestions[currentChallengeIndex].type)}`}>
                              {getEquationTypeIcon(challengeQuestions[currentChallengeIndex].type)}
                            </div>
                            <span className="ml-2 font-medium">
                              {challengeQuestions[currentChallengeIndex].type === 'polynomial' && '整式方程'}
                              {challengeQuestions[currentChallengeIndex].type === 'fractional' && '分式方程'}
                              {challengeQuestions[currentChallengeIndex].type === 'radical' && '无理方程'}
                              {challengeQuestions[currentChallengeIndex].type === 'quadratic' && '二元二次方程'}
                              {challengeQuestions[currentChallengeIndex].type === 'wordProblem' && '应用题'}
                            </span>
                            <span className="ml-2 px-2 py-0.5 bg-secondary rounded text-xs">
                              {challengeQuestions[currentChallengeIndex].difficulty === 'basic' && '基础'}
                              {challengeQuestions[currentChallengeIndex].difficulty === 'intermediate' && '中等'}
                              {challengeQuestions[currentChallengeIndex].difficulty === 'advanced' && '进阶'}
                            </span>
                          </div>
                          
                          <PracticeQuestion 
                            equation={challengeQuestions[currentChallengeIndex]}
                            onSolve={handleSolve}
                          />
                          
                          {/* Feedback message */}
                          <div className="mt-4">
                            <FeedbackMessage 
                              type={feedbackType === 'success' ? 'success' : 'error'}
                              message={feedbackType === 'success' ? '答案正确！' : '答案错误，再试一次'}
                              description={feedbackType === 'success' 
                                ? currentChallengeIndex < challengeQuestions.length - 1 
                                  ? '做得好！即将进入下一题。' 
                                  : '恭喜你完成了所有挑战！' 
                                : '仔细检查你的解题步骤，找出错误所在。'
                              }
                              isVisible={showFeedback}
                              onClose={() => setShowFeedback(false)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div className="equation-container">
                        <h3 className="text-xl font-semibold mb-4">挑战说明</h3>
                        <p className="mb-4 text-muted-foreground">
                          挑战模式包含7个不同类型和难度的方程，测试你对所有方程类型的掌握程度。
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            5道中等难度题目，覆盖所有方程类型
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            2道高级难度挑战题
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            完成后查看你的得分和评级
                          </li>
                        </ul>
                      </div>

                      <div className="equation-container">
                        <h3 className="text-xl font-semibold mb-4">当前进度</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>已完成</span>
                            <span>{currentChallengeIndex}/{challengeQuestions.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>正确率</span>
                            <span>{currentChallengeIndex > 0 ? Math.round((correctAnswers / currentChallengeIndex) * 100) : 0}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            onClick={restartChallenge}
                            variant="outline"
                            className="w-full"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            重新开始
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                  >
                    <Card className="p-8 text-center">
                      <CardContent className="pt-6">
                        <div className="mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                            <Trophy className="h-8 w-8" />
                          </div>
                          <h2 className="text-3xl font-bold mb-2">挑战完成！</h2>
                          <p className="text-muted-foreground">恭喜你完成了所有挑战题目</p>
                        </div>
                        
                        <div className="bg-secondary/50 rounded-lg p-6 mb-8 inline-block">
                          <div className="text-5xl font-bold mb-2">{correctAnswers}/{challengeQuestions.length}</div>
                          <div className="text-xl">你的得分</div>
                          
                          <div className="flex items-center justify-center mt-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index} 
                                className={`h-6 w-6 ${
                                  index < Math.ceil((correctAnswers / challengeQuestions.length) * 5) 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          
                          <div className="mt-2 text-sm font-medium">
                            {correctAnswers === challengeQuestions.length && '完美！你已经完全掌握了方程解法！'}
                            {correctAnswers >= 5 && correctAnswers < challengeQuestions.length && '很好！你对方程解法有很好的理解！'}
                            {correctAnswers >= 3 && correctAnswers < 5 && '不错！继续努力练习！'}
                            {correctAnswers < 3 && '再接再厉！多加练习可以提高解题能力！'}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button onClick={restartChallenge}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            再次挑战
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setCurrentMode('practice')}
                          >
                            返回自由练习
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Practice;
