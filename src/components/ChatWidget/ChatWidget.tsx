import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import axios from 'axios';

type ChatMessageType = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const quickQuestionResponses: { [key: string]: string } = {
  'How do I sell my license?': 'To sell your software license, please visit our website and follow the submission process.',
  'Is there a fee?': 'Yes, SoftSell charges a small processing fee. Check our website for details.',
  'What types do you accept?': 'We accept various software licenses, including Microsoft, Adobe, and more. See our full list online.',
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi there! I'm SoftSell's virtual assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useMock, setUseMock] = useState(false); // Toggle for mock mode
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      console.log('Messages updated:', messages);
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessageType = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    console.log('Adding user message:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    if (useMock) {
    
      setTimeout(() => {
        const botResponse: ChatMessageType = {
          id: messages.length + 2,
          sender: 'bot',
          text: quickQuestionResponses[inputValue] || `You asked: "${inputValue}". For more details, visit our website or contact support.`,
          timestamp: new Date(),
        };
        console.log('Adding mock bot response:', botResponse);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful assistant for SoftSell, a software license resale company. Keep responses focused on software license resale, valuations, and related topics. Be concise and professional.',
              },
              {
                role: 'user',
                content: inputValue,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
          }
        );

        const botResponse: ChatMessageType = {
          id: messages.length + 2,
          sender: 'bot',
          text:
            response.data.choices[0]?.message?.content?.trim() ||
            "I'm not sure how to help with that right now.",
          timestamp: new Date(),
        };

        console.log('Adding bot response:', botResponse);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        return;
      } catch (error: any) {
        if (error.response?.status === 429 && attempt < maxRetries - 1) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.warn(`Rate limit hit, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          attempt++;
        } else {
          console.error('OpenAI API Error:', error.response?.data || error.message);
          const fallbackResponse: ChatMessageType = {
            id: messages.length + 2,
            sender: 'bot',
            text: '⚠️ Sorry, I’m having trouble connecting to the API. Please try again later.',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, fallbackResponse]);
          setIsTyping(false);
          return;
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessageType = {
      id: messages.length + 1,
      sender: 'user',
      text: question,
      timestamp: new Date(),
    };
    const botResponse: ChatMessageType = {
      id: messages.length + 2,
      sender: 'bot',
      text: quickQuestionResponses[question] || `You asked: "${question}". For more details, visit our website or contact support.`,
      timestamp: new Date(),
    };

    console.log('Quick question triggered:', { userMessage, botResponse });
    setMessages(prev => [...prev, userMessage, botResponse]);
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
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-colors"
          aria-label="Open chat"
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
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 150px)' }}
          >
            <div className="bg-blue-500 text-white p-4">
              <h3 className="font-semibold">SoftSell Assistant</h3>
              <p className="text-sm opacity-90">We’re here to help</p>
              <button
                onClick={() => setUseMock(!useMock)}
                className="text-xs underline"
              >
                {useMock ? 'Use OpenAI' : 'Use Mock Responses'}
              </button>
            </div>


            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900">
              <div className="text-xs text-gray-500 mb-2">
                Debug: {messages.length} messages
                {messages.map(msg => (
                  <div key={msg.id}>
                    [{msg.sender}]: {msg.text}
                  </div>
                ))}
              </div>
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[75%] p-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-tl-none">
                    <p className="text-sm animate-pulse">Typing...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

         
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-2 mb-3">
                {['How do I sell my license?', 'Is there a fee?', 'What types do you accept?'].map(q => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-l-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputValue.trim()}
                  className={`p-2 rounded-r-md ${
                    isTyping || !inputValue.trim()
                      ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
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