'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ContactList from './ContactList';
import { Contact } from '@/types/chat';
import { cn } from '@/lib/utils';

interface SidebarProps {
  contacts: Contact[];
  activeContactId: string;
  onSelectContact: (contactId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ 
  contacts, 
  activeContactId, 
  onSelectContact, 
  isOpen, 
  onClose 
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed md:relative left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-md border-r border-gray-200/50 z-50 flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-colors"
            />
          </div>
        </div>
        
        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          <ContactList
            contacts={filteredContacts}
            activeContactId={activeContactId}
            onSelectContact={onSelectContact}
          />
        </div>
      </div>
    </>
  );
}