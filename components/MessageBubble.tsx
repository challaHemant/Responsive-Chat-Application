'use client';

import { Check, CheckCheck } from 'lucide-react';
import { Message, Contact } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
  contact: Contact;
}

export default function MessageBubble({ message, isOwn, showAvatar, contact }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    if (!isOwn) return null;
    
    switch (message.status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "flex items-end gap-2 animate-in slide-in-from-bottom-2 duration-300",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      {!isOwn && showAvatar && (
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
        />
      )}
      
      {!isOwn && !showAvatar && <div className="w-8" />}
      
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm",
          isOwn
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
        )}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isOwn ? "justify-end" : "justify-start"
        )}>
          <span className={cn(
            "text-xs",
            isOwn ? "text-blue-100" : "text-gray-500"
          )}>
            {formatTime(message.timestamp)}
          </span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
}