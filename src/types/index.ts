// Chat-related types for Mojo Chatbot

export interface ChatUser {
  id: string; // 'user' or 'mojo'
  name: string;
  avatar?: string; // URL to avatar image
}

export interface ChatMessage {
  id: string; // Unique ID for each message
  text: string;
  sender: ChatUser;
  timestamp: number; // Unix timestamp
  isLoading?: boolean; // For Mojo's responses while "thinking"
  isError?: boolean; // If Mojo's response failed
  metadata?: Record<string, any>; // For potential extra data, like model used
}

// User profile data that can influence Mojo's responses
export interface UserProfileData {
  name?: string;
  location?: string;
  mojoHypeLevel?: 'as-is' | 'chill' | 'turn-up';
}