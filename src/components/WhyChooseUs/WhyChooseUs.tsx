import React from 'react';
import FeatureCard from './FeatureCard';

type FeatureData = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const features: FeatureData[] = [
  {
    id: 1,
    title: 'Fast Payouts',
    description: 'Get paid within 3 business days after accepting our offer, with multiple payment options.',
    icon: 'clock',
  },
  {
    id: 2,
    title: 'Secure Transactions',
    description: 'Our platform uses bank-level encryption to ensure your license information remains protected.',
    icon: 'shield',
  },
  {
    id: 3,
    title: 'Expert Valuation',
    description: 'Our team of specialists knows the market value of all major software licenses.',
    icon: 'award',
  },
  {
    id: 4,
    title: 'Transparent Process',
    description: 'Track your license evaluation and transaction status through our real-time dashboard.',
    icon: 'chart',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            SoftSell offers unmatched value, security, and expertise in the software license resale market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;