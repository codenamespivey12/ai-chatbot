import ChatInterface from '@/components/features/chat/ChatInterface'; // We'll build this
import React from 'react' ;

const  ChatPage: React.FC = () => {
  // For now, just a placeholder. This will host the ChatInterface.
  return  (
    <div className="flex flex-col h-full" >
      {/* Header will be part of Layout, ChatInterface will fill the main content area */ }
      <ChatInterface />
    </div>
  );
};

export default ChatPage;