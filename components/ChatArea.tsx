'use client';

import { useState } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Contact, Message } from '@/types/chat';

interface ChatAreaProps {
  contact?: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
}

export default function ChatArea({ contact, messages, onSendMessage, isTyping }: ChatAreaProps) {
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Welcome to ChatApp</h3>
          <p className="text-gray-500">Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-blue-50/30">
      {/* Chat Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              {contact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-sm text-gray-500">
                {contact.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'user'}
            showAvatar={
              index === 0 || 
              messages[index - 1].senderId !== message.senderId
            }
            contact={contact}
          />
        ))}
        
        {isTyping && <TypingIndicator contact={contact} />}
      </div>
      
      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-colors"
          />
          <Button 
            type="submit" 
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}