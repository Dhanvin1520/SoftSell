import React from 'react';
import TestimonialCard from './TestimonialCard';
type TestimonialData = {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
  };
const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'IT Director',
    company: 'TechFirm Inc.',
    quote: 'SoftSell helped our company recover over $50,000 from unused enterprise licenses. Their valuation was fair and the process was incredibly smooth.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CFO',
    company: 'DataFlow Systems',
    quote: 'When downsizing our operations, we had dozens of unused software licenses. SoftSell offered 40% more than competitors and processed everything within a week.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Customer Testimonials
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers say about their experience with SoftSell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;