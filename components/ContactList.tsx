'use client';

import { Contact } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ContactListProps {
  contacts: Contact[];
  activeContactId: string;
  onSelectContact: (contactId: string) => void;
}

export default function ContactList({ contacts, activeContactId, onSelectContact }: ContactListProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? 'now' : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-2">
      {contacts.map((contact) => (
        <button
          key={contact.id}
          onClick={() => onSelectContact(contact.id)}
          className={cn(
            "w-full p-3 rounded-xl mb-2 text-left transition-all duration-200 hover:bg-gray-50/80 hover:scale-[1.02] group",
            activeContactId === contact.id && "bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm border border-blue-100"
          )}
        >
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
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={cn(
                  "font-medium text-gray-900 truncate",
                  activeContactId === contact.id && "text-blue-600"
                )}>
                  {contact.name}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatTime(contact.lastMessageTime)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate pr-2">
                  {contact.lastMessage}
                </p>
                {contact.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] text-center animate-pulse">
                    {contact.unreadCount > 9 ? '9+' : contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}