import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  id: string; // Changed to string for UUID
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const quickQuestionResponses: { [key: string]: string } = {
  'How do I sell my license?': 'To sell your software license, please visit our website and follow the submission process.',
  'Is there a fee?': 'Yes, SoftSell charges a small processing fee. Check our website for details.',
  'What types do you accept?': 'We accept various software licenses, including Microsoft, Adobe, and more. See our full list online.',
};

// Simple UUID generator for unique IDs
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: generateUUID(),
      sender: 'bot',
      text: "👋 Hi there! I'm SoftSell's virtual assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSendMessage = async (userInput?: string) => {
    if (!userInput && !inputValue.trim()) return;

    const messageText = userInput ?? inputValue.trim();

    // Add user message
    const userMessage: ChatMessageType = {
      id: generateUUID(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Check for quick question response
    if (quickQuestionResponses[messageText]) {
      const botResponse: ChatMessageType = {
        id: generateUUID(),
        sender: 'bot',
        text: quickQuestionResponses[messageText],
        timestamp: new Date(),
      };
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // OpenAI API call
    try {
      await delay(1000); // 1-second delay to avoid rate limits
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant for SoftSell, a platform for selling software licenses.' },
            { role: 'user', content: messageText },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'OpenAI request failed');
      }

      const botMessageText = data.choices?.[0]?.message?.content?.trim() || 'No response from assistant.';
      const botMessage: ChatMessageType = {
        id: generateUUID(),
        sender: 'bot',
        text: botMessageText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('OpenAI Error:', error.message);
      let errorMessage = '⚠️ Unable to connect to assistant. Please try again.';
      if (error.message.includes('quota')) {
        errorMessage = '⚠️ Quota exceeded. Check your OpenAI plan at platform.openai.com or contact support. Try a quick question instead.';
      } else if (error.message.includes('Incorrect API key')) {
        errorMessage = '⚠️ Invalid API key. Verify VITE_OPENAI_API_KEY in your .env file.';
      }
      const botMessage: ChatMessageType = {
        id: generateUUID(),
        sender: 'bot',
        text: errorMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] max-h-[calc(100vh-150px)] bg-white dark:bg-slate-800 rounded-xl shadow-xl flex flex-col overflow-hidden z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-widget-title"
          >
            <div className="bg-blue-600 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 id="chat-widget-title" className="font-semibold">SoftSell Assistant</h3>
                  <p className="text-sm opacity-90">How can we help?</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="text-sm text-gray-500 animate-pulse">Typing...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.keys(quickQuestionResponses).map(q => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  disabled={isTyping}
                  aria-label="Type your message"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !inputValue.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;