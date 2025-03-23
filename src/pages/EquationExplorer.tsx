
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import EquationCard from '@/components/EquationCard';
import { 
  Function, 
  Divide, 
  Square, 
  Grid, 
  FileText 
} from 'lucide-react';
import { EquationType } from '@/utils/equationUtils';

// Define the equation types with their details
const equationTypes: Array<{
  type: EquationType;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}> = [
  {
    type: 'polynomial',
    title: '整式方程',
    description: '学习整式方程的定义、分类和基本解法，包括一元一次方程和一元多次方程',
    icon: <Function className="h-6 w-6" />,
    path: '/polynomial-equations'
  },
  {
    type: 'fractional',
    title: '分式方程',
    description: '掌握分式方程的解法，重点关注含有未知数的分母处理方法和去分母技巧',
    icon: <Divide className="h-6 w-6" />,
    path: '/fractional-equations'
  },
  {
    type: 'radical',
    title: '无理方程',
    description: '学习含有根号的无理方程解法，包括去根号技巧和避免引入外来根的方法',
    icon: <Square className="h-6 w-6" />,
    path: '/radical-equations'
  },
  {
    type: 'quadratic',
    title: '二元二次方程',
    description: '探索二元二次方程和方程组的解法，包括代入法、消元法等',
    icon: <Grid className="h-6 w-6" />,
    path: '/quadratic-equations'
  },
  {
    type: 'wordProblem',
    title: '应用题',
    description: '学习如何列方程解决实际问题，培养数学建模能力和实际应用能力',
    icon: <FileText className="h-6 w-6" />,
    path: '/word-problems'
  }
];

const EquationExplorer = () => {
  const [completedTypes, setCompletedTypes] = useState<EquationType[]>([]);

  return (
    <Layout>
      <section className="py-12">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold"
          >
            方程探索
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-xl text-muted-foreground"
          >
            选择一种方程类型，开始你的学习之旅
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equationTypes.map((type, index) => (
            <motion.div
              key={type.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EquationCard
                type={type.type}
                title={type.title}
                description={type.description}
                icon={type.icon}
                to={type.path}
                isCompleted={completedTypes.includes(type.type)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="bg-algebra-light-blue rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">学习路径推荐</h2>
            <p className="text-muted-foreground mb-6">
              我们建议按照以下顺序学习各类方程，循序渐进，掌握代数方程解法
            </p>
            
            <ol className="space-y-4 text-left">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-algebra-blue text-white font-bold flex-shrink-0 mr-4">1</span>
                <div>
                  <h3 className="font-medium">整式方程</h3>
                  <p className="text-sm text-muted-foreground">掌握最基础的方程解法，为后续学习打下基础</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-algebra-purple text-white font-bold flex-shrink-0 mr-4">2</span>
                <div>
                  <h3 className="font-medium">分式方程</h3>
                  <p className="text-sm text-muted-foreground">学习处理含有未知数分母的方程的方法</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-algebra-pink text-white font-bold flex-shrink-0 mr-4">3</span>
                <div>
                  <h3 className="font-medium">无理方程</h3>
                  <p className="text-sm text-muted-foreground">掌握含有根号的方程解法和检验方法</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-algebra-green text-white font-bold flex-shrink-0 mr-4">4</span>
                <div>
                  <h3 className="font-medium">二元二次方程</h3>
                  <p className="text-sm text-muted-foreground">学习较复杂的方程和方程组的解法</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-algebra-yellow text-white font-bold flex-shrink-0 mr-4">5</span>
                <div>
                  <h3 className="font-medium">应用题</h3>
                  <p className="text-sm text-muted-foreground">综合应用前面学习的内容，解决实际问题</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EquationExplorer;
