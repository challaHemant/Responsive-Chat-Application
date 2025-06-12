'use client';

import { Contact } from '@/types/chat';

interface TypingIndicatorProps {
  contact: Contact;
}

export default function TypingIndicator({ contact }: TypingIndicatorProps) {
  return (
    <div className="flex items-end gap-2 animate-in slide-in-from-bottom-2 duration-300">
      <img
        src={contact.avatar}
        alt={contact.name}
        className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
      />
      
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}