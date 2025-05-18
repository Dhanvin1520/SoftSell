import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Award, BarChart4 } from 'lucide-react';

type FeatureData = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

interface FeatureCardProps {
  feature: FeatureData;
}

const getIcon = (iconName: string) => {
  const commonClass = "text-blue-500 dark:text-blue-400";
  switch (iconName) {
    case 'clock':
      return <Clock size={36} className={commonClass} />;
    case 'shield':
      return <ShieldCheck size={36} className={commonClass} />;
    case 'award':
      return <Award size={36} className={commonClass} />;
    case 'chart':
      return <BarChart4 size={36} className={commonClass} />;
    default:
      return <Award size={36} className={commonClass} />;
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-slate-100 dark:bg-slate-700 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4 p-4 rounded-full bg-blue-50 dark:bg-blue-900/40">
        {getIcon(feature.icon)}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
        {feature.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;