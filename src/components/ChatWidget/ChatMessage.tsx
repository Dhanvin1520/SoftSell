import React from 'react';
import { motion } from 'framer-motion';

interface ChatMessage {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div 
        className={`max-w-[75%] p-3 rounded-lg ${
          isBot 
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-tl-none' 
            : 'bg-blue-500 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 block mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;