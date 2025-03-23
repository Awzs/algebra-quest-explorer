
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  Calculator, 
  PenTool, 
  Brain,
  ArrowRight,
  Star
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6 text-algebra-blue" />,
    title: '系统化学习',
    description: '按照教材顺序，系统学习五种代数方程的解法'
  },
  {
    icon: <Calculator className="h-6 w-6 text-algebra-purple" />,
    title: '交互式演算',
    description: '通过动画演示，步骤分解，让方程解法一目了然'
  },
  {
    icon: <PenTool className="h-6 w-6 text-algebra-pink" />,
    title: '练习与反馈',
    description: '丰富的练习题库，即时反馈，帮助巩固所学知识'
  },
  {
    icon: <Brain className="h-6 w-6 text-algebra-green" />,
    title: '难度递进',
    description: '从基础到进阶，逐步提高解题能力，挑战自我'
  }
];

const equationTypes = [
  {
    title: '整式方程',
    description: '学习一元一次方程、多项式方程等基本方程的解法',
    path: '/polynomial-equations',
    color: 'bg-algebra-blue'
  },
  {
    title: '分式方程',
    description: '掌握含有未知数分母的分式方程解法',
    path: '/fractional-equations',
    color: 'bg-algebra-purple'
  },
  {
    title: '无理方程',
    description: '探索含有根号的方程求解技巧',
    path: '/radical-equations',
    color: 'bg-algebra-pink'
  },
  {
    title: '二元二次方程',
    description: '学习二元二次方程和方程组的解法',
    path: '/quadratic-equations',
    color: 'bg-algebra-green'
  },
  {
    title: '应用题',
    description: '将数学方程应用于实际问题的解决',
    path: '/word-problems',
    color: 'bg-algebra-yellow'
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-block rounded-lg bg-algebra-blue/10 px-3 py-1 text-sm text-algebra-blue">
                沪教版八年级下册
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                代数方程<span className="text-algebra-blue">探索之旅</span>
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                通过动画演示、文字讲解和交互练习，轻松掌握五种代数方程的解法
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-algebra-blue hover:bg-algebra-dark-blue">
                  <Link to="/polynomial-equations">
                    开始学习
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/equation-explorer">方程探索</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto lg:mx-0"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 right-4 bottom-4 rounded-lg bg-algebra-light-blue -z-10"></div>
                <img 
                  src="/lovable-uploads/1c2452d5-c8f5-4738-8133-236cb755cfab.png" 
                  alt="代数方程解题示例" 
                  className="rounded-lg shadow-lg w-full max-w-xl object-cover"
                  style={{ aspectRatio: '16/9' }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">为什么选择我们的学习平台？</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              我们提供直观、高效的学习方式，帮助你掌握代数方程解法
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col p-6 bg-white rounded-xl border border-border shadow-sm"
              >
                <div className="p-3 rounded-full bg-accent w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equation Types Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">五大方程类型</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              从基础到应用，全面掌握代数方程解法
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {equationTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex flex-col p-6 bg-white rounded-xl border border-border shadow-sm"
              >
                <div className={`h-2 ${type.color} rounded-full mb-4`}></div>
                <h3 className="text-xl font-semibold">{type.title}</h3>
                <p className="mt-2 text-muted-foreground flex-1">{type.description}</p>
                <div className="mt-6">
                  <Link 
                    to={type.path}
                    className="inline-flex items-center text-algebra-blue hover:underline font-medium"
                  >
                    开始学习
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-algebra-light-blue rounded-3xl my-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">准备好开启方程探索之旅了吗？</h2>
              <p className="text-xl text-muted-foreground">
                简单易懂的讲解，交互式的练习，帮助你轻松理解代数方程
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild size="lg" className="bg-algebra-blue hover:bg-algebra-dark-blue">
                <Link to="/polynomial-equations">
                  立即开始
                  <GraduationCap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/practice">练习题库</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">学生反馈</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              听听他们怎么说
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-xl border border-border shadow-sm"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-algebra-yellow text-algebra-yellow" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "通过这个平台学习代数方程，让我对数学产生了浓厚的兴趣。步骤分解得非常清晰，让复杂问题变得简单。"
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-medium">小明</p>
                <p className="text-sm text-muted-foreground">八年级学生</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-xl border border-border shadow-sm"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-algebra-yellow text-algebra-yellow" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "这个网站帮助我轻松理解了分式方程和无理方程，以前我总是搞不懂这些。现在我的数学成绩提高了很多！"
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-medium">小红</p>
                <p className="text-sm text-muted-foreground">八年级学生</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-xl border border-border shadow-sm"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-algebra-yellow text-algebra-yellow" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "作为数学老师，我经常在课堂上使用这个平台。动画演示和交互练习深受学生喜爱，学习效果非常好。"
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-medium">李老师</p>
                <p className="text-sm text-muted-foreground">数学教师</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
