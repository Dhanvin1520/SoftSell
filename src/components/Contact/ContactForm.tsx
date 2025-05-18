import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
type FormData = {
    name: string;
    email: string;
    company: string;
    licenseType: string;
    message: string;
  };

const initialFormState: FormData = {
  name: '',
  email: '',
  company: '',
  licenseType: '',
  message: '',
};

const licenseTypes = [
  'Microsoft',
  'Adobe',
  'Autodesk',
  'Oracle',
  'SAP',
  'Other',
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(initialFormState);
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden">
      {isSubmitted ? (
        <motion.div 
          className="p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Thank You!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Your inquiry has been submitted successfully. One of our experts will contact you soon to discuss your software licenses.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Your Company"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="licenseType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                License Type
              </label>
              <select
                id="licenseType"
                name="licenseType"
                value={formData.licenseType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">Select License Type</option>
                {licenseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                placeholder="Tell us about the software licenses you want to sell..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md bg-blue-500 text-white font-medium text-lg transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;