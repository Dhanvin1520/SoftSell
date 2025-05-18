import React from 'react';
import { motion } from 'framer-motion';
type TestimonialData = {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
  };
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
    >
      <Quote className="h-8 w-8 text-blue-200 dark:text-blue-800 absolute top-4 right-4" />
      
      <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <span className="text-blue-500 dark:text-blue-400 font-bold">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-slate-800 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;