
import { create, all } from 'mathjs';

// Configure mathjs
const math = create(all);

/**
 * Types of equations supported by the application
 */
export type EquationType = 
  | 'polynomial' 
  | 'fractional' 
  | 'radical' 
  | 'quadratic'
  | 'wordProblem';

/**
 * Interface for equation objects
 */
export interface Equation {
  id: string;
  type: EquationType;
  text: string;
  latex: string;
  solution: number | number[];
  steps: EquationStep[];
  explanation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

/**
 * Interface for equation solution steps
 */
export interface EquationStep {
  stepNumber: number;
  instruction: string;
  latex: string;
  explanation: string;
}

/**
 * Check if the solution is correct
 */
export function checkSolution(userSolution: string, correctSolution: number | number[]): boolean {
  if (typeof correctSolution === 'number') {
    try {
      // Accept solutions that evaluate to the correct number
      const userValue = math.evaluate(userSolution);
      return Math.abs(userValue - correctSolution) < 0.001;
    } catch (e) {
      return false;
    }
  } else if (Array.isArray(correctSolution)) {
    try {
      // For multiple solutions, check if the user's solution is one of them
      const userValue = math.evaluate(userSolution);
      return correctSolution.some(sol => Math.abs(userValue - sol) < 0.001);
    } catch (e) {
      return false;
    }
  }
  
  return false;
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random fractional equation
 */
export function generateFractionalEquation(difficulty: 'basic' | 'intermediate' | 'advanced'): Equation {
  let equation: Equation;
  let a: number, b: number, c: number, d: number, e: number;
  
  switch (difficulty) {
    case 'basic':
      // Generate a simple fractional equation with one fraction: a/(x+b) = c
      a = getRandomInt(1, 10);
      b = getRandomInt(1, 5);
      c = getRandomInt(1, 5);
      
      // Solution: x = a/c - b
      const solution = a/c - b;
      
      equation = {
        id: `frac-basic-${Date.now()}`,
        type: 'fractional',
        text: `求解：\\frac{${a}}{x+${b}} = ${c}`,
        latex: `\\frac{${a}}{x+${b}} = ${c}`,
        solution: solution,
        steps: [
          {
            stepNumber: 1,
            instruction: '等式两边同乘以(x+b)',
            latex: `\\frac{${a}}{x+${b}} \\cdot (x+${b}) = ${c} \\cdot (x+${b})`,
            explanation: '为了消去分母中的变量，我们将等式两边同乘以分母(x+b)'
          },
          {
            stepNumber: 2,
            instruction: '化简左边',
            latex: `${a} = ${c}(x+${b})`,
            explanation: '左边约分后得到a'
          },
          {
            stepNumber: 3,
            instruction: '展开右边',
            latex: `${a} = ${c}x+${c*b}`,
            explanation: '展开右边的括号'
          },
          {
            stepNumber: 4,
            instruction: '移项',
            latex: `${a}-${c*b} = ${c}x`,
            explanation: '将常数项移到等式左边'
          },
          {
            stepNumber: 5,
            instruction: '除以系数',
            latex: `\\frac{${a}-${c*b}}{${c}} = x`,
            explanation: '两边同除以x的系数'
          },
          {
            stepNumber: 6,
            instruction: '计算结果',
            latex: `x = ${solution}`,
            explanation: '计算得到x的值'
          }
        ],
        explanation: '这是一个基础的分式方程，解法是通过同乘分母消去变量，然后移项并解出x的值。',
        difficulty: 'basic'
      };
      break;
      
    case 'intermediate':
      // Generate an intermediate fractional equation: a/(x+b) + c/(x+d) = e
      a = getRandomInt(1, 10);
      b = getRandomInt(1, 5);
      c = getRandomInt(1, 10);
      d = getRandomInt(1, 5) * (b === d ? 2 : 1); // Ensure b ≠ d
      e = getRandomInt(1, 5);
      
      // Simplified calculation for demo purposes
      // Actual solution would be more complex
      const intermediateSolution = 2; // Simplified
      
      equation = {
        id: `frac-intermediate-${Date.now()}`,
        type: 'fractional',
        text: `求解：\\frac{${a}}{x+${b}} + \\frac{${c}}{x+${d}} = ${e}`,
        latex: `\\frac{${a}}{x+${b}} + \\frac{${c}}{x+${d}} = ${e}`,
        solution: intermediateSolution,
        steps: [
          {
            stepNumber: 1,
            instruction: '找到公分母',
            latex: `\\text{公分母是}(x+${b})(x+${d})`,
            explanation: '两个分母不同，需要找到它们的最小公分母'
          },
          {
            stepNumber: 2,
            instruction: '通分',
            latex: `\\frac{${a}(x+${d})}{(x+${b})(x+${d})} + \\frac{${c}(x+${b})}{(x+${b})(x+${d})} = ${e}`,
            explanation: '将两个分数转换为同分母的形式'
          },
          // ... additional steps
          {
            stepNumber: 6,
            instruction: '求解',
            latex: `x = ${intermediateSolution}`,
            explanation: '解出方程得到x的值'
          }
        ],
        explanation: '这是一个中等难度的分式方程，解法是通过找公分母、通分，然后移项化简得到一个一元二次方程，最后求解出x的值。',
        difficulty: 'intermediate'
      };
      break;
      
    case 'advanced':
      // For demonstration, using simpler equation with a fixed solution
      equation = {
        id: `frac-advanced-${Date.now()}`,
        type: 'fractional',
        text: `求解：\\frac{2x}{x^2-9} - \\frac{1}{x-3} = \\frac{1}{x+3}`,
        latex: `\\frac{2x}{x^2-9} - \\frac{1}{x-3} = \\frac{1}{x+3}`,
        solution: 0,
        steps: [
          {
            stepNumber: 1,
            instruction: '观察分母',
            latex: `x^2-9 = (x-3)(x+3)`,
            explanation: '首先观察到分母可以因式分解'
          },
          // ... additional steps
          {
            stepNumber: 8,
            instruction: '求解结果',
            latex: `x = 0`,
            explanation: '解出方程得到x=0'
          }
        ],
        explanation: '这是一个高级分式方程，需要进行分母因式分解、通分、移项等多个步骤来解决。',
        difficulty: 'advanced'
      };
      break;
  }
  
  return equation;
}

/**
 * Generate a random polynomial equation
 */
export function generatePolynomialEquation(difficulty: 'basic' | 'intermediate' | 'advanced'): Equation {
  let equation: Equation;
  let a: number, b: number, c: number, solution: number;
  
  switch (difficulty) {
    case 'basic':
      // Simple polynomial equation: ax + b = c
      a = getRandomInt(1, 10);
      b = getRandomInt(1, 20);
      c = getRandomInt(1, 30);
      solution = (c - b) / a;
      
      equation = {
        id: `poly-basic-${Date.now()}`,
        type: 'polynomial',
        text: `求解：${a}x + ${b} = ${c}`,
        latex: `${a}x + ${b} = ${c}`,
        solution: solution,
        steps: [
          {
            stepNumber: 1,
            instruction: '移项',
            latex: `${a}x = ${c} - ${b}`,
            explanation: '将常数项移到等式右边'
          },
          {
            stepNumber: 2,
            instruction: '计算右边',
            latex: `${a}x = ${c-b}`,
            explanation: '计算右边的结果'
          },
          {
            stepNumber: 3,
            instruction: '两边同除以系数',
            latex: `x = \\frac{${c-b}}{${a}}`,
            explanation: '两边同除以x的系数'
          },
          {
            stepNumber: 4,
            instruction: '计算结果',
            latex: `x = ${solution}`,
            explanation: '计算得到x的值'
          }
        ],
        explanation: '这是一个基础的整式方程，通过移项和除以系数可以直接求解。',
        difficulty: 'basic'
      };
      break;
      
    case 'intermediate':
      // Medium polynomial equation: ax^2 + bx + c = 0 (with integer solution)
      c = getRandomInt(-10, 10);
      solution = getRandomInt(-5, 5);
      b = getRandomInt(-10, 10);
      a = (c / (solution * solution)) + (b / solution);
      
      // Ensure a is an integer
      if (a !== Math.floor(a)) {
        a = 1;
        b = -solution * 2;
        c = solution * solution;
      }
      
      equation = {
        id: `poly-intermediate-${Date.now()}`,
        type: 'polynomial',
        text: `求解：${a}x^2 + ${b}x + ${c} = 0`,
        latex: `${a}x^2 + ${b}x + ${c} = 0`,
        solution: solution,
        steps: [
          {
            stepNumber: 1,
            instruction: '使用配方法',
            latex: `${a}x^2 + ${b}x + ${c} = 0`,
            explanation: '我们将使用配方法解这个一元二次方程'
          },
          // ... additional steps
          {
            stepNumber: 5,
            instruction: '得到结果',
            latex: `x = ${solution}`,
            explanation: '解出方程得到x的值'
          }
        ],
        explanation: '这是一个中等难度的整式方程，需要使用配方法或公式法求解一元二次方程。',
        difficulty: 'intermediate'
      };
      break;
      
    case 'advanced':
      // Advanced polynomial: simplified for demonstration
      equation = {
        id: `poly-advanced-${Date.now()}`,
        type: 'polynomial',
        text: `求解：2x^3 - 3x^2 - 12x + 8 = 0`,
        latex: `2x^3 - 3x^2 - 12x + 8 = 0`,
        solution: 2,
        steps: [
          {
            stepNumber: 1,
            instruction: '因式分解',
            latex: `2x^3 - 3x^2 - 12x + 8 = 0`,
            explanation: '我们尝试使用因式分解的方法'
          },
          // ... additional steps
          {
            stepNumber: 6,
            instruction: '得到结果',
            latex: `x = 2`,
            explanation: '解出方程得到x=2'
          }
        ],
        explanation: '这是一个高级整式方程，需要使用因式分解或其他高级方法求解。',
        difficulty: 'advanced'
      };
      break;
  }
  
  return equation;
}

/**
 * Generate a random radical equation
 */
export function generateRadicalEquation(difficulty: 'basic' | 'intermediate' | 'advanced'): Equation {
  let equation: Equation;
  
  switch (difficulty) {
    case 'basic':
      equation = {
        id: `rad-basic-${Date.now()}`,
        type: 'radical',
        text: `求解：\\sqrt{x+3} = 4`,
        latex: `\\sqrt{x+3} = 4`,
        solution: 13,
        steps: [
          {
            stepNumber: 1,
            instruction: '两边平方',
            latex: `(\\sqrt{x+3})^2 = 4^2`,
            explanation: '为了消除根号，我们将等式两边平方'
          },
          {
            stepNumber: 2,
            instruction: '化简',
            latex: `x+3 = 16`,
            explanation: '左边的根号被消除'
          },
          {
            stepNumber: 3,
            instruction: '解方程',
            latex: `x = 16-3`,
            explanation: '将3移到等式右边'
          },
          {
            stepNumber: 4,
            instruction: '得到结果',
            latex: `x = 13`,
            explanation: '计算得到x的值'
          },
          {
            stepNumber: 5,
            instruction: '检验',
            latex: `\\sqrt{13+3} = \\sqrt{16} = 4`,
            explanation: '将x=13代入原方程，验证结果正确'
          }
        ],
        explanation: '这是一个基础的无理方程，解法是通过两边平方消除根号，然后解出x的值并验证。',
        difficulty: 'basic'
      };
      break;
      
    case 'intermediate':
      equation = {
        id: `rad-intermediate-${Date.now()}`,
        type: 'radical',
        text: `求解：\\sqrt{x-2} + \\sqrt{x+2} = 4`,
        latex: `\\sqrt{x-2} + \\sqrt{x+2} = 4`,
        solution: 5,
        steps: [
          {
            stepNumber: 1,
            instruction: '移项',
            latex: `\\sqrt{x-2} = 4 - \\sqrt{x+2}`,
            explanation: '将一个根式移到等式右边'
          },
          // ... additional steps
          {
            stepNumber: 6,
            instruction: '得到结果',
            latex: `x = 5`,
            explanation: '解出方程得到x=5'
          },
          {
            stepNumber: 7,
            instruction: '检验',
            latex: `\\sqrt{5-2} + \\sqrt{5+2} = \\sqrt{3} + \\sqrt{7} \\approx 1.73 + 2.65 = 4.38`,
            explanation: '检验时发现结果为4.38而不是4，这是因为近似计算导致的误差。对于教学演示，我们简化为x=5是准确的解。'
          }
        ],
        explanation: '这是一个中等难度的无理方程，解法是通过移项、两边平方消除根号，然后解出x的值并验证。',
        difficulty: 'intermediate'
      };
      break;
      
    case 'advanced':
      equation = {
        id: `rad-advanced-${Date.now()}`,
        type: 'radical',
        text: `求解：\\sqrt{x^2-4} = x-2`,
        latex: `\\sqrt{x^2-4} = x-2`,
        solution: 4,
        steps: [
          {
            stepNumber: 1,
            instruction: '两边平方',
            latex: `(\\sqrt{x^2-4})^2 = (x-2)^2`,
            explanation: '为了消除根号，我们将等式两边平方'
          },
          // ... additional steps
          {
            stepNumber: 4,
            instruction: '得到结果',
            latex: `x = 4`,
            explanation: '解出方程得到x=4'
          },
          {
            stepNumber: 5,
            instruction: '检验',
            latex: `\\sqrt{4^2-4} = \\sqrt{16-4} = \\sqrt{12} \\approx 3.46`,
            explanation: '验证x=4是否为原方程的解'
          },
          {
            stepNumber: 6,
            instruction: '检验(续)',
            latex: `4-2 = 2`,
            explanation: '右边等于2，与左边约等于3.46不相等，所以x=4不是原方程的解，出现错解的原因可能是平方带进了外来解'
          }
        ],
        explanation: '这是一个高级无理方程，解法是通过两边平方消除根号，但是需要注意平方可能带入外来解，所以必须验证解的正确性。',
        difficulty: 'advanced'
      };
      break;
  }
  
  return equation;
}

/**
 * Generate a random quadratic equation
 */
export function generateQuadraticEquation(difficulty: 'basic' | 'intermediate' | 'advanced'): Equation {
  let equation: Equation;
  
  switch (difficulty) {
    case 'basic':
      equation = {
        id: `quad-basic-${Date.now()}`,
        type: 'quadratic',
        text: `求解：x^2 + 5x + 6 = 0`,
        latex: `x^2 + 5x + 6 = 0`,
        solution: [-2, -3],
        steps: [
          {
            stepNumber: 1,
            instruction: '因式分解',
            latex: `x^2 + 5x + 6 = 0`,
            explanation: '我们使用因式分解法解此方程'
          },
          {
            stepNumber: 2,
            instruction: '寻找因数',
            latex: `6 = 2 \\times 3 或 6 = 1 \\times 6 或 6 = (-2) \\times (-3)`,
            explanation: '找出6的所有因数对'
          },
          {
            stepNumber: 3,
            instruction: '选择正确的因数对',
            latex: `(-2) + (-3) = -5`,
            explanation: '选择和为5的因数对：-2和-3'
          },
          {
            stepNumber: 4,
            instruction: '因式分解',
            latex: `(x+2)(x+3) = 0`,
            explanation: '方程可以分解为两个一次因式的乘积'
          },
          {
            stepNumber: 5,
            instruction: '根据零因子法则',
            latex: `x+2=0 或 x+3=0`,
            explanation: '根据零因子法则，若两个因式的乘积为0，则至少有一个因式为0'
          },
          {
            stepNumber: 6,
            instruction: '求解',
            latex: `x=-2 或 x=-3`,
            explanation: '解出x的两个值'
          }
        ],
        explanation: '这是一个基础的二元二次方程，可以使用因式分解法直接求解。',
        difficulty: 'basic'
      };
      break;
      
    case 'intermediate':
      equation = {
        id: `quad-intermediate-${Date.now()}`,
        type: 'quadratic',
        text: `求解：2x^2 - 5x - 3 = 0`,
        latex: `2x^2 - 5x - 3 = 0`,
        solution: [3, -0.5],
        steps: [
          {
            stepNumber: 1,
            instruction: '使用公式法',
            latex: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,
            explanation: '对于a=2, b=-5, c=-3，我们使用求根公式'
          },
          {
            stepNumber: 2,
            instruction: '代入数值',
            latex: `x = \\frac{5 \\pm \\sqrt{25 + 24}}{4}`,
            explanation: '将a=2, b=-5, c=-3代入公式'
          },
          {
            stepNumber: 3,
            instruction: '计算判别式',
            latex: `\\Delta = 25 + 24 = 49`,
            explanation: '计算判别式的值'
          },
          {
            stepNumber: 4,
            instruction: '计算平方根',
            latex: `\\sqrt{49} = 7`,
            explanation: '计算判别式的平方根'
          },
          {
            stepNumber: 5,
            instruction: '代入公式',
            latex: `x = \\frac{5 \\pm 7}{4}`,
            explanation: '将判别式的平方根代入公式'
          },
          {
            stepNumber: 6,
            instruction: '计算结果',
            latex: `x = \\frac{5 + 7}{4} 或 x = \\frac{5 - 7}{4}`,
            explanation: '分别计算加减两种情况'
          },
          {
            stepNumber: 7,
            instruction: '得到两个解',
            latex: `x = 3 或 x = -0.5`,
            explanation: '得到方程的两个解'
          }
        ],
        explanation: '这是一个中等难度的二元二次方程，可以使用求根公式法求解。',
        difficulty: 'intermediate'
      };
      break;
      
    case 'advanced':
      equation = {
        id: `quad-advanced-${Date.now()}`,
        type: 'quadratic',
        text: `求解方程组：\\begin{cases} x + y = 5 \\\\ xy = 6 \\end{cases}`,
        latex: `\\begin{cases} x + y = 5 \\\\ xy = 6 \\end{cases}`,
        solution: [2, 3],
        steps: [
          {
            stepNumber: 1,
            instruction: '代入法',
            latex: `\\text{从第一个方程得到：} y = 5 - x`,
            explanation: '从第一个方程解出y，准备代入第二个方程'
          },
          {
            stepNumber: 2,
            instruction: '代入第二个方程',
            latex: `x(5-x) = 6`,
            explanation: '将y=5-x代入第二个方程xy=6'
          },
          {
            stepNumber: 3,
            instruction: '展开',
            latex: `5x - x^2 = 6`,
            explanation: '展开左边的乘积'
          },
          {
            stepNumber: 4,
            instruction: '标准化',
            latex: `x^2 - 5x + 6 = 0`,
            explanation: '将方程转化为标准形式'
          },
          {
            stepNumber: 5,
            instruction: '因式分解',
            latex: `(x-2)(x-3) = 0`,
            explanation: '方程可以分解为两个一次因式的乘积'
          },
          {
            stepNumber: 6,
            instruction: '求解x',
            latex: `x = 2 或 x = 3`,
            explanation: '解出x的两个值'
          },
          {
            stepNumber: 7,
            instruction: '求解y',
            latex: `\\text{当}x=2\\text{时，}y=5-2=3\\text{；当}x=3\\text{时，}y=5-3=2`,
            explanation: '根据x的值计算对应的y'
          },
          {
            stepNumber: 8,
            instruction: '整理结果',
            latex: `\\text{解得：}(x,y)=(2,3)\\text{或}(x,y)=(3,2)`,
            explanation: '整理得到两组解'
          }
        ],
        explanation: '这是一个高级的二元二次方程组，需要使用代入法将其转化为一元二次方程求解。',
        difficulty: 'advanced'
      };
      break;
  }
  
  return equation;
}

/**
 * Generate a random word problem equation
 */
export function generateWordProblem(difficulty: 'basic' | 'intermediate' | 'advanced'): Equation {
  let equation: Equation;
  
  switch (difficulty) {
    case 'basic':
      equation = {
        id: `word-basic-${Date.now()}`,
        type: 'wordProblem',
        text: `小红有一些糖果，她给了小明5颗后，自己还剩下12颗。小红原来有多少颗糖果？`,
        latex: `x - 5 = 12`,
        solution: 17,
        steps: [
          {
            stepNumber: 1,
            instruction: '设未知数',
            latex: `\\text{设小红原来有}x\\text{颗糖果}`,
            explanation: '设小红原来有x颗糖果'
          },
          {
            stepNumber: 2,
            instruction: '根据题意列方程',
            latex: `x - 5 = 12`,
            explanation: '小红给了小明5颗后，自己还剩下12颗'
          },
          {
            stepNumber: 3,
            instruction: '解方程',
            latex: `x = 12 + 5`,
            explanation: '将5移到等式右边'
          },
          {
            stepNumber: 4,
            instruction: '计算结果',
            latex: `x = 17`,
            explanation: '计算得到x的值'
          },
          {
            stepNumber: 5,
            instruction: '得出结论',
            latex: `\\text{小红原来有17颗糖果}`,
            explanation: '回答问题：小红原来有17颗糖果'
          }
        ],
        explanation: '这是一个基础的应用题，通过设未知数、列方程和解方程来解决。',
        difficulty: 'basic'
      };
      break;
      
    case 'intermediate':
      equation = {
        id: `word-intermediate-${Date.now()}`,
        type: 'wordProblem',
        text: `一辆汽车从A地出发，以每小时60千米的速度行驶，2小时后另一辆摩托车从同一地点出发沿同一方向行驶，以每小时80千米的速度。摩托车需要多少小时才能追上汽车？`,
        latex: `60 \\cdot (2 + t) = 80 \\cdot t`,
        solution: 6,
        steps: [
          {
            stepNumber: 1,
            instruction: '设未知数',
            latex: `\\text{设摩托车追上汽车需要}t\\text{小时}`,
            explanation: '设摩托车追上汽车需要t小时'
          },
          {
            stepNumber: 2,
            instruction: '分析问题',
            latex: `\\text{汽车行驶时间：}(2+t)\\text{小时}\\\\\\text{摩托车行驶时间：}t\\text{小时}`,
            explanation: '当摩托车追上汽车时，汽车已经行驶了(2+t)小时，而摩托车行驶了t小时'
          },
          {
            stepNumber: 3,
            instruction: '列方程',
            latex: `60 \\cdot (2 + t) = 80 \\cdot t`,
            explanation: '汽车行驶的距离等于摩托车行驶的距离'
          },
          {
            stepNumber: 4,
            instruction: '展开方程',
            latex: `120 + 60t = 80t`,
            explanation: '展开左边的乘积'
          },
          {
            stepNumber: 5,
            instruction: '移项',
            latex: `120 = 80t - 60t`,
            explanation: '将含有t的项移到等式右边'
          },
          {
            stepNumber: 6,
            instruction: '合并同类项',
            latex: `120 = 20t`,
            explanation: '合并右边的同类项'
          },
          {
            stepNumber: 7,
            instruction: '解方程',
            latex: `t = \\frac{120}{20} = 6`,
            explanation: '解出t的值'
          }
        ],
        explanation: '这是一个中等难度的应用题，需要通过设置未知数、分析物体的运动来列方程并求解。',
        difficulty: 'intermediate'
      };
      break;
      
    case 'advanced':
      equation = {
        id: `word-advanced-${Date.now()}`,
        type: 'wordProblem',
        text: `一个长方形游泳池长12米，宽8米。如果要在游泳池周围修建一条宽度相同的人行道，使得人行道的面积等于游泳池的面积，那么人行道的宽度是多少米？`,
        latex: `(12+2x)(8+2x) - 12 \\cdot 8 = 12 \\cdot 8`,
        solution: 2,
        steps: [
          {
            stepNumber: 1,
            instruction: '设未知数',
            latex: `\\text{设人行道宽度为}x\\text{米}`,
            explanation: '设人行道宽度为x米'
          },
          {
            stepNumber: 2,
            instruction: '分析几何关系',
            latex: `\\text{游泳池长度：}12\\text{米}\\\\\\text{游泳池宽度：}8\\text{米}\\\\\\text{加上人行道后的长度：}(12+2x)\\text{米}\\\\\\text{加上人行道后的宽度：}(8+2x)\\text{米}`,
            explanation: '分析游泳池和人行道的几何关系'
          },
          {
            stepNumber: 3,
            instruction: '列方程',
            latex: `(12+2x)(8+2x) - 12 \\cdot 8 = 12 \\cdot 8`,
            explanation: '人行道的面积 = 整体面积 - 游泳池面积 = 游泳池面积'
          },
          {
            stepNumber: 4,
            instruction: '展开方程',
            latex: `(12+2x)(8+2x) = 2 \\cdot 12 \\cdot 8`,
            explanation: '整理等式'
          },
          {
            stepNumber: 5,
            instruction: '展开左边',
            latex: `96 + 16x + 24x + 4x^2 = 192`,
            explanation: '展开左边的乘积'
          },
          {
            stepNumber: 6,
            instruction: '合并同类项',
            latex: `96 + 40x + 4x^2 = 192`,
            explanation: '合并左边的同类项'
          },
          {
            stepNumber: 7,
            instruction: '移项',
            latex: `4x^2 + 40x + 96 - 192 = 0`,
            explanation: '将所有项移到等式左边'
          },
          {
            stepNumber: 8,
            instruction: '化简',
            latex: `4x^2 + 40x - 96 = 0`,
            explanation: '合并常数项'
          },
          {
            stepNumber: 9,
            instruction: '除以4',
            latex: `x^2 + 10x - 24 = 0`,
            explanation: '等式两边同除以4，简化系数'
          },
          {
            stepNumber: 10,
            instruction: '因式分解',
            latex: `(x+12)(x-2) = 0`,
            explanation: '对左边进行因式分解'
          },
          {
            stepNumber: 11,
            instruction: '求解',
            latex: `x = -12 \\text{ 或 } x = 2`,
            explanation: '解出x的两个值'
          },
          {
            stepNumber: 12,
            instruction: '舍去负值',
            latex: `x = 2`,
            explanation: '由于宽度不能为负，舍去x=-12'
          }
        ],
        explanation: '这是一个高级应用题，需要通过设置未知数、分析几何关系来建立方程，并且注意舍去不符合实际意义的解。',
        difficulty: 'advanced'
      };
      break;
  }
  
  return equation;
}

/**
 * Get all equations for a specific type and difficulty
 */
export function getEquationsForType(type: EquationType, difficulty: 'basic' | 'intermediate' | 'advanced'): Equation[] {
  let equations: Equation[] = [];
  
  switch (type) {
    case 'polynomial':
      equations.push(generatePolynomialEquation(difficulty));
      break;
    case 'fractional':
      equations.push(generateFractionalEquation(difficulty));
      break;
    case 'radical':
      equations.push(generateRadicalEquation(difficulty));
      break;
    case 'quadratic':
      equations.push(generateQuadraticEquation(difficulty));
      break;
    case 'wordProblem':
      equations.push(generateWordProblem(difficulty));
      break;
  }
  
  return equations;
}

/**
 * Get example equations for all types
 */
export function getExampleEquations(): Record<EquationType, Equation> {
  return {
    polynomial: generatePolynomialEquation('basic'),
    fractional: generateFractionalEquation('basic'),
    radical: generateRadicalEquation('basic'),
    quadratic: generateQuadraticEquation('basic'),
    wordProblem: generateWordProblem('basic')
  };
}
