import React from 'react';
import Step from './Step';

type StepData = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const steps: StepData[] = [
  {
    id: 1,
    title: 'Upload License',
    description: 'Upload your software license details and certificates through our secure platform.',
    icon: 'clipboard',
  },
  {
    id: 2,
    title: 'Get Valuation',
    description: 'Our experts will assess your licenses and provide a competitive valuation within 24 hours.',
    icon: 'wallet',
  },
  {
    id: 3,
    title: 'Get Paid',
    description: 'Accept our offer and receive payment through your preferred method within 3 business days.',
    icon: 'dollar',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our streamlined process makes selling your unused software licenses simple and profitable.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-16 md:gap-0 px-4 md:px-0">
      
          <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-blue-200 dark:bg-blue-800 z-0" />

          {steps.map((step) => (
            <Step key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;