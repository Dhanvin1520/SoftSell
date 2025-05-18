import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import ChatWidget from './components/ChatWidget/ChatWidget';
import Footer from './components/Footer/Footer';

function App() {
  React.useEffect(() => {

    document.title = 'SoftSell | Turn Unused Software Licenses Into Cash';
    

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'SoftSell helps individuals and companies unlock value by reselling unused software licenses. Get instant quotes and fast payments.';
    document.head.appendChild(metaDescription);
    

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💰</text></svg>');
    }
    
    return () => {

      const metaToRemove = document.querySelector('meta[name="description"]');
      if (metaToRemove) {
        metaToRemove.remove();
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <WhyChooseUs />
          <Testimonials />
          <Contact />
        </main>
        <ChatWidget />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;