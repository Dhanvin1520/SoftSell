import React from 'react';
import { motion } from 'framer-motion';
import Starfield from './Starfield';

const Hero: React.FC = () => {
  const handleGetQuoteClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-16 pt-20">
      <Starfield />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-slate-900/70 dark:from-slate-900/70 dark:to-black/80 z-10" />
      
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
          >
            Turn Your Unused Software Licenses Into Cash
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-200 mb-10"
          >
            We help individuals and companies unlock value by reselling unused licenses.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <button
              onClick={handleGetQuoteClick}
              className="px-8 py-3 text-lg font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 shadow-lg"
            >
              Get a Quote
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;