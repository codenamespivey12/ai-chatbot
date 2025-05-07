import React, { useState, useRef, KeyboardEvent } from 'react';
import { useChatStore } from '@/hooks/useChatStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const InputArea: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const addMessage = useChatStore((state) => state.addMessage);
  const isMojoTyping = useChatStore((state) => state.isMojoTyping);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmedText = inputText.trim();
    if (trimmedText) {
      addMessage({ text: trimmedText }, 'user');
      setInputText('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast(`File upload: ${file.name}`);
      // Placeholder for file upload logic
    }
  };

  return (
    <motion.div
      className="input-area"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      style={{
        background: '#f7e5b6',
        borderRadius: 24,
        padding: 16,
        boxShadow: '2px 2px 0 #faecc5',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
        marginTop: 12,
      }}
    >
      <Textarea
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={handleKeyPress}
        rows={2}
        placeholder={isMojoTyping ? 'Mojo is typing...' : 'Type your message...'}
        style={{
          flex: 1,
          borderRadius: 18,
          fontSize: 16,
          fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
          background: '#faecc5',
          color: '#222',
          resize: 'none',
          padding: 10,
        }}
        disabled={isMojoTyping}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        size="icon"
        variant="ghost"
        title="Attach file"
        style={{ borderRadius: 18, background: '#f38d8d', color: '#fff' }}
      >
        <PaperClipIcon className="h-6 w-6" />
      </Button>
      <Button
        onClick={handleSend}
        size="icon"
        variant="default"
        title="Send"
        style={{ borderRadius: 18, background: '#f38d8d', color: '#fff', boxShadow: '0 2px 0 #faecc5' }}
        disabled={isMojoTyping || !inputText.trim()}
        whileTap={{ scale: 0.95 }}
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </Button>
    </motion.div>
  );
};

export default InputArea;