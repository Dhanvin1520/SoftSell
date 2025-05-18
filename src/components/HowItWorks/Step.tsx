import React from 'react';
import { motion } from 'framer-motion';
import { Clipboard, Wallet, DollarSign } from 'lucide-react';

type StepData = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'clipboard':
      return <Clipboard size={24} className="text-blue-500 dark:text-blue-400" />;
    case 'wallet':
      return <Wallet size={24} className="text-blue-500 dark:text-blue-400" />;
    case 'dollar':
      return <DollarSign size={24} className="text-blue-500 dark:text-blue-400" />;
    default:
      return <Clipboard size={24} className="text-blue-500 dark:text-blue-400" />;
  }
};

interface StepProps {
  step: StepData;
}

const Step: React.FC<StepProps> = ({ step }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center z-10 relative w-full md:w-1/3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: step.id * 0.1 }}
    >
      <div className="mb-4 relative">
  
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 z-10">
          {getIcon(step.icon)}
        </div>


        {step.id !== 3 && (
          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-16 bg-blue-200 dark:bg-blue-800" />
        )}
      </div>

   
      <div className="max-w-xs">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
          {step.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
      </div>
    </motion.div>
  );
};

export default Step;