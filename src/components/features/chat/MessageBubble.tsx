import React, { useState } from 'react';
import { ChatMessage } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { motion } from 'framer-motion';
import { UserCircleIcon, SparklesIcon, PencilIcon, TrashIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/hooks/useChatStore';
import { Textarea } from '@/components/ui/textarea';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { sender, text, timestamp, isLoading, isError } = message;
  const isUser = sender.id === 'user';
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const { editMessage, deleteMessage, regenerateResponse } = useChatStore(state => ({
    editMessage: state.editMessage,
    deleteMessage: state.deleteMessage,
    regenerateResponse: state.regenerateResponse,
  }));

  const handleEditSave = () => {
    if (editText.trim() !== text.trim() && editText.trim() !== "") {
      editMessage(message.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this message? ${isUser ? "This will also remove Mojo's subsequent replies." : "This will also remove subsequent messages."}`)) {
      deleteMessage(message.id);
    }
  };

  const handleRegenerate = () => {
    regenerateResponse(message.id);
  };

  return (
    <motion.div
      className={`message-bubble ${isUser ? 'user' : 'mojo'} ${isError ? 'error' : ''}`}
      initial={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        background: isUser ? '#faecc5' : '#f38d8d',
        color: isUser ? '#222' : '#fff',
        borderRadius: 18,
        margin: '12px 0',
        padding: 16,
        boxShadow: isUser ? '2px 2px 0 #f7e5b6' : '2px 2px 0 #faecc5',
        fontFamily: isUser ? 'Arial Rounded MT Bold, Arial, sans-serif' : 'Comic Sans MS, Comic Sans, cursive',
        position: 'relative',
        minWidth: 220,
        maxWidth: 540,
        alignSelf: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <Avatar>
          {isUser ? (
            <AvatarFallback>U</AvatarFallback>
          ) : (
            <AvatarImage src="/mojo-avatar.png" alt="Mojo" />
          )}
        </Avatar>
        <span style={{ marginLeft: 8, fontWeight: 700, fontSize: 14 }}>
          {isUser ? 'You' : 'Mojo'}
        </span>
        <span style={{ marginLeft: 12, fontSize: 12, color: '#888' }}>
          {formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true })}
        </span>
        {isLoading && <ArrowPathIcon className="animate-spin ml-2 h-4 w-4 text-yellow-500" />}
        {isError && <ExclamationTriangleIcon className="ml-2 h-4 w-4 text-red-500" />}
      </div>
      {isEditing ? (
        <div>
          <Textarea
            value={editText}
            onChange={e => setEditText(e.target.value)}
            rows={3}
            style={{ fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif', fontSize: 15 }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Button onClick={handleEditSave} size="sm" variant="default">Save</Button>
            <Button onClick={() => setIsEditing(false)} size="sm" variant="ghost">Cancel</Button>
          </div>
        </div>
      ) : (
        <div style={{ fontFamily: isUser ? 'Arial Rounded MT Bold, Arial, sans-serif' : 'Comic Sans MS, Comic Sans, cursive', fontSize: 15, whiteSpace: 'pre-wrap' }}>
          {text}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
        {isUser && !isEditing && (
          <Button onClick={() => setIsEditing(true)} size="icon" variant="ghost" title="Edit">
            <PencilIcon className="h-5 w-5 text-blue-500" />
          </Button>
        )}
        {isUser && (
          <Button onClick={handleDelete} size="icon" variant="ghost" title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </Button>
        )}
        {!isUser && !isEditing && (
          <Button onClick={handleRegenerate} size="icon" variant="ghost" title="Regenerate">
            <ArrowPathIcon className="h-5 w-5 text-green-500" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;