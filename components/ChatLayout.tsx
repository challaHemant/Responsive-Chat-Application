'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { Contact, Message } from '@/types/chat';

const DUMMY_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Sarah',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    lastMessage: 'Hey there! How are you doing?',
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    isOnline: true,
    unreadCount: 2
  },
  {
    id: '2',
    name: 'satyam',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    lastMessage: 'The project looks great!',
    lastMessageTime: new Date(Date.now() - 30 * 60000),
    isOnline: true,
    unreadCount: 0
  },
  {
    id: '3',
    name: 'david',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    lastMessage: 'Thanks for your help yesterday',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000),
    isOnline: false,
    unreadCount: 1
  },
  {
    id: '4',
    name: 'kanakaraju',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    lastMessage: 'Let\'s schedule a meeting',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60000),
    isOnline: false,
    unreadCount: 0
  },
  {
    id: '5',
    name: 'divya',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    lastMessage: 'Good morning!',
    lastMessageTime: new Date(Date.now() - 6 * 60 * 60000),
    isOnline: true,
    unreadCount: 3
  }
];

const BOT_RESPONSES = [
  "That's interesting! Tell me more about it.",
  "I completely agree with you on that.",
  "Thanks for sharing that with me!",
  "That sounds really exciting!",
  "I appreciate you taking the time to explain.",
  "That's a great point you've made.",
  "I'm here if you need any help with that.",
  "That reminds me of something similar I experienced.",
  "You always have such thoughtful insights!",
  "I'm glad we could connect about this.",
];

export default function ChatLayout() {
  const [contacts, setContacts] = useState<Contact[]>(DUMMY_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const activeContact = contacts.find(c => c.id === activeContactId);

  // Initialize dummy messages
  useEffect(() => {
    const initialMessages: Record<string, Message[]> = {};
    
    contacts.forEach(contact => {
      initialMessages[contact.id] = [
        {
          id: '1',
          text: contact.lastMessage,
          senderId: contact.id,
          timestamp: contact.lastMessageTime,
          status: 'read'
        }
      ];
    });

    setMessages(initialMessages);
  }, []);

  const sendMessage = (text: string) => {
    if (!activeContactId || !text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      senderId: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));

    // Update message status to delivered after a short delay
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeContactId]: prev[activeContactId].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }));
    }, 1000);

    // Update to read status
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeContactId]: prev[activeContactId].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      }));
    }, 2000);

    // Show typing indicator and generate bot response
    setTimeout(() => {
      setIsTyping(true);
    }, 1500);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        senderId: activeContactId,
        timestamp: new Date(),
        status: 'read'
      };

      setMessages(prev => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), botResponse]
      }));

      // Update contact's last message
      setContacts(prev => prev.map(contact => 
        contact.id === activeContactId 
          ? { ...contact, lastMessage: botResponse.text, lastMessageTime: botResponse.timestamp }
          : contact
      ));
    }, 2000 + Math.random() * 2000);
  };

  const selectContact = (contactId: string) => {
    setActiveContactId(contactId);
    setIsSidebarOpen(false);
    
    // Clear unread count for selected contact
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          contacts={contacts}
          activeContactId={activeContactId}
          onSelectContact={selectContact}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <ChatArea
          contact={activeContact}
          messages={messages[activeContactId] || []}
          onSendMessage={sendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}