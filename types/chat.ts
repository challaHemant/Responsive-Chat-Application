export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  isOnline: boolean;
  unreadCount: number;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export type MessageStatus = 'sent' | 'delivered' | 'read';